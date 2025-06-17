import type { APIContext } from 'astro';
import { verifyToken } from '../../../../lib/editor/auth';
import { createDeploymentService } from '../../../../lib/editor/deployment';
import { createGitService } from '../../../../lib/editor/git';

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

    const { commitMessage = 'Deploy from editor', branch = 'main' } = await request.json();

    // Get Vercel configuration from environment
    const vercelToken = import.meta.env.VERCEL_TOKEN;
    const projectId = import.meta.env.VERCEL_PROJECT_ID;
    const teamId = import.meta.env.VERCEL_TEAM_ID;

    if (!vercelToken || !projectId) {
      return new Response(JSON.stringify({ error: 'Vercel not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check for uncommitted changes
    const gitService = createGitService();
    const status = await gitService.getStatus();
    
    if (status.modified.length > 0 || status.staged.length > 0) {
      // Commit any pending changes
      const filesToCommit = [...status.modified, ...status.staged];
      await gitService.commit(filesToCommit, commitMessage);
    }

    // Trigger Vercel deployment
    const deploymentService = createDeploymentService(vercelToken, projectId, teamId);
    const deployment = await deploymentService.trigger(branch);

    return new Response(JSON.stringify({ 
      success: true,
      deploymentId: deployment.id,
      url: deployment.url,
      state: deployment.state,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Deploy trigger error:', error);
    return new Response(JSON.stringify({ error: 'Failed to trigger deployment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}