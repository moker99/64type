import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-subpath-dev',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/64type/')) {
            req.url = req.url.replace('/64type', '');
          }
          next();
        });
      }
    }
  ],
  base: './', // 支援 GitHub Pages 子路徑與各類靜態託管平台
  server: {
    port: 3000,
    open: false
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
