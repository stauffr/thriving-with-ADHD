// Use dynamic import for node-fetch to support ESM
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

export default async function(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { email } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  if (!email || typeof email !== 'string') {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  try {
    const response = await fetch('https://eocampaign1.com/api/forms/ebf614bc-625c-11f0-ab08-f51526c9c4c3/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
    if (!response.ok) {
      res.status(response.status).json({ error: data.error?.message || data.raw || 'Failed to subscribe' });
      return;
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
