import React, { useState } from 'react';

interface PublishControlsProps {
  postId: string;
  currentStatus: 'draft' | 'published';
  onStatusChange: () => void;
  token: string;
}

export default function PublishControls({ postId, currentStatus, onStatusChange, token }: PublishControlsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');

  const handlePublish = async (scheduled?: boolean) => {
    setLoading(true);
    setError(null);

    try {
      const body: any = { postId };
      
      if (scheduled && scheduledDate) {
        body.scheduledDate = new Date(scheduledDate).toISOString();
      }

      const response = await fetch('/api/editor/posts/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to publish');
      }

      onStatusChange();
      setShowScheduler(false);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish');
    } finally {
      setLoading(false);
    }
  };

  if (currentStatus === 'published') {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        background: '#e8f5e9',
        borderRadius: '4px',
      }}>
        <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>
          ✓ Published
        </span>
        <button
          onClick={() => {/* TODO: Implement unpublish */}}
          style={{
            marginLeft: 'auto',
            padding: '6px 12px',
            background: 'transparent',
            border: '1px solid #666',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Unpublish
        </button>
      </div>
    );
  }

  return (
    <div style={{
      padding: '15px',
      background: '#f5f5f5',
      borderRadius: '4px',
      marginBottom: '20px',
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: showScheduler ? '15px' : 0,
      }}>
        <span style={{ fontWeight: 'bold', color: '#666' }}>
          Status: Draft
        </span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handlePublish()}
            disabled={loading}
            style={{
              padding: '8px 16px',
              background: loading ? '#ccc' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
            }}
          >
            {loading ? 'Publishing...' : 'Publish Now'}
          </button>
          <button
            onClick={() => setShowScheduler(!showScheduler)}
            style={{
              padding: '8px 16px',
              background: 'transparent',
              color: '#2196F3',
              border: '1px solid #2196F3',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Schedule
          </button>
        </div>
      </div>

      {showScheduler && (
        <div style={{
          borderTop: '1px solid #ddd',
          paddingTop: '15px',
        }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Schedule for:
          </label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="datetime-local"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              style={{
                flex: 1,
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
            <button
              onClick={() => handlePublish(true)}
              disabled={loading || !scheduledDate}
              style={{
                padding: '8px 16px',
                background: loading || !scheduledDate ? '#ccc' : '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading || !scheduledDate ? 'not-allowed' : 'pointer',
              }}
            >
              Set Schedule
            </button>
          </div>
        </div>
      )}

      {error && (
        <div style={{
          marginTop: '10px',
          padding: '10px',
          background: '#ffebee',
          border: '1px solid #ffcdd2',
          borderRadius: '4px',
          color: '#c62828',
        }}>
          {error}
        </div>
      )}
    </div>
  );
}