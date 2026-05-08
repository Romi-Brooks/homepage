async function ensureTable(db) {
  await db.prepare(
    `CREATE TABLE IF NOT EXISTS guestbook (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL DEFAULT 'Anonymous',
      text TEXT NOT NULL,
      date TEXT NOT NULL
    )`
  ).run();
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

async function verifyTurnstile(token, secret) {
  if (!token || !secret) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

export async function onRequest(context) {
  const { request, env } = context;
  const db = env.GB;
  const headers = { 'Content-Type': 'application/json', ...corsHeaders() };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    await ensureTable(db);
  } catch (e) {
    return new Response(JSON.stringify({ error: 'db_init_failed', detail: e.message }), { status: 500, headers });
  }

  if (request.method === 'GET') {
    try {
      const { results } = await db.prepare(
        'SELECT name, text, date FROM guestbook ORDER BY id DESC LIMIT 100'
      ).all();
      return new Response(JSON.stringify(results), { status: 200, headers });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers });
    }
  }

  if (request.method === 'POST') {
    try {
      const body = await request.json();
      const { name, text, date, token } = body;

      if (!text || !text.trim()) {
        return new Response(JSON.stringify({ error: 'text is required' }), { status: 400, headers });
      }

      if (env.TURNSTILE_SECRET) {
        const valid = await verifyTurnstile(token, env.TURNSTILE_SECRET);
        if (!valid) {
          return new Response(JSON.stringify({ error: 'verification_failed' }), { status: 403, headers });
        }
      }

      await db.prepare(
        'INSERT INTO guestbook (name, text, date) VALUES (?1, ?2, ?3)'
      ).bind(
        (name || 'Anonymous').trim(),
        text.trim(),
        date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      ).run();

      return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers });
    }
  }

  return new Response('Method not allowed', { status: 405, headers });
}
