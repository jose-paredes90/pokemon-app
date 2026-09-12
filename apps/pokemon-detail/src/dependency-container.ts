import { GetPokemonDetailUseCase } from './application/use-cases/get-pokemon-detail.use-case';
import { PokeApiClient } from './infrastructure/api/poke-api-client';
import { PokeApiPokemonRepository } from './infrastructure/repositories/poke-api-pokemon.repository';

const pokeApiClient = new PokeApiClient();
const pokemonRepository = new PokeApiPokemonRepository(pokeApiClient);

export const pokemonDetailDependencies = {
  getPokemonDetail: new GetPokemonDetailUseCase(pokemonRepository),
};
