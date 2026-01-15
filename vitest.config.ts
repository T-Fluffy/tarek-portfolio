import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/tarek-portfolio/', // 🚀 This is the critical line for GitHub Pages
  test: {
    globals: true,
    environment: 'happy-dom', 
    setupFiles: './src/test/setup.ts',
  },
});