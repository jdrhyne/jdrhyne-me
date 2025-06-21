import type { APIContext } from 'astro';
import { verifyToken } from '../../../../lib/editor/auth';

export async function GET({ request, cookies }: APIContext) {
  try {
    // Test both Bearer token and cookie
    const bearerToken = request.headers.get('Authorization')?.replace('Bearer ', '');
    const cookieToken = cookies.get('editor-token')?.value;
    
    console.log('Test - Bearer token present:', !!bearerToken);
    console.log('Test - Cookie token present:', !!cookieToken);
    
    const bearerValid = bearerToken ? verifyToken(bearerToken) : null;
    const cookieValid = cookieToken ? verifyToken(cookieToken) : null;
    
    console.log('Test - Bearer token valid:', !!bearerValid);
    console.log('Test - Cookie token valid:', !!cookieValid);
    
    return new Response(JSON.stringify({
      bearerToken: {
        present: !!bearerToken,
        valid: !!bearerValid,
        length: bearerToken?.length || 0
      },
      cookieToken: {
        present: !!cookieToken,
        valid: !!cookieValid,
        length: cookieToken?.length || 0
      },
      localStorage: {
        instruction: 'Check localStorage.getItem("editorToken") in browser console'
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Test endpoint error:', error);
    return new Response(JSON.stringify({ error: 'Test failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}