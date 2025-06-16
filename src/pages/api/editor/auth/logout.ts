import type { APIRoute } from 'astro';
import { AuthService } from '../../../../lib/editor/auth';

export const POST: APIRoute = async () => {
  const cookie = AuthService.clearAuthCookie();

  return new Response(JSON.stringify({ 
    success: true,
    message: 'Logged out successfully'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': cookie
    }
  });
};