import { defineConfig, type Plugin } from 'vitest/config';
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Injects a Content-Security-Policy meta tag into production builds only.
// (Dev mode leaves it out so the React fast-refresh preamble inline script works.)
function cspMeta(apiUrl: string): Plugin {
  const cspValue =
    "default-src 'self'; script-src 'self' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https://github.com https://raw.githubusercontent.com " +
    "https://avatars.githubusercontent.com https://media.githubusercontent.com https://socialify.git.ci; " +
    `connect-src 'self' ${apiUrl} https://api.github.com; ` +
    "font-src 'self' data:; base-uri 'self'; form-action 'self'; " +
    "frame-src https://challenges.cloudflare.com; frame-ancestors 'none'";

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

export default defineConfig(({ mode }) => {
  // Vite does NOT put non-VITE_ vars from .env files into process.env for the
  // config file, so read them explicitly. Real environment variables
  // (docker-compose, CI) take precedence over .env file values.
  const fileEnv = loadEnv(mode, process.cwd(), "");
  const pick = (key: string) => process.env[key] || fileEnv[key] || "";

  // Backend URL for the dev-server proxy (docker-compose.dev.yml or .env).
  // When unset, no proxy is configured and the app calls VITE_API_URL directly.
  const backendUrl = pick("BACKEND_URL");

  return {
    plugins: [react(), cspMeta(pick("VITE_API_URL"))],
    // '/tarek-portfolio/' for GitHub Pages; '/' for Docker / self-hosting.
    base: pick("VITE_BASE_PATH") || "/tarek-portfolio/",
    server: {
      host: true,
      port: 5173,
      // Container-friendly file watching on bind mounts
      watch: pick("VITE_POLLING") === "true" ? { usePolling: true } : undefined,
      proxy: backendUrl
        ? {
            "/api": {
              target: backendUrl,
              changeOrigin: true,
            },
          }
        : undefined,
    },
    test: {
      globals: true,
      environment: "happy-dom",
      setupFiles: "./src/test/setup.ts",
    },
  };
});