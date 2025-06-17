// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://jdrhyne.me',
  integrations: [react()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    ssr: {
      external: ['sharp']
    },
    optimizeDeps: {
      include: ['react', 'react-dom', '@uiw/react-md-editor', 'allotment']
    },
    esbuild: {
      jsx: 'automatic'
    }
  }
});