import type { PokemonRepository } from '../../domain/repositories/pokemon.repository';

export class GetPokemonDetailUseCase {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  execute(pokemonId: number, signal?: AbortSignal) {
    return this.pokemonRepository.getDetail(pokemonId, signal);
  }
}
