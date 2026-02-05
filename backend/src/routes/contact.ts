import { Router } from 'express';
import { z } from 'zod';
import { query } from '../utils/db.js';
import { authenticate, AuthenticatedRequest, requireRole } from '../middleware/auth.js';

const router = Router();

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1),
  source: z.string().default('contact_form')
});

// Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const data = contactSchema.parse(req.body);

    const result = await query(
      `INSERT INTO public.contact_submissions (name, email, phone, message, source)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [data.name, data.email, data.phone, data.message, data.source]
    );

    // TODO: Send webhook if configured
    const webhookResult = await query(
      'SELECT setting_value FROM public.site_settings WHERE setting_key = $1',
      ['contact_webhook_url']
    );

    if (webhookResult.rows.length > 0 && webhookResult.rows[0].setting_value) {
      // Send webhook in background
      fetch(webhookResult.rows[0].setting_value, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.rows[0])
      }).catch(err => console.error('Webhook error:', err));
    }

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all submissions (admin)
router.get('/', authenticate, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const { is_read, page = '1', limit = '20' } = req.query;
    
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    let whereClause = '';
    const params: any[] = [];
    let paramIndex = 1;

    if (is_read !== undefined) {
      whereClause = `WHERE is_read = $${paramIndex}`;
      params.push(is_read === 'true');
      paramIndex++;
    }

    params.push(parseInt(limit as string));
    params.push(offset);

    const result = await query(
      `SELECT * FROM public.contact_submissions 
       ${whereClause}
       ORDER BY created_at DESC 
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      params
    );

    const countResult = await query(
      `SELECT COUNT(*) FROM public.contact_submissions ${whereClause}`,
      params.slice(0, -2)
    );

    res.json({
      data: result.rows,
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page as string),
      limit: parseInt(limit as string)
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark as read (admin)
router.patch('/:id/read', authenticate, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const { is_read } = req.body;

    const result = await query(
      'UPDATE public.contact_submissions SET is_read = $1 WHERE id = $2 RETURNING *',
      [is_read, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete submission (admin)
router.delete('/:id', authenticate, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      'DELETE FROM public.contact_submissions WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Delete submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
