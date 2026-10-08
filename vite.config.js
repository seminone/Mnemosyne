import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Windows native fs.watch often fails on paths with spaces/parentheses (errno -4094).
// Polling avoids that so `npm run dev` can run under GUI_to_Electron on D:.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 1000,
      binaryInterval: 1000,
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
