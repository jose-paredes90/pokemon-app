import { useQuery } from '@tanstack/react-query';
import { pokemonDetailDependencies } from '../../dependency-container';

export function usePokemonDetail(pokemonId: number) {
  return useQuery({
    queryKey: ['pokemon', 'detail', pokemonId],
    queryFn: ({ signal }) => pokemonDetailDependencies.getPokemonDetail.execute(pokemonId, signal),
  });
}
