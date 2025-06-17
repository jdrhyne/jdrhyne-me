export interface Deployment {
  id: string;
  url: string;
  state: 'BUILDING' | 'READY' | 'ERROR' | 'CANCELED';
  createdAt: Date;
  readyAt?: Date;
  buildingAt?: Date;
  error?: string;
}

export interface DeploymentStatus {
  state: 'BUILDING' | 'READY' | 'ERROR' | 'CANCELED';
  url?: string;
  logs?: string[];
}

export interface DeploymentService {
  trigger(branch?: string): Promise<Deployment>;
  getStatus(deploymentId: string): Promise<DeploymentStatus>;
  getHistory(limit?: number): Promise<Deployment[]>;
  cancel(deploymentId: string): Promise<void>;
}

class VercelDeploymentService implements DeploymentService {
  private token: string;
  private projectId: string;
  private teamId?: string;

  constructor(token: string, projectId: string, teamId?: string) {
    this.token = token;
    this.projectId = projectId;
    this.teamId = teamId;
  }

  async trigger(branch: string = 'main'): Promise<Deployment> {
    try {
      const response = await fetch('https://api.vercel.com/v13/deployments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.projectId,
          gitSource: {
            ref: branch,
            type: 'github',
          },
          projectId: this.projectId,
          teamId: this.teamId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Deployment failed');
      }

      const data = await response.json();
      
      return {
        id: data.id,
        url: data.url,
        state: data.readyState || 'BUILDING',
        createdAt: new Date(data.createdAt),
        readyAt: data.ready ? new Date(data.ready) : undefined,
        buildingAt: data.buildingAt ? new Date(data.buildingAt) : undefined,
      };
    } catch (error) {
      console.error('Deployment trigger error:', error);
      throw new Error('Failed to trigger deployment');
    }
  }

  async getStatus(deploymentId: string): Promise<DeploymentStatus> {
    try {
      const params = new URLSearchParams();
      if (this.teamId) params.append('teamId', this.teamId);

      const response = await fetch(
        `https://api.vercel.com/v13/deployments/${deploymentId}?${params}`,
        {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to get deployment status');
      }

      const data = await response.json();

      return {
        state: data.readyState || 'BUILDING',
        url: data.url,
      };
    } catch (error) {
      console.error('Get deployment status error:', error);
      throw new Error('Failed to get deployment status');
    }
  }

  async getHistory(limit: number = 10): Promise<Deployment[]> {
    try {
      const params = new URLSearchParams({
        projectId: this.projectId,
        limit: limit.toString(),
      });
      if (this.teamId) params.append('teamId', this.teamId);

      const response = await fetch(
        `https://api.vercel.com/v6/deployments?${params}`,
        {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to get deployment history');
      }

      const data = await response.json();

      return data.deployments.map((deployment: any) => ({
        id: deployment.uid,
        url: deployment.url,
        state: deployment.state,
        createdAt: new Date(deployment.created),
        readyAt: deployment.ready ? new Date(deployment.ready) : undefined,
        error: deployment.error,
      }));
    } catch (error) {
      console.error('Get deployment history error:', error);
      throw new Error('Failed to get deployment history');
    }
  }

  async cancel(deploymentId: string): Promise<void> {
    try {
      const params = new URLSearchParams();
      if (this.teamId) params.append('teamId', this.teamId);

      const response = await fetch(
        `https://api.vercel.com/v12/deployments/${deploymentId}/cancel?${params}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to cancel deployment');
      }
    } catch (error) {
      console.error('Cancel deployment error:', error);
      throw new Error('Failed to cancel deployment');
    }
  }
}

// Factory function
export function createDeploymentService(
  token: string,
  projectId: string,
  teamId?: string
): DeploymentService {
  return new VercelDeploymentService(token, projectId, teamId);
}