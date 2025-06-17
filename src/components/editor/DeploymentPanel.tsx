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
      case 'READY': return '#4CAF50';
      case 'BUILDING': return '#FF9800';
      case 'ERROR': return '#f44336';
      case 'CANCELED': return '#666';
      default: return '#999';
    }
  };

  return (
    <div style={{
      padding: '20px',
      background: '#f5f5f5',
      borderRadius: '4px',
      marginTop: '20px',
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '20px' }}>
        Deployment
      </h3>

      <button
        onClick={handleDeploy}
        disabled={deploying}
        style={{
          width: '100%',
          padding: '12px',
          background: deploying ? '#ccc' : '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: deploying ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        {deploying ? '🚀 Deploying...' : '🚀 Deploy to Production'}
      </button>

      {deploymentStatus && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          background: deploymentStatus.includes('successful') ? '#e8f5e9' : '#fff3e0',
          border: `1px solid ${deploymentStatus.includes('successful') ? '#4CAF50' : '#FF9800'}`,
          borderRadius: '4px',
          textAlign: 'center',
        }}>
          {deploymentStatus}
        </div>
      )}

      {currentDeployment && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
        }}>
          <h4 style={{ marginTop: 0, marginBottom: '10px' }}>Current Deployment</h4>
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '8px' }}>
              <strong>Status:</strong>{' '}
              <span style={{ color: getStateColor(currentDeployment.state) }}>
                {currentDeployment.state}
              </span>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <strong>URL:</strong>{' '}
              <a 
                href={`https://${currentDeployment.url}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#2196F3' }}
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
        <div style={{
          marginTop: '15px',
          padding: '10px',
          background: '#ffebee',
          border: '1px solid #ffcdd2',
          borderRadius: '4px',
          color: '#c62828',
        }}>
          Error: {error}
        </div>
      )}

      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: '#e3f2fd',
        borderRadius: '4px',
        fontSize: '14px',
      }}>
        <strong>Note:</strong> Deployment will:
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Commit any unsaved changes</li>
          <li>Push to your Git repository</li>
          <li>Trigger a Vercel build</li>
          <li>Update your live site when ready</li>
        </ul>
      </div>
    </div>
  );
}