import type { APIRoute } from 'astro';
import { requireAuth } from '../../../../lib/editor/auth';

export const GET: APIRoute = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const isAuthenticated = requireAuth(cookieHeader);

  return new Response(JSON.stringify({ 
    authenticated: isAuthenticated
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};