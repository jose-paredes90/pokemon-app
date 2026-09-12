import type { PokemonPage } from '../../domain/models/pokemon-page';
import type { PokemonSummary } from '../../domain/models/pokemon-summary';
import type { PokemonRepository } from '../../domain/repositories/pokemon.repository';
import type {
  PokemonContract,
  PokemonListContract,
  PokemonTypeContract,
} from '../api/contracts/pokemon.contracts';
import type { PokeApiClient } from '../api/poke-api-client';
import {
  mapPokemonContractToPokemonSummary,
  mapNamedResourceToPokemonSummary,
} from '../mappers/pokemon-summary.mapper';

export class PokeApiPokemonRepository implements PokemonRepository {
  constructor(private readonly pokeApiClient: PokeApiClient) {}

  async listByType(
    pokemonType: string,
    limit: number,
    signal?: AbortSignal,
  ): Promise<PokemonSummary[]> {
    const typeContract = await this.pokeApiClient.get<PokemonTypeContract>(
      `/type/${pokemonType}`,
      signal,
    );
    return typeContract.pokemon
      .slice(0, limit)
      .map(({ pokemon }) => mapNamedResourceToPokemonSummary(pokemon));
  }

  async getPage(offset: number, limit: number, signal?: AbortSignal): Promise<PokemonPage> {
    const listContract = await this.pokeApiClient.get<PokemonListContract>(
      `/pokemon?limit=${limit}&offset=${offset}`,
      signal,
    );
    const nextOffset = offset + limit;

    return {
      pokemon: listContract.results.map(mapNamedResourceToPokemonSummary),
      nextOffset: listContract.next && nextOffset < listContract.count ? nextOffset : null,
    };
  }

  async searchByExactName(
    pokemonName: string,
    signal?: AbortSignal,
  ): Promise<PokemonSummary | null> {
    const pokemonContract = await this.pokeApiClient.getOptional<PokemonContract>(
      `/pokemon/${encodeURIComponent(pokemonName)}`,
      signal,
    );
    if (!pokemonContract) return null;

    return mapPokemonContractToPokemonSummary(pokemonContract);
  }
}
