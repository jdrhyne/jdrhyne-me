import type { APIRoute } from 'astro';
import { verifyToken } from '../../../../lib/editor/auth';
import { listPosts, savePost } from '../../../../lib/editor/storage';

// GET /api/editor/posts - List all posts
export const GET: APIRoute = async ({ request, cookies }) => {
  // Verify authentication - try Bearer token first, then cookie
  let token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    token = cookies.get('editor-token')?.value;
  }
  
  if (!token || !verifyToken(token)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const posts = await listPosts();
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error listing posts:', error);
    return new Response(JSON.stringify({ error: 'Failed to list posts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST /api/editor/posts - Create a new post
export const POST: APIRoute = async ({ request, cookies }) => {
  // Verify authentication - try Bearer token first, then cookie
  let token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    token = cookies.get('editor-token')?.value;
  }
  
  if (!token || !verifyToken(token)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const { filename, content, isDraft = true } = await request.json();
    
    if (!filename || !content) {
      return new Response(JSON.stringify({ error: 'Filename and content are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const result = await savePost(filename, content, isDraft);
    
    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return new Response(JSON.stringify({ error: 'Failed to create post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};