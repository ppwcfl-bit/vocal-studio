// Vocal Studio — AI coach server (Cloudflare Worker)
// Keeps your Anthropic API key on the server. The app sends only text: the measurements from
// an attempt and what you said. It never sends audio.
//
// Setup (about 5 minutes, free Cloudflare account):
//  1. dash.cloudflare.com → Workers & Pages → Create → Create Worker → name it (e.g. vocal-coach) → Deploy.
//  2. Edit code → replace everything with this file → Deploy.
//  3. Settings → Variables and Secrets → add:
//       ANTHROPIC_API_KEY  (type: Secret)  your key from console.anthropic.com
//       APP_TOKEN          (type: Secret)  any long random phrase; you'll paste it into the app
//       ALLOWED_ORIGIN     (type: Text)    the address you open the app at, e.g. https://your-site.netlify.app
//       MODEL              (type: Text, optional) defaults to claude-sonnet-5-5
//  4. In the app: Profile → AI coach → paste the worker address (https://vocal-coach.<you>.workers.dev) and the APP_TOKEN.

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = env.ALLOWED_ORIGIN || '';
    const cors = {
      'Access-Control-Allow-Origin': allowed || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'content-type, x-coach-token',
      'Vary': 'Origin',
    };
    const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { ...cors, 'content-type': 'application/json' } });
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return json({ error: 'Use POST.' }, 405);
    if (allowed && origin && origin !== allowed) return json({ error: 'This app address is not allowed.' }, 403);
    if (!env.APP_TOKEN || request.headers.get('x-coach-token') !== env.APP_TOKEN) return json({ error: 'Wrong or missing app token.' }, 401);
    if (!env.ANTHROPIC_API_KEY) return json({ error: 'The server has no ANTHROPIC_API_KEY set.' }, 500);
    let body;
    try { body = await request.json(); } catch (e) { return json({ error: 'Bad request.' }, 400); }
    if (!body || typeof body.prompt !== 'string' || body.prompt.length > 24000) return json({ error: 'Bad request.' }, 400);
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: env.MODEL || 'claude-sonnet-5-5', max_tokens: Math.min(Number(body.max_tokens) || 900, 1200), messages: [{ role: 'user', content: body.prompt }] }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) return json({ error: (j.error && j.error.message) || 'The AI service returned an error.' }, r.status);
    return json({ text: (j.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('\n') });
  },
};
