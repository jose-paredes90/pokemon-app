import type { PokemonDetail } from '../models/pokemon-detail';

export interface PokemonRepository {
  getDetail(pokemonId: number, signal?: AbortSignal): Promise<PokemonDetail>;
}
