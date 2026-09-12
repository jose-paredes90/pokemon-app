import type { PokemonRepository } from '../../../pokemon/domain/repositories/pokemon.repository';

const SEARCH_POKEMON_PAGE_SIZE = 30;

export class GetPokemonPageUseCase {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  execute(offset: number, signal?: AbortSignal) {
    return this.pokemonRepository.getPage(offset, SEARCH_POKEMON_PAGE_SIZE, signal);
  }
}
