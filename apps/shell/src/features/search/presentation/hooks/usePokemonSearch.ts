import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { pokemonDependencies } from '../../../../app/dependency-container';

export function usePokemonSearch(submittedName: string | null) {
  const listQuery = useInfiniteQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: ({ pageParam, signal }) =>
      pokemonDependencies.getPokemonPage.execute(pageParam, signal),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    enabled: submittedName === null,
  });
  const exactSearchQuery = useQuery({
    queryKey: ['pokemon', 'exact-search', submittedName],
    queryFn: ({ signal }) =>
      pokemonDependencies.searchPokemonByName.execute(submittedName ?? '', signal),
    enabled: submittedName !== null,
    retry: false,
  });
  const listedPokemon = useMemo(() => {
    const uniquePokemon = new Map(
      listQuery.data?.pages
        .flatMap((page) => page.pokemon)
        .map((pokemon) => [pokemon.id, pokemon]),
    );
    return [...uniquePokemon.values()];
  }, [listQuery.data]);

  return { listQuery, exactSearchQuery, listedPokemon };
}
