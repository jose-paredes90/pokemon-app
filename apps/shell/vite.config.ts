import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { createModuleFederationConfig } from './module-federation.config.ts';

export default defineConfig(({ command, mode }) => {
  const isDevelopment = command === 'serve';
  const environment = loadEnv(mode, process.cwd(), '');
  const moduleFederationConfig = createModuleFederationConfig({
    pokemonDetail:
      environment.VITE_POKEMON_DETAIL_REMOTE_URL ??
      (isDevelopment ? 'http://localhost:3001/remoteEntry.js' : '/remoteEntry.js'),
    pokemonHistory:
      environment.VITE_POKEMON_HISTORY_REMOTE_URL ??
      (isDevelopment ? 'http://localhost:3002/remoteEntry.js' : '/remoteEntry.js'),
  });

  return {
    base: isDevelopment ? 'http://localhost:3000' : '/',
    plugins: [react(), federation(moduleFederationConfig)],
    ...(isDevelopment && {
      server: {
        origin: 'http://localhost:3000',
        port: 3000,
        strictPort: true,
      },
    }),
    build: {
      target: 'chrome89',
      cssMinify: 'esbuild',
    },
  };
});
