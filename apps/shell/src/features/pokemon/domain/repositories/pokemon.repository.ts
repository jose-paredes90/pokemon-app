import type { PokemonPage } from '../models/pokemon-page';
import type { PokemonSummary } from '../models/pokemon-summary';

export interface PokemonRepository {
  listByType(pokemonType: string, limit: number, signal?: AbortSignal): Promise<PokemonSummary[]>;
  getPage(offset: number, limit: number, signal?: AbortSignal): Promise<PokemonPage>;
  searchByExactName(pokemonName: string, signal?: AbortSignal): Promise<PokemonSummary | null>;
}
