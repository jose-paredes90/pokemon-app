import { useQuery } from '@tanstack/react-query';
import { pokemonDependencies } from '../../../../app/dependency-container';
import type { HomePokemonType } from '../../application/models/home-pokemon-type';

export function usePokemonByType(pokemonType: HomePokemonType) {
  return useQuery({
    queryKey: ['pokemon', 'type', pokemonType],
    queryFn: ({ signal }) => pokemonDependencies.listPokemonByType.execute(pokemonType, signal),
  });
}
