import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from './lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        return await getApplications(req, res);
      case 'POST':
        return await createApplication(req, res);
      case 'PUT':
        return await updateApplication(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Applications error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

async function getApplications(req: VercelRequest, res: VercelResponse) {
  const { id, status, limit = '50', offset = '0' } = req.query;

  try {
    if (id) {
      const result = await query(
        'SELECT * FROM admission_applications WHERE id = $1',
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Application not found' });
      }
      return res.json(result.rows[0]);
    }

    let sql = 'SELECT * FROM admission_applications';
    const params: any[] = [];
    const conditions: string[] = [];

    if (status) {
      conditions.push(`status = $${params.length + 1}`);
      params.push(status);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(parseInt(limit as string), parseInt(offset as string));

    const result = await query(sql, params);
    return res.json(result.rows);
  } catch (error) {
    console.error('Get applications error:', error);
    return res.status(500).json({ error: 'Failed to fetch applications' });
  }
}

async function createApplication(req: VercelRequest, res: VercelResponse) {
  const {
    first_name,
    last_name,
    email,
    phone,
    date_of_birth,
    nationality,
    education_level,
    testimony,
    pastoral_reference_name,
    pastoral_reference_phone,
    emergency_contact_name,
    emergency_contact_phone,
    medical_conditions,
    payment_plan,
    documents
  } = req.body;

  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: 'First name, last name, and email are required' });
  }

  try {
    const result = await query(
      `INSERT INTO admission_applications (
        first_name, last_name, email, phone, date_of_birth, nationality,
        education_level, testimony, pastoral_reference_name, pastoral_reference_phone,
        emergency_contact_name, emergency_contact_phone, medical_conditions,
        payment_plan, documents, status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW())
      RETURNING *`,
      [
        first_name, last_name, email, phone, date_of_birth, nationality,
        education_level, testimony, pastoral_reference_name, pastoral_reference_phone,
        emergency_contact_name, emergency_contact_phone, medical_conditions,
        payment_plan, JSON.stringify(documents || {}), 'draft'
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create application error:', error);
    return res.status(500).json({ error: 'Failed to create application' });
  }
}

async function updateApplication(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  const updates = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Application ID is required' });
  }

  const allowedFields = [
    'first_name', 'last_name', 'email', 'phone', 'date_of_birth',
    'nationality', 'education_level', 'testimony', 'pastoral_reference_name',
    'pastoral_reference_phone', 'emergency_contact_name', 'emergency_contact_phone',
    'medical_conditions', 'payment_plan', 'documents', 'status'
  ];

  const fields: string[] = [];
  const values: any[] = [];

  for (const [key, value] of Object.entries(updates)) {
    if (allowedFields.includes(key)) {
      fields.push(`${key} = $${values.length + 1}`);
      values.push(key === 'documents' ? JSON.stringify(value) : value);
    }
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  fields.push('updated_at = NOW()');
  values.push(id);

  try {
    const result = await query(
      `UPDATE admission_applications SET ${fields.join(', ')} WHERE id = $${values.length} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error('Update application error:', error);
    return res.status(500).json({ error: 'Failed to update application' });
  }
}
