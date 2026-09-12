import { createModuleFederationConfig } from '@module-federation/vite';

export default createModuleFederationConfig({
  name: 'pokemon_history',
  filename: 'remoteEntry.js',
  exposes: {
    './PokemonHistory': './src/presentation/remote/PokemonHistoryRemote.tsx',
  },
  dts: false,
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
