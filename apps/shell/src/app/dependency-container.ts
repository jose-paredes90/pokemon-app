import { ListPokemonByTypeUseCase } from '../features/home/application/use-cases/list-pokemon-by-type.use-case';
import { PokeApiClient } from '../features/pokemon/infrastructure/api/poke-api-client';
import { PokeApiPokemonRepository } from '../features/pokemon/infrastructure/repositories/poke-api-pokemon.repository';
import { GetPokemonPageUseCase } from '../features/search/application/use-cases/get-pokemon-page.use-case';
import { SearchPokemonByNameUseCase } from '../features/search/application/use-cases/search-pokemon-by-name.use-case';

const pokeApiClient = new PokeApiClient();
const pokemonRepository = new PokeApiPokemonRepository(pokeApiClient);

export const pokemonDependencies = {
  listPokemonByType: new ListPokemonByTypeUseCase(pokemonRepository),
  getPokemonPage: new GetPokemonPageUseCase(pokemonRepository),
  searchPokemonByName: new SearchPokemonByNameUseCase(pokemonRepository),
};
