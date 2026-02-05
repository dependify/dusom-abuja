import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from './lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        return await getContacts(req, res);
      case 'POST':
        return await createContact(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Contact error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

async function getContacts(req: VercelRequest, res: VercelResponse) {
  const { limit = '50', offset = '0' } = req.query;
  
  try {
    const result = await query(
      'SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [parseInt(limit as string), parseInt(offset as string)]
    );
    return res.json(result.rows);
  } catch (error) {
    console.error('Get contacts error:', error);
    return res.status(500).json({ error: 'Failed to fetch contacts' });
  }
}

async function createContact(req: VercelRequest, res: VercelResponse) {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    const result = await query(
      'INSERT INTO contact_submissions (name, email, subject, message, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [name, email, subject || '', message]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create contact error:', error);
    return res.status(500).json({ error: 'Failed to submit contact form' });
  }
}
