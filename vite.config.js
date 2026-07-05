import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// For GitHub Pages project sites, change base to '/YOUR_REPO_NAME/'.
// Example: base: '/baptism-invitation/'
export default defineConfig({
  plugins: [react()],
  base: './'
});
