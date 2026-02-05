import { Router } from 'express';
import { z } from 'zod';
import { query } from '../utils/db.js';
import { authenticate, AuthenticatedRequest, requireRole } from '../middleware/auth.js';

const router = Router();

const subscribeSchema = z.object({
  email: z.string().email()
});

// Subscribe (public)
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = subscribeSchema.parse(req.body);

    // Check if already subscribed
    const existing = await query(
      'SELECT * FROM public.newsletter_subscriptions WHERE email = $1',
      [email]
    );

    if (existing.rows.length > 0) {
      if (existing.rows[0].is_active) {
        return res.status(400).json({ error: 'Email already subscribed' });
      } else {
        // Reactivate
        const result = await query(
          `UPDATE public.newsletter_subscriptions 
           SET is_active = true, unsubscribed_at = NULL 
           WHERE email = $1 
           RETURNING *`,
          [email]
        );
        return res.json(result.rows[0]);
      }
    }

    const result = await query(
      `INSERT INTO public.newsletter_subscriptions (email)
       VALUES ($1)
       RETURNING *`,
      [email]
    );

    // Send webhook if configured
    const webhookResult = await query(
      'SELECT setting_value FROM public.site_settings WHERE setting_key = $1',
      ['newsletter_webhook_url']
    );

    if (webhookResult.rows.length > 0 && webhookResult.rows[0].setting_value) {
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
    console.error('Subscribe error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Unsubscribe (public)
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = subscribeSchema.parse(req.body);

    const result = await query(
      `UPDATE public.newsletter_subscriptions 
       SET is_active = false, unsubscribed_at = NOW() 
       WHERE email = $1 AND is_active = true
       RETURNING *`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Email not found or already unsubscribed' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Unsubscribe error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all subscriptions (admin)
router.get('/', authenticate, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const { is_active, page = '1', limit = '20' } = req.query;
    
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    let whereClause = '';
    const params: any[] = [];
    let paramIndex = 1;

    if (is_active !== undefined) {
      whereClause = `WHERE is_active = $${paramIndex}`;
      params.push(is_active === 'true');
      paramIndex++;
    }

    params.push(parseInt(limit as string));
    params.push(offset);

    const result = await query(
      `SELECT * FROM public.newsletter_subscriptions 
       ${whereClause}
       ORDER BY subscribed_at DESC 
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      params
    );

    const countResult = await query(
      `SELECT COUNT(*) FROM public.newsletter_subscriptions ${whereClause}`,
      params.slice(0, -2)
    );

    res.json({
      data: result.rows,
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page as string),
      limit: parseInt(limit as string)
    });
  } catch (error) {
    console.error('Get subscriptions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete subscription (admin)
router.delete('/:id', authenticate, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      'DELETE FROM public.newsletter_subscriptions WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error('Delete subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
