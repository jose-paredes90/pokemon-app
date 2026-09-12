import type { PokemonDetail } from '../../domain/models/pokemon-detail';
import type { PokemonDetailContract } from '../api/contracts/pokemon-detail.contract';

const FALLBACK_ARTWORK_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

export function mapPokemonDetail(contract: PokemonDetailContract): PokemonDetail {
  return {
    id: contract.id,
    name: contract.name,
    imageUrl:
      contract.sprites.other?.['official-artwork']?.front_default ??
      `${FALLBACK_ARTWORK_BASE_URL}/${contract.id}.png`,
    types: contract.types.map(({ type }) => ({ name: type.name })),
    stats: contract.stats.map(({ base_stat: value, stat }) => ({ name: stat.name, value })),
    heightInDecimeters: contract.height,
    weightInHectograms: contract.weight,
    abilities: contract.abilities.map(({ ability }) => ability.name),
  };
}
