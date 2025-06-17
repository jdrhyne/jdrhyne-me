import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

export default function MinimalEditor() {
  const [value, setValue] = useState("# Test\n\nCan you see me typing?");

  return (
    <div style={{ height: '100vh', padding: '20px' }}>
      <h2>Minimal MDEditor Test</h2>
      <div style={{ height: '500px', border: '2px solid red' }}>
        <MDEditor
          value={value}
          onChange={(val) => {
            console.log('Value changed:', val);
            setValue(val || '');
          }}
          preview="edit"
          height="100%"
          hideToolbar={false}
          textareaProps={{
            placeholder: 'Type here...',
            style: {
              fontSize: '16px',
              lineHeight: '1.5',
              color: 'black',
              backgroundColor: 'white',
            }
          }}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <strong>Current value:</strong>
        <pre>{value}</pre>
      </div>
    </div>
  );
}