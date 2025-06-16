import type { APIRoute } from 'astro';
import { verifyToken } from '../../../../lib/editor/auth';

export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get('editor-token')?.value;
  
  if (!token) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify({ authenticated: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};