import { Router } from 'express';
import { z } from 'zod';
import { query } from '../utils/db.js';
import { authenticate, AuthenticatedRequest, requireRole } from '../middleware/auth.js';

const router = Router();

// Get all settings (public for non-sensitive, admin for all)
router.get('/', async (req, res) => {
  try {
    const { keys } = req.query;
    
    let whereClause = "WHERE setting_key NOT LIKE '%_secret%' AND setting_key NOT LIKE '%_key%'";
    const params: any[] = [];
    
    // Support filtering by specific keys
    if (keys) {
      const keyArray = (keys as string).split(',');
      whereClause += ` AND setting_key = ANY($1)`;
      params.push(keyArray);
    }
    
    const result = await query(
      `SELECT id, setting_key, setting_value, description, updated_at 
       FROM public.site_settings 
       ${whereClause}
       ORDER BY setting_key`,
      params
    );

    // Transform to key-value object
    const settings: Record<string, any> = {};
    result.rows.forEach(row => {
      settings[row.setting_key] = row.setting_value;
    });

    res.json({ data: result.rows, settings });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all settings (admin)
router.get('/admin', authenticate, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const result = await query(
      'SELECT * FROM public.site_settings ORDER BY setting_key'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get all settings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single setting
router.get('/:key', async (req, res) => {
  try {
    const { key } = req.params;

    // Check if sensitive
    if (key.includes('_secret') || key.includes('_key')) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const result = await query(
      'SELECT * FROM public.site_settings WHERE setting_key = $1',
      [key]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Setting not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get setting error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update setting (admin)
router.patch('/:key', authenticate, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const { key } = req.params;
    const { setting_value, description } = req.body;

    const result = await query(
      `UPDATE public.site_settings 
       SET setting_value = COALESCE($1, setting_value),
           description = COALESCE($2, description),
           updated_by = $3
       WHERE setting_key = $4
       RETURNING *`,
      [setting_value, description, req.user!.userId, key]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Setting not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update setting error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new setting (admin)
router.post('/', authenticate, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const { setting_key, setting_value, description } = req.body;

    if (!setting_key) {
      return res.status(400).json({ error: 'Setting key is required' });
    }

    const result = await query(
      `INSERT INTO public.site_settings (setting_key, setting_value, description, updated_by)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [setting_key, setting_value, description, req.user!.userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    if (error.code === '23505') { // Unique violation
      return res.status(400).json({ error: 'Setting key already exists' });
    }
    console.error('Create setting error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete setting (admin)
router.delete('/:key', authenticate, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const { key } = req.params;

    const result = await query(
      'DELETE FROM public.site_settings WHERE setting_key = $1 RETURNING *',
      [key]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Setting not found' });
    }

    res.json({ message: 'Setting deleted successfully' });
  } catch (error) {
    console.error('Delete setting error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
