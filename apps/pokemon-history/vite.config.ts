import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import moduleFederationConfig from './module-federation.config.ts';

export default defineConfig(({ command }) => {
  const isDevelopment = command === 'serve';

  return {
    base: isDevelopment ? 'http://localhost:3002' : '/',
    plugins: [react(), federation(moduleFederationConfig)],
    ...(isDevelopment && {
      server: {
        origin: 'http://localhost:3002',
        port: 3002,
        strictPort: true,
      },
    }),
    build: {
      target: 'chrome89',
      cssMinify: 'esbuild',
    },
  };
});
