import { defineConfig } from 'vitest/config'; // Change this line
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom', 
    setupFiles: './src/test/setup.ts',
  },
});