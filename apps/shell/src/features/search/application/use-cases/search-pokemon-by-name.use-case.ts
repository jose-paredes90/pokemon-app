import type { PokemonRepository } from '../../../pokemon/domain/repositories/pokemon.repository';
import type { PokemonSearchResult } from '../models/pokemon-search-result';

const EXACT_POKEMON_NAME_PATTERN = /^[a-z0-9-]+$/;

export class SearchPokemonByNameUseCase {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(pokemonName: string, signal?: AbortSignal): Promise<PokemonSearchResult> {
    const normalizedName = pokemonName.trim().toLowerCase();

    if (!EXACT_POKEMON_NAME_PATTERN.test(normalizedName)) {
      return { status: 'invalid' };
    }

    const pokemon = await this.pokemonRepository.searchByExactName(normalizedName, signal);

    return pokemon
      ? { status: 'found', pokemon, searchName: normalizedName }
      : { status: 'not-found', searchName: normalizedName };
  }
}
