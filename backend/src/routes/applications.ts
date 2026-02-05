import { Router } from 'express';
import { z } from 'zod';
import { query } from '../utils/db.js';
import { authenticate, AuthenticatedRequest, requireRole } from '../middleware/auth.js';

const router = Router();

const applicationStatusEnum = z.enum(['draft', 'submitted', 'under_review', 'accepted', 'rejected']);

// Create new application (public)
router.post('/', async (req, res) => {
  try {
    const result = await query(
      `INSERT INTO public.admission_applications (status, current_step) 
       VALUES ('draft', 1) 
       RETURNING id, resume_token, status, current_step, created_at`
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get application by resume token (public)
router.get('/token/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const result = await query(
      'SELECT * FROM public.admission_applications WHERE resume_token = $1',
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update application (public - via resume token)
router.patch('/token/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const updates = req.body;

    // Check if application exists and is in draft status
    const existing = await query(
      'SELECT id, status FROM public.admission_applications WHERE resume_token = $1',
      [token]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (existing.rows[0].status !== 'draft') {
      return res.status(403).json({ error: 'Cannot edit submitted application' });
    }

    // Build update query
    const allowedFields = [
      'current_step', 'passport_url', 'study_preference', 'first_name', 'middle_name',
      'last_name', 'email', 'address_line1', 'address_line2', 'city', 'state',
      'postal_code', 'country', 'nationality', 'date_of_birth', 'work_mobile',
      'place_of_birth', 'telephone_home', 'facsimile', 'emergency_contact_first_name',
      'emergency_contact_last_name', 'emergency_relationship', 'emergency_address_line1',
      'emergency_city', 'emergency_state', 'emergency_postal_code', 'emergency_country',
      'emergency_phone', 'marital_status', 'highest_education', 'date_of_salvation',
      'date_of_water_baptism', 'salvation_location', 'baptism_location', 'present_church',
      'pastor_name', 'church_address_line1', 'church_city', 'church_state',
      'church_postal_code', 'church_country', 'church_phone', 'church_involvement_duration',
      'church_email', 'church_involvement_details', 'why_dusom', 'needs_counseling',
      'counseling_details', 'has_criminal_record', 'criminal_record_details',
      'ref1_first_name', 'ref1_last_name', 'ref1_address_line1', 'ref1_city', 'ref1_state',
      'ref1_postal_code', 'ref1_country', 'ref1_phone', 'ref1_email', 'ref2_first_name',
      'ref2_last_name', 'ref2_address_line1', 'ref2_city', 'ref2_state', 'ref2_postal_code',
      'ref2_country', 'ref2_phone', 'ref2_email', 'has_physical_condition',
      'physical_condition_details', 'has_learning_difficulties', 'learning_difficulties_details',
      'on_medication', 'medication_details', 'hospitalized_recently', 'hospitalization_details',
      'how_heard_about_dusom', 'why_chosen_dusom', 'has_financial_commitments',
      'financial_commitments_details', 'has_dependents', 'dependents_details',
      'certificates_urls', 'is_dunamis_member', 'foundation_maturity_certificates_urls',
      'pastor_recommendation_url', 'testimony', 'agrees_to_policy', 'agrees_to_terms'
    ];

    const setClauses: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        setClauses.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    }

    if (setClauses.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    values.push(token);

    const result = await query(
      `UPDATE public.admission_applications 
       SET ${setClauses.join(', ')} 
       WHERE resume_token = $${paramIndex}
       RETURNING *`,
      values
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit application (public - final step)
router.post('/token/:token/submit', async (req, res) => {
  try {
    const { token } = req.params;

    const result = await query(
      `UPDATE public.admission_applications 
       SET status = 'submitted' 
       WHERE resume_token = $1 AND status = 'draft'
       RETURNING *`,
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found or already submitted' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Submit application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all applications (admin only)
router.get('/', authenticate, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const { status, search, page = '1', limit = '20' } = req.query;
    
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    let whereClause = '';
    const params: any[] = [];
    let paramIndex = 1;

    if (status && status !== 'all') {
      whereClause += `WHERE status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    if (search) {
      whereClause += whereClause ? ' AND ' : 'WHERE ';
      whereClause += `(first_name ILIKE $${paramIndex} OR last_name ILIKE $${paramIndex} OR email ILIKE $${paramIndex} OR application_number ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    params.push(parseInt(limit as string));
    params.push(offset);

    const result = await query(
      `SELECT * FROM public.admission_applications 
       ${whereClause}
       ORDER BY created_at DESC 
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      params
    );

    // Get total count
    const countResult = await query(
      `SELECT COUNT(*) FROM public.admission_applications ${whereClause.split('LIMIT')[0]}`,
      params.slice(0, -2)
    );

    res.json({
      data: result.rows,
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page as string),
      limit: parseInt(limit as string)
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single application (admin only)
router.get('/:id', authenticate, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT * FROM public.admission_applications WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update application status (admin only)
router.patch('/:id/status', authenticate, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const parsedStatus = applicationStatusEnum.parse(status);

    const result = await query(
      'UPDATE public.admission_applications SET status = $1 WHERE id = $2 RETURNING *',
      [parsedStatus, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
