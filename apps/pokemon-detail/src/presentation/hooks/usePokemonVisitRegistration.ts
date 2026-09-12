import { historyDependencies } from '@pokedex/history';
import { useEffect, useRef } from 'react';
import type { PokemonDetail } from '../../domain/models/pokemon-detail';

export function usePokemonVisitRegistration(pokemon: PokemonDetail | undefined): void {
  const recordedPokemonIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!pokemon || recordedPokemonIdRef.current === pokemon.id) return;

    historyDependencies.registerPokemonVisit.execute({
      id: pokemon.id,
      name: pokemon.name,
      imageUrl: pokemon.imageUrl,
    });
    recordedPokemonIdRef.current = pokemon.id;
  }, [pokemon]);
}
