import type { APIContext } from 'astro';
import { verifyToken } from '../../../../../lib/editor/auth';
import { createDeploymentService } from '../../../../../lib/editor/deployment';

export async function GET({ params, request }: APIContext) {
  try {
    // Get deployment ID from URL parameter
    const deploymentId = params.id;
    if (!deploymentId) {
      return new Response(JSON.stringify({ error: 'Deployment ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify authentication
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get Vercel configuration
    const vercelToken = import.meta.env.VERCEL_TOKEN;
    const projectId = import.meta.env.VERCEL_PROJECT_ID;
    const teamId = import.meta.env.VERCEL_TEAM_ID;

    if (!vercelToken || !projectId) {
      return new Response(JSON.stringify({ 
        error: 'Deployment service not configured. Missing VERCEL_TOKEN or VERCEL_PROJECT_ID' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create deployment service
    const deploymentService = createDeploymentService(vercelToken, projectId, teamId);
    
    // Get deployment status
    const status = await deploymentService.getStatus(deploymentId);
    
    return new Response(JSON.stringify(status), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Deployment status error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to get deployment status';
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}