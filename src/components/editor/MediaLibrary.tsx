import React, { useState, useEffect } from 'react';

interface MediaFile {
  url: string;
  filename: string;
  size: number;
  modifiedAt: string;
}

interface MediaLibraryProps {
  onSelect: (url: string) => void;
  token: string;
}

export default function MediaLibrary({ onSelect, token }: MediaLibraryProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/editor/media', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }

      const data = await response.json();
      setFiles(data.files);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load media');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return Math.round(bytes / 1024) + ' KB';
    return Math.round(bytes / 1048576 * 10) / 10 + ' MB';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading media...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

  if (files.length === 0) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>No images uploaded yet.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '15px'
      }}>
        {files.map((file) => (
          <div
            key={file.url}
            onClick={() => {
              setSelectedUrl(file.url);
              onSelect(file.url);
            }}
            style={{
              border: selectedUrl === file.url ? '3px solid #c13127' : '1px solid #ddd',
              borderRadius: '4px',
              overflow: 'hidden',
              cursor: 'pointer',
              backgroundColor: 'white',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              height: '120px',
              backgroundImage: `url(${file.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
            <div style={{ padding: '8px', fontSize: '12px' }}>
              <div style={{ 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis',
                fontWeight: 'bold',
              }}>
                {file.filename}
              </div>
              <div style={{ color: '#666', marginTop: '4px' }}>
                {formatFileSize(file.size)}
              </div>
              <div style={{ color: '#666' }}>
                {formatDate(file.modifiedAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}