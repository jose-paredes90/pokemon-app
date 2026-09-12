import type { PokemonDetail } from '../../domain/models/pokemon-detail';
import type { PokemonRepository } from '../../domain/repositories/pokemon.repository';
import type { PokemonDetailContract } from '../api/contracts/pokemon-detail.contract';
import type { PokeApiClient } from '../api/poke-api-client';
import { mapPokemonDetail } from '../mappers/pokemon-detail.mapper';

export class PokeApiPokemonRepository implements PokemonRepository {
  constructor(private readonly pokeApiClient: PokeApiClient) {}

  async getDetail(pokemonId: number, signal?: AbortSignal): Promise<PokemonDetail> {
    const contract = await this.pokeApiClient.get<PokemonDetailContract>(
      `/pokemon/${pokemonId}`,
      signal,
    );
    return mapPokemonDetail(contract);
  }
}
