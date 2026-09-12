import type { PokemonRepository } from '../../../pokemon/domain/repositories/pokemon.repository';
import type { HomePokemonType } from '../models/home-pokemon-type';

const HOME_POKEMON_LIMIT = 10;

export class ListPokemonByTypeUseCase {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  execute(pokemonType: HomePokemonType, signal?: AbortSignal) {
    return this.pokemonRepository.listByType(pokemonType, HOME_POKEMON_LIMIT, signal);
  }
}
