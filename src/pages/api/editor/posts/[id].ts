import type { APIRoute } from 'astro';
import { verifyToken } from '../../../../lib/editor/auth';
import { getPost, savePost, deletePost, publishDraft, unpublishPost } from '../../../../lib/editor/storage';

// GET /api/editor/posts/[id] - Get a single post
export const GET: APIRoute = async ({ params, cookies, url }) => {
  // Verify authentication
  const token = cookies.get('editor-token')?.value;
  if (!token || !verifyToken(token)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const filename = params.id;
  const isDraft = url.searchParams.get('draft') !== 'false';
  
  if (!filename) {
    return new Response(JSON.stringify({ error: 'Filename is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const post = await getPost(filename, isDraft);
    
    if (!post) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error getting post:', error);
    return new Response(JSON.stringify({ error: 'Failed to get post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// PUT /api/editor/posts/[id] - Update a post
export const PUT: APIRoute = async ({ params, request, cookies }) => {
  // Verify authentication
  const token = cookies.get('editor-token')?.value;
  if (!token || !verifyToken(token)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const filename = params.id;
  
  if (!filename) {
    return new Response(JSON.stringify({ error: 'Filename is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const { content, isDraft = true, action } = await request.json();
    
    // Handle special actions
    if (action === 'publish') {
      const result = await publishDraft(filename);
      return new Response(JSON.stringify(result), {
        status: result.success ? 200 : 500,
        headers: { 'Content-Type': 'application/json' }
      });
    } else if (action === 'unpublish') {
      const result = await unpublishPost(filename);
      return new Response(JSON.stringify(result), {
        status: result.success ? 200 : 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Regular update
    if (!content) {
      return new Response(JSON.stringify({ error: 'Content is required' }), {
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
    console.error('Error updating post:', error);
    return new Response(JSON.stringify({ error: 'Failed to update post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE /api/editor/posts/[id] - Delete a post
export const DELETE: APIRoute = async ({ params, cookies, url }) => {
  // Verify authentication
  const token = cookies.get('editor-token')?.value;
  if (!token || !verifyToken(token)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const filename = params.id;
  const isDraft = url.searchParams.get('draft') !== 'false';
  
  if (!filename) {
    return new Response(JSON.stringify({ error: 'Filename is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const result = await deletePost(filename, isDraft);
    
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
    console.error('Error deleting post:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};