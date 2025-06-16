import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = import.meta.env.EDITOR_JWT_SECRET || 'default-secret-change-this';
const SESSION_DURATION = parseInt(import.meta.env.EDITOR_SESSION_DURATION || '14400');

export interface AuthToken {
  authorized: boolean;
  timestamp: number;
}

export async function verifyPassword(password: string): Promise<boolean> {
  const editorPassword = import.meta.env.EDITOR_PASSWORD;
  
  if (!editorPassword) {
    console.error('EDITOR_PASSWORD not configured');
    return false;
  }
  
  // If password starts with $2, it's already hashed
  if (editorPassword.startsWith('$2')) {
    return bcrypt.compare(password, editorPassword);
  }
  
  // Plain text comparison (for development)
  return password === editorPassword;
}

export function generateToken(): string {
  const payload: AuthToken = {
    authorized: true,
    timestamp: Date.now()
  };
  
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: SESSION_DURATION
  });
}

export function verifyToken(token: string): AuthToken | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthToken;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

// Helper to check if editor is enabled
export function isEditorEnabled(): boolean {
  return import.meta.env.EDITOR_ENABLED === 'true';
}

// Cookie options for secure token storage
export const cookieOptions = {
  httpOnly: true,
  secure: import.meta.env.PROD,
  sameSite: 'strict' as const,
  maxAge: SESSION_DURATION * 1000, // Convert to milliseconds
  path: '/editor'
};