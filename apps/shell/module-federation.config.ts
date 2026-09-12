import { createModuleFederationConfig as createConfig } from '@module-federation/vite';

interface ShellRemoteUrls {
  pokemonDetail: string;
  pokemonHistory: string;
}

export function createModuleFederationConfig(remoteUrls: ShellRemoteUrls) {
  return createConfig({
    name: 'pokedex_shell',
    remotes: {
      pokemonDetail: {
        type: 'module',
        name: 'pokemon_detail',
        entry: remoteUrls.pokemonDetail,
      },
      pokemonHistory: {
        type: 'module',
        name: 'pokemon_history',
        entry: remoteUrls.pokemonHistory,
      },
    },
    shared: {
      react: { singleton: true },
      'react-dom': { singleton: true },
    },
  });
}
