import React from 'react';
import { EditorDashboard } from './EditorDashboard';
import './editor-styles.css';

export function EditorApp() {
  const handleLogout = async () => {
    await fetch('/api/editor/auth/logout', { method: 'POST' });
    window.location.href = '/editor/login';
  };
  
  return (
    <div className="editor-app">
      <header className="editor-header">
        <h1>Content Editor</h1>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </header>
      
      <main className="editor-main">
        <EditorDashboard />
      </main>
    </div>
  );
}