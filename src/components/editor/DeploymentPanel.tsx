import React, { useState, useEffect } from 'react';

interface DeploymentPanelProps {
  token: string;
}

interface Deployment {
  id: string;
  url: string;
  state: 'BUILDING' | 'READY' | 'ERROR' | 'CANCELED';
  createdAt: string;
}

export default function DeploymentPanel({ token }: DeploymentPanelProps) {
  const [loading, setLoading] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDeployment, setCurrentDeployment] = useState<Deployment | null>(null);
  const [deploymentStatus, setDeploymentStatus] = useState<string>('');

  const handleDeploy = async () => {
    setDeploying(true);
    setError(null);

    try {
      const response = await fetch('/api/editor/deploy/trigger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          commitMessage: 'Deploy from CMS editor',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Deployment failed');
      }

      const data = await response.json();
      setCurrentDeployment({
        id: data.deploymentId,
        url: data.url,
        state: data.state,
        createdAt: new Date().toISOString(),
      });

      // Start polling for status
      pollDeploymentStatus(data.deploymentId);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deployment failed');
      setDeploying(false);
    }
  };

  const pollDeploymentStatus = async (deploymentId: string) => {
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes maximum

    const checkStatus = async () => {
      if (attempts >= maxAttempts) {
        setDeploymentStatus('Deployment timeout');
        setDeploying(false);
        return;
      }

      try {
        const response = await fetch(`/api/editor/deploy/status/${deploymentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          
          if (data.state === 'READY') {
            setDeploymentStatus('Deployment successful!');
            setDeploying(false);
            setCurrentDeployment(prev => prev ? { ...prev, state: 'READY' } : null);
          } else if (data.state === 'ERROR' || data.state === 'CANCELED') {
            setDeploymentStatus(`Deployment ${data.state.toLowerCase()}`);
            setDeploying(false);
            setCurrentDeployment(prev => prev ? { ...prev, state: data.state } : null);
          } else {
            // Still building, continue polling
            attempts++;
            setTimeout(checkStatus, 5000); // Check every 5 seconds
          }
        }
      } catch (err) {
        // Continue polling even if request fails
        attempts++;
        setTimeout(checkStatus, 5000);
      }
    };

    checkStatus();
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case 'READY': return 'var(--editor-color-success)';
      case 'BUILDING': return 'var(--editor-color-warning)';
      case 'ERROR': return 'var(--editor-color-danger)';
      case 'CANCELED': return 'var(--editor-color-gray-600)';
      default: return 'var(--editor-color-gray-500)';
    }
  };

  return (
    <div className="editor-panel" style={{ marginTop: 'var(--editor-space-lg)' }}>
      <h3 style={{ marginTop: 0, marginBottom: 'var(--editor-space-lg)' }}>
        Deployment
      </h3>

      <button
        onClick={handleDeploy}
        disabled={deploying}
        className={`editor-btn editor-btn-full ${deploying ? 'editor-loading' : 'editor-btn-info'}`}
      >
        {deploying ? '🚀 Deploying...' : '🚀 Deploy to Production'}
      </button>

      {deploymentStatus && (
        <div 
          className={`editor-alert ${deploymentStatus.includes('successful') ? 'editor-alert-success' : 'editor-alert-warning'}`}
          style={{ textAlign: 'center', marginTop: 'var(--editor-space-md)' }}
        >
          {deploymentStatus}
        </div>
      )}

      {currentDeployment && (
        <div className="editor-card" style={{ marginTop: 'var(--editor-space-lg)' }}>
          <h4 style={{ marginTop: 0, marginBottom: 'var(--editor-space-sm)' }}>Current Deployment</h4>
          <div style={{ fontSize: 'var(--editor-font-size-sm)' }}>
            <div style={{ marginBottom: 'var(--editor-space-sm)' }}>
              <strong>Status:</strong>{' '}
              <span style={{ color: getStateColor(currentDeployment.state) }}>
                {currentDeployment.state}
              </span>
            </div>
            <div style={{ marginBottom: 'var(--editor-space-sm)' }}>
              <strong>URL:</strong>{' '}
              <a 
                href={`https://${currentDeployment.url}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--editor-color-info)' }}
              >
                {currentDeployment.url}
              </a>
            </div>
            <div>
              <strong>Started:</strong>{' '}
              {new Date(currentDeployment.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="editor-alert editor-alert-error" style={{ marginTop: 'var(--editor-space-md)' }}>
          Error: {error}
        </div>
      )}

      <div className="editor-alert editor-alert-info" style={{ marginTop: 'var(--editor-space-lg)' }}>
        <strong>Note:</strong> Deployment will:
        <ul style={{ marginTop: 'var(--editor-space-sm)', marginBottom: 0, paddingLeft: 'var(--editor-space-lg)' }}>
          <li>Commit any unsaved changes</li>
          <li>Push to your Git repository</li>
          <li>Trigger a Vercel build</li>
          <li>Update your live site when ready</li>
        </ul>
      </div>
    </div>
  );
}