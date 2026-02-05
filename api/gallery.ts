import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from './lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        return await getGallery(req, res);
      case 'POST':
        return await createGalleryItem(req, res);
      case 'PUT':
        return await updateGalleryItem(req, res);
      case 'DELETE':
        return await deleteGalleryItem(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Gallery error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

async function getGallery(req: VercelRequest, res: VercelResponse) {
  const { id, active_only = 'true' } = req.query;

  try {
    if (id) {
      const result = await query('SELECT * FROM gallery_images WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Gallery item not found' });
      }
      return res.json(result.rows[0]);
    }

    let sql = 'SELECT * FROM gallery_images';
    const params: any[] = [];

    if (active_only === 'true') {
      sql += ' WHERE is_active = true';
    }

    sql += ' ORDER BY display_order ASC, created_at DESC';

    const result = await query(sql, params);
    return res.json(result.rows);
  } catch (error) {
    console.error('Get gallery error:', error);
    return res.status(500).json({ error: 'Failed to fetch gallery' });
  }
}

async function createGalleryItem(req: VercelRequest, res: VercelResponse) {
  const { title, description, image_url, category, display_order = 0 } = req.body;

  if (!title || !image_url) {
    return res.status(400).json({ error: 'Title and image_url are required' });
  }

  try {
    const result = await query(
      'INSERT INTO gallery_images (title, description, image_url, category, display_order, is_active, created_at) VALUES ($1, $2, $3, $4, $5, true, NOW()) RETURNING *',
      [title, description || '', image_url, category || 'general', display_order]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create gallery item error:', error);
    return res.status(500).json({ error: 'Failed to create gallery item' });
  }
}

async function updateGalleryItem(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  const updates = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Gallery item ID is required' });
  }

  const allowedFields = ['title', 'description', 'image_url', 'category', 'display_order', 'is_active'];
  const fields: string[] = [];
  const values: any[] = [];

  for (const [key, value] of Object.entries(updates)) {
    if (allowedFields.includes(key)) {
      fields.push(`${key} = $${values.length + 1}`);
      values.push(value);
    }
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  values.push(id);

  try {
    const result = await query(
      `UPDATE gallery_images SET ${fields.join(', ')} WHERE id = $${values.length} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error('Update gallery item error:', error);
    return res.status(500).json({ error: 'Failed to update gallery item' });
  }
}

async function deleteGalleryItem(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Gallery item ID is required' });
  }

  try {
    const result = await query('DELETE FROM gallery_images WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    return res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    return res.status(500).json({ error: 'Failed to delete gallery item' });
  }
}
