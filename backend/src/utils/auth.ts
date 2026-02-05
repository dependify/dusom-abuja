import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { query } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateTokens = async (userId: string, email: string, role: string): Promise<AuthTokens> => {
  // Generate access token
  const accessToken = jwt.sign(
    { userId, email, role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
  );

  // Generate refresh token
  const refreshToken = uuidv4();
  const refreshTokenExpires = new Date();
  refreshTokenExpires.setDate(refreshTokenExpires.getDate() + 7); // 7 days

  // Store refresh token in database
  await query(
    'INSERT INTO public.refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
    [userId, refreshToken, refreshTokenExpires]
  );

  // Calculate expiration in seconds (24 hours)
  const expiresIn = 24 * 60 * 60;

  return {
    accessToken,
    refreshToken,
    expiresIn
  };
};

export const verifyAccessToken = (token: string): JWTPayload => {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
};

export const verifyRefreshToken = async (token: string) => {
  const result = await query(
    `SELECT rt.*, u.email, u.password_hash 
     FROM public.refresh_tokens rt
     JOIN public.users u ON rt.user_id = u.id
     WHERE rt.token = $1 AND rt.expires_at > NOW() AND rt.revoked_at IS NULL`,
    [token]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

export const revokeRefreshToken = async (token: string): Promise<void> => {
  await query(
    'UPDATE public.refresh_tokens SET revoked_at = NOW() WHERE token = $1',
    [token]
  );
};

export const revokeAllUserRefreshTokens = async (userId: string): Promise<void> => {
  await query(
    'UPDATE public.refresh_tokens SET revoked_at = NOW() WHERE user_id = $1 AND revoked_at IS NULL',
    [userId]
  );
};

export const createSession = async (userId: string, token: string): Promise<void> => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1); // 24 hours

  await query(
    'INSERT INTO public.sessions (user_id, token, expires_at) VALUES ($1, $2, $3)',
    [userId, token, expiresAt]
  );
};

export const deleteSession = async (token: string): Promise<void> => {
  await query('DELETE FROM public.sessions WHERE token = $1', [token]);
};
