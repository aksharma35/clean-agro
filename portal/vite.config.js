import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The marketing site is served from the domain root (cleanagro.xyz via CNAME),
// so the portal lives one level down at /portal/.
// CodeSandbox and `npm run dev` serve from '/', so only apply the
// subpath when building for production.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/portal/' : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    css: false,
  },
}));
