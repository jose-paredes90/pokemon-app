import { createModuleFederationConfig } from '@module-federation/vite';

export default createModuleFederationConfig({
  name: 'pokemon_detail',
  filename: 'remoteEntry.js',
  exposes: {
    './PokemonDetail': './src/presentation/remote/PokemonDetailRemote.tsx',
  },
  dts: false,
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
