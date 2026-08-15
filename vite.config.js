import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// One Vite project, two pages: the marketing site at / and the farmer
// portal at /portal/. The site is hosted as a GitHub Pages project page
// at https://aksharma35.github.io/clean-agro/, so production builds need
// the /clean-agro/ base. Dev, StackBlitz, and CodeSandbox serve from /.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/clean-agro/' : '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        site: fileURLToPath(new URL('./index.html', import.meta.url)),
        portal: fileURLToPath(new URL('./portal/index.html', import.meta.url)),
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/portal/test/setup.js',
    css: false,
  },
}));
