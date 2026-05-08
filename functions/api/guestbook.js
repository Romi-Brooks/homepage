const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = requestLog.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW) {
    requestLog.set(ip, { windowStart: now, count: 1 });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
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
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'rate_limited' }), { status: 429 });
  }

  if (request.method === 'GET') {
    try {
      const { results } = await db.prepare(
        'SELECT name, text, date FROM guestbook ORDER BY id DESC LIMIT 100'
      ).all();
      return new Response(JSON.stringify(results), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  }

  if (request.method === 'POST') {
    try {
      const { name, text, date, token } = await request.json();
      if (!text) {
        return new Response(JSON.stringify({ error: 'text is required' }), { status: 400 });
      }

      if (env.TURNSTILE_SECRET) {
        const valid = await verifyTurnstile(token, env.TURNSTILE_SECRET);
        if (!valid) {
          return new Response(JSON.stringify({ error: 'verification_failed' }), { status: 403 });
        }
      }

      await db.prepare(
        'INSERT INTO guestbook (name, text, date) VALUES (?1, ?2, ?3)'
      ).bind(name || 'Anonymous', text, date || new Date().toLocaleDateString()).run();
      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  }

  return new Response('Method not allowed', { status: 405 });
}
