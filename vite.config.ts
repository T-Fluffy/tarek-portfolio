import { defineConfig, type Plugin } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Backend URL for the dev-server proxy (set by docker-compose.dev.yml).
// When unset, no proxy is configured and the app calls VITE_API_URL directly.
const backendUrl = process.env.BACKEND_URL || '';

// Injects a Content-Security-Policy meta tag into production builds only.
// (Dev mode leaves it out so the React fast-refresh preamble inline script works.)
function cspMeta(): Plugin {
  const apiUrl = process.env.VITE_API_URL || '';
  const cspValue =
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https://github.com https://raw.githubusercontent.com " +
    "https://avatars.githubusercontent.com https://socialify.git.ci; " +
    `connect-src 'self' ${apiUrl} https://api.github.com; ` +
    "font-src 'self' data:; base-uri 'self'; form-action 'self'; frame-ancestors 'none'";

  return {
    name: 'html-csp',
    apply: 'build',
    transformIndexHtml() {
      return [
        {
          tag: 'meta',
          attrs: { 'http-equiv': 'Content-Security-Policy', content: cspValue },
          injectTo: 'head-prepend',
        },
      ];
    },
  };
}

export default defineConfig({
  plugins: [react(), cspMeta()],
  // '/tarek-portfolio/' for GitHub Pages; '/' for Docker / self-hosting.
  base: process.env.VITE_BASE_PATH || '/tarek-portfolio/',
  server: {
    host: true,
    port: 5173,
    // Container-friendly file watching on bind mounts
    watch: process.env.VITE_POLLING === 'true' ? { usePolling: true } : undefined,
    proxy: backendUrl
      ? {
          '/api': {
            target: backendUrl,
            changeOrigin: true,
          },
        }
      : undefined,
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test/setup.ts',
  },
});