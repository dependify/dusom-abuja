import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from './lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        return await getSettings(req, res);
      case 'POST':
      case 'PUT':
        return await updateSettings(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Settings error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

async function getSettings(req: VercelRequest, res: VercelResponse) {
  const { key } = req.query;

  try {
    if (key) {
      const result = await query('SELECT * FROM site_settings WHERE key = $1', [key]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Setting not found' });
      }
      return res.json(result.rows[0]);
    }

    const result = await query('SELECT * FROM site_settings ORDER BY key ASC');
    // Convert to key-value object
    const settings: Record<string, any> = {};
    result.rows.forEach((row: any) => {
      settings[row.key] = row.value;
    });
    return res.json(settings);
  } catch (error) {
    console.error('Get settings error:', error);
    return res.status(500).json({ error: 'Failed to fetch settings' });
  }
}

async function updateSettings(req: VercelRequest, res: VercelResponse) {
  const settings = req.body;

  if (!settings || typeof settings !== 'object') {
    return res.status(400).json({ error: 'Settings object is required' });
  }

  try {
    const results: any[] = [];

    for (const [key, value] of Object.entries(settings)) {
      const result = await query(
        `INSERT INTO site_settings (key, value, updated_at) 
         VALUES ($1, $2, NOW()) 
         ON CONFLICT (key) 
         DO UPDATE SET value = $2, updated_at = NOW() 
         RETURNING *`,
        [key, JSON.stringify(value)]
      );
      results.push(result.rows[0]);
    }

    return res.json({ message: 'Settings updated', settings: results });
  } catch (error) {
    console.error('Update settings error:', error);
    return res.status(500).json({ error: 'Failed to update settings' });
  }
}
