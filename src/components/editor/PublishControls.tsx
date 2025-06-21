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
      <div className="editor-alert editor-alert-success" style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--editor-space-sm)',
      }}>
        <span style={{ fontWeight: 'bold' }}>
          ✓ Published
        </span>
        <button
          onClick={() => {/* TODO: Implement unpublish */}}
          className="editor-btn editor-btn-secondary editor-btn-sm"
          style={{ marginLeft: 'auto' }}
        >
          Unpublish
        </button>
      </div>
    );
  }

  return (
    <div className="editor-panel" style={{ marginBottom: 'var(--editor-space-lg)' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: showScheduler ? 'var(--editor-space-md)' : 0,
      }}>
        <span style={{ fontWeight: 'bold', color: 'var(--editor-text-secondary)' }}>
          Status: Draft
        </span>
        <div style={{ display: 'flex', gap: 'var(--editor-space-sm)' }}>
          <button
            onClick={() => handlePublish()}
            disabled={loading}
            className={`editor-btn editor-btn-sm editor-btn-success ${loading ? 'editor-loading' : ''}`}
          >
            {loading ? 'Publishing...' : 'Publish Now'}
          </button>
          <button
            onClick={() => setShowScheduler(!showScheduler)}
            className="editor-btn editor-btn-sm editor-btn-secondary"
          >
            Schedule
          </button>
        </div>
      </div>

      {showScheduler && (
        <div style={{
          borderTop: '1px solid var(--editor-border-light)',
          paddingTop: 'var(--editor-space-md)',
        }}>
          <label style={{ display: 'block', marginBottom: 'var(--editor-space-sm)', fontWeight: 'bold' }}>
            Schedule for:
          </label>
          <div style={{ display: 'flex', gap: 'var(--editor-space-sm)', alignItems: 'center' }}>
            <input
              type="datetime-local"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              className="editor-input"
              style={{ flex: 1 }}
            />
            <button
              onClick={() => handlePublish(true)}
              disabled={loading || !scheduledDate}
              className={`editor-btn editor-btn-info ${loading ? 'editor-loading' : ''}`}
            >
              Set Schedule
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="editor-alert editor-alert-error" style={{ marginTop: 'var(--editor-space-sm)' }}>
          {error}
        </div>
      )}
    </div>
  );
}