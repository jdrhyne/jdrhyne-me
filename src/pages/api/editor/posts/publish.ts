import type { APIContext } from 'astro';
import { verifyToken } from '../../../../lib/editor/auth';
import { createPublishingService } from '../../../../lib/editor/publishing';

export async function POST({ request }: APIContext) {
  try {
    // Verify authentication
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !await verifyToken(token)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { postId, commitMessage, scheduledDate } = await request.json();

    if (!postId) {
      return new Response(JSON.stringify({ error: 'Post ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const publishingService = createPublishingService();
    
    if (scheduledDate) {
      // Schedule for future publication
      await publishingService.schedule(postId, new Date(scheduledDate));
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Post scheduled successfully' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // Publish immediately
      await publishingService.publish(postId, { commitMessage });
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Post published successfully' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('Publish error:', error);
    return new Response(JSON.stringify({ error: 'Failed to publish post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}