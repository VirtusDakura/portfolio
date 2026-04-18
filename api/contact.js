import { createClient } from '@sanity/client';

// Server-side Sanity client
const sanityClient = createClient({
  projectId: '6ajwuesb',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-06',
  token: process.env.SANITY_WRITE_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body || {};

  // Validate required fields
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Basic email format check
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (message.trim().length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters' });
  }

  try {
    // Run both operations in parallel
    const results = await Promise.allSettled([
      // Saves a contactMessage document in Sanity CMS
      sanityClient.create({
        _type: 'contactMessage',
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        receivedAt: new Date().toISOString(),
        read: false,
      }),
      // Send email via Web3Forms
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_KEY,
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          from_name: 'Portfolio Contact Form',
        }),
      }).then((r) => r.json()),
    ]);

    const sanityOk = results[0].status === 'fulfilled';
    const emailOk =
      results[1].status === 'fulfilled' && results[1].value?.success;

    // Log partial failures server-side for debugging
    if (!sanityOk) {
      console.error('Sanity save failed:', results[0].reason);
    }
    if (!emailOk) {
      console.error(
        'Web3Forms send failed:',
        results[1].reason || results[1].value
      );
    }

    if (sanityOk || emailOk) {
      return res.status(200).json({ success: true });
    }

    return res.status(500).json({ error: 'Failed to process your message' });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
