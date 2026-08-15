import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// One Vite project, two pages: the marketing site at / and the farmer
// portal at /portal/. The site is served from the root of the custom
// domain (cleanagro.xyz, via public/CNAME plus the domain configured in
// the repo's Pages settings), so the default '/' base is correct in dev,
// StackBlitz/CodeSandbox, and production alike.
export default defineConfig(({ command }) => ({
  base: '/',
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
