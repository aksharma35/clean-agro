import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// One Vite project, two pages: the marketing site at / and the farmer
// portal at /portal/. Everything is served from the domain root
// (cleanagro.xyz via CNAME), so no base-path juggling is needed in dev,
// StackBlitz/CodeSandbox, or production.
export default defineConfig({
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
});
