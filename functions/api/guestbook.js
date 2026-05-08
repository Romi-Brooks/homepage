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
      const { name, text, date } = body;

      if (!text || !text.trim()) {
        return new Response(JSON.stringify({ error: 'text is required' }), { status: 400, headers });
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
