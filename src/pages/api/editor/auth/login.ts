import type { APIRoute } from 'astro';
import { AuthService } from '../../../../lib/editor/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Rate limiting check (simple implementation)
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Parse request body
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== 'string') {
      return new Response(JSON.stringify({ error: 'Password is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Verify password
    const isValid = await AuthService.verifyPassword(password);
    
    if (!isValid) {
      // Log failed attempt
      console.log(`Failed login attempt from IP: ${clientIP}`);
      
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Generate JWT token
    const token = AuthService.generateToken();
    
    // Create auth cookie
    const cookie = AuthService.createAuthCookie(token);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Authentication successful'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookie
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};