import type { PokemonSummary } from '../../domain/models/pokemon-summary';
import type {
  NamedResourceContract,
  PokemonContract,
} from '../api/contracts/pokemon.contracts';

const POKEMON_ARTWORK_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

export function extractPokemonId(resourceUrl: string): number {
  const pathSegments = new URL(resourceUrl).pathname.split('/').filter(Boolean);
  const pokemonId = Number(pathSegments.at(-1));

  if (!Number.isInteger(pokemonId) || pokemonId <= 0) {
    throw new Error(`Invalid Pokemon resource URL: ${resourceUrl}`);
  }

  return pokemonId;
}

export function buildPokemonImageUrl(pokemonId: number): string {
  return `${POKEMON_ARTWORK_BASE_URL}/${pokemonId}.png`;
}

export function mapNamedResourceToPokemonSummary(
  resource: NamedResourceContract,
): PokemonSummary {
  const pokemonId = extractPokemonId(resource.url);

  return { id: pokemonId, name: resource.name, imageUrl: buildPokemonImageUrl(pokemonId) };
}

export function mapPokemonContractToPokemonSummary(
  pokemonContract: PokemonContract,
): PokemonSummary {
  return {
    id: pokemonContract.id,
    name: pokemonContract.name,
    imageUrl: buildPokemonImageUrl(pokemonContract.id),
  };
}
