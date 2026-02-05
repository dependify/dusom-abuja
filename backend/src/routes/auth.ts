import { Router } from 'express';
import { z } from 'zod';
import { query } from '../utils/db.js';
import { 
  hashPassword, 
  verifyPassword, 
  generateTokens, 
  verifyRefreshToken,
  revokeRefreshToken,
  revokeAllUserRefreshTokens
} from '../utils/auth.js';
import { authenticate, AuthenticatedRequest, requireRole } from '../middleware/auth.js';

const router = Router();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

// Sign up
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = signupSchema.parse(req.body);

    // Check if user exists
    const existingUser = await query('SELECT * FROM public.users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const userResult = await query(
      'INSERT INTO public.users (email, password_hash, email_confirmed_at) VALUES ($1, $2, NOW()) RETURNING id, email, created_at',
      [email, passwordHash]
    );

    const user = userResult.rows[0];

    // Check if this is the first user - make them admin
    const userCount = await query('SELECT COUNT(*) FROM public.users');
    if (parseInt(userCount.rows[0].count) === 1) {
      await query(
        'INSERT INTO public.user_roles (user_id, role) VALUES ($1, $2)',
        [user.id, 'admin']
      );
    }

    res.status(201).json({ 
      message: 'User created successfully',
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Get user
    const userResult = await query(
      `SELECT u.*, ur.role 
       FROM public.users u 
       LEFT JOIN public.user_roles ur ON u.id = ur.user_id 
       WHERE u.email = $1`,
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = userResult.rows[0];

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last sign in
    await query('UPDATE public.users SET last_sign_in_at = NOW() WHERE id = $1', [user.id]);

    // Generate tokens
    const tokens = await generateTokens(user.id, user.email, user.role || 'user');

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role || 'user'
      },
      ...tokens
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Refresh token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    const tokenData = await verifyRefreshToken(refreshToken);
    if (!tokenData) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Revoke old refresh token
    await revokeRefreshToken(refreshToken);

    // Generate new tokens
    const tokens = await generateTokens(tokenData.user_id, tokenData.email, 'admin');

    res.json(tokens);
  } catch (error) {
    console.error('Refresh error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      await revokeRefreshToken(refreshToken);
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user
router.get('/me', authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const userResult = await query(
      `SELECT u.id, u.email, u.created_at, u.last_sign_in_at, ur.role 
       FROM public.users u 
       LEFT JOIN public.user_roles ur ON u.id = ur.user_id 
       WHERE u.id = $1`,
      [req.user!.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(userResult.rows[0]);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Change password
router.post('/change-password', authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user
    const userResult = await query('SELECT password_hash FROM public.users WHERE id = $1', [req.user!.userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isValid = await verifyPassword(currentPassword, userResult.rows[0].password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword);

    // Update password
    await query('UPDATE public.users SET password_hash = $1 WHERE id = $2', [newPasswordHash, req.user!.userId]);

    // Revoke all refresh tokens
    await revokeAllUserRefreshTokens(req.user!.userId);

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
