import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  token: string;
}

export default function ImageUpload({ onUpload, token }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const file = acceptedFiles[0];
      console.log('ImageUpload - Token:', token ? 'present' : 'missing');
      console.log('ImageUpload - Token length:', token?.length);
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/editor/media/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const data = await response.json();
      onUpload(data.primaryUrl);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, [onUpload, token]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1,
    disabled: uploading,
  });

  return (
    <div 
      {...getRootProps()} 
      style={{
        border: `2px dashed var(--editor-border-medium)`,
        borderRadius: 'var(--editor-radius-md)',
        padding: 'var(--editor-space-lg)',
        textAlign: 'center',
        cursor: uploading ? 'not-allowed' : 'pointer',
        backgroundColor: isDragActive ? 'var(--editor-bg-tertiary)' : 'var(--editor-bg-primary)',
        opacity: uploading ? 0.6 : 1,
        transition: 'all var(--editor-transition-base)',
      }}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <p style={{ color: 'var(--editor-text-muted)' }}>Uploading...</p>
      ) : isDragActive ? (
        <p style={{ color: 'var(--editor-color-primary)' }}>Drop the image here...</p>
      ) : (
        <p style={{ color: 'var(--editor-text-secondary)' }}>Drag & drop an image here, or click to select</p>
      )}
      {error && (
        <p style={{ color: 'var(--editor-color-danger)', marginTop: 'var(--editor-space-sm)' }}>{error}</p>
      )}
    </div>
  );
}