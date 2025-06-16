import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { parse, serialize } from 'cookie';
import type { AstroCookies } from 'astro';

interface AuthPayload {
  authorized: boolean;
  iat?: number;
  exp?: number;
}

export class AuthService {
  private static JWT_SECRET = process.env.JWT_SECRET || '';
  private static EDITOR_PASSWORD = process.env.EDITOR_PASSWORD || '';
  private static SESSION_DURATION = parseInt(process.env.SESSION_DURATION || '14400');

  static validateEnvironment(): void {
    if (!this.JWT_SECRET || this.JWT_SECRET.length < 32) {
      throw new Error('JWT_SECRET must be at least 32 characters long');
    }
    if (!this.EDITOR_PASSWORD) {
      throw new Error('EDITOR_PASSWORD is required');
    }
  }

  static async verifyPassword(password: string): Promise<boolean> {
    if (!password || !this.EDITOR_PASSWORD) {
      return false;
    }
    
    // For development, allow plain text comparison if password is not hashed
    if (this.EDITOR_PASSWORD.startsWith('$2')) {
      return bcrypt.compare(password, this.EDITOR_PASSWORD);
    }
    
    // Plain text comparison for development
    return password === this.EDITOR_PASSWORD;
  }

  static generateToken(): string {
    this.validateEnvironment();
    
    const payload: AuthPayload = {
      authorized: true
    };

    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.SESSION_DURATION
    });
  }

  static verifyToken(token: string): AuthPayload | null {
    try {
      this.validateEnvironment();
      return jwt.verify(token, this.JWT_SECRET) as AuthPayload;
    } catch (error) {
      return null;
    }
  }

  static createAuthCookie(token: string): string {
    const isProduction = process.env.NODE_ENV === 'production';
    
    return serialize('editor_auth', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: this.SESSION_DURATION,
      path: '/'
    });
  }

  static clearAuthCookie(): string {
    return serialize('editor_auth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });
  }

  static getTokenFromCookies(cookieHeader: string | null): string | null {
    if (!cookieHeader) return null;
    
    const cookies = parse(cookieHeader);
    return cookies.editor_auth || null;
  }

  static isAuthenticated(cookieHeader: string | null): boolean {
    const token = this.getTokenFromCookies(cookieHeader);
    if (!token) return false;
    
    const payload = this.verifyToken(token);
    return payload !== null && payload.authorized === true;
  }

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}

// Middleware helper for API routes
export function requireAuth(cookieHeader: string | null): boolean {
  return AuthService.isAuthenticated(cookieHeader);
}

// Helper to get auth status from Astro cookies
export function checkAuth(cookies: AstroCookies): boolean {
  const token = cookies.get('editor_auth')?.value;
  if (!token) return false;
  
  const payload = AuthService.verifyToken(token);
  return payload !== null && payload.authorized === true;
}