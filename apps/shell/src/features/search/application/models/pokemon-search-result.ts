import type { PokemonSummary } from '../../../pokemon/domain/models/pokemon-summary';

export type PokemonSearchResult =
  | { status: 'found'; pokemon: PokemonSummary; searchName: string }
  | { status: 'not-found'; searchName: string }
  | { status: 'invalid' };
