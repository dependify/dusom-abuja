import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from './lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        return await getSubscribers(req, res);
      case 'POST':
        return await subscribe(req, res);
      case 'DELETE':
        return await unsubscribe(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Newsletter error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

async function getSubscribers(req: VercelRequest, res: VercelResponse) {
  const { limit = '100', offset = '0' } = req.query;

  try {
    const result = await query(
      'SELECT id, email, name, created_at FROM newsletter_subscriptions WHERE is_active = true ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [parseInt(limit as string), parseInt(offset as string)]
    );
    return res.json(result.rows);
  } catch (error) {
    console.error('Get subscribers error:', error);
    return res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
}

async function subscribe(req: VercelRequest, res: VercelResponse) {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Check if email already exists
    const existing = await query(
      'SELECT * FROM newsletter_subscriptions WHERE email = $1',
      [email]
    );

    if (existing.rows.length > 0) {
      // Reactivate if unsubscribed
      if (!existing.rows[0].is_active) {
        await query(
          'UPDATE newsletter_subscriptions SET is_active = true, updated_at = NOW() WHERE email = $1',
          [email]
        );
      }
      return res.json({ message: 'Email already subscribed', existing: true });
    }

    const result = await query(
      'INSERT INTO newsletter_subscriptions (email, name, is_active, created_at) VALUES ($1, $2, true, NOW()) RETURNING *',
      [email, name || '']
    );

    return res.status(201).json({ message: 'Successfully subscribed', subscription: result.rows[0] });
  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
}

async function unsubscribe(req: VercelRequest, res: VercelResponse) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const result = await query(
      'UPDATE newsletter_subscriptions SET is_active = false, updated_at = NOW() WHERE email = $1 RETURNING *',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Email not found' });
    }

    return res.json({ message: 'Successfully unsubscribed' });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return res.status(500).json({ error: 'Failed to unsubscribe' });
  }
}
