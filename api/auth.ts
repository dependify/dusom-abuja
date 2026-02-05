import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { query } from './lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Default admin credentials (change in production)
const DEFAULT_ADMIN = {
  email: 'admin@dusomabuja.org',
  password: 'admin123', // Change this!
  role: 'admin'
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action } = req.body || {};

  try {
    switch (action) {
      case 'login':
        return await handleLogin(req, res);
      case 'register':
        return await handleRegister(req, res);
      case 'verify':
        return await handleVerify(req, res);
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error: any) {
    console.error('Auth error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

async function handleLogin(req: VercelRequest, res: VercelResponse) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check default admin
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    const token = jwt.sign(
      { userId: 'admin', email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    return res.json({
      token,
      user: { id: 'admin', email, role: 'admin', name: 'Administrator' }
    });
  }

  // Check database users
  try {
    const result = await query('SELECT * FROM admin_users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    });
  } catch (dbError) {
    console.error('Database error:', dbError);
    return res.status(500).json({ error: 'Database error' });
  }
}

async function handleRegister(req: VercelRequest, res: VercelResponse) {
  // Registration disabled - only admin can create users
  return res.status(403).json({ error: 'Registration is disabled' });
}

async function handleVerify(req: VercelRequest, res: VercelResponse) {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return res.json({ valid: true, user: decoded });
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
