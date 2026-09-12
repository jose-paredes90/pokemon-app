import type { PokemonSummary } from './pokemon-summary';

export interface PokemonPage {
  pokemon: PokemonSummary[];
  nextOffset: number | null;
}
