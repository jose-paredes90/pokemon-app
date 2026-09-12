declare module 'pokemonDetail/PokemonDetail' {
  import type { ComponentType } from 'react';

  interface PokemonDetailRemoteProps {
    pokemonId: number;
    onBack: () => void;
  }

  const PokemonDetailRemote: ComponentType<PokemonDetailRemoteProps>;
  export default PokemonDetailRemote;
}

declare module 'pokemonHistory/PokemonHistory' {
  import type { ComponentType } from 'react';

  interface PokemonHistoryRemoteProps {
    onPokemonSelected: (pokemonId: number) => void;
    onBack: () => void;
  }

  const PokemonHistoryRemote: ComponentType<PokemonHistoryRemoteProps>;
  export default PokemonHistoryRemote;
}
