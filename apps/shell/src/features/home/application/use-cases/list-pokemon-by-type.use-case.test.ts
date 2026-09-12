import { describe, expect, it, vi } from 'vitest';
import type { PokemonRepository } from '../../../pokemon/domain/repositories/pokemon.repository';
import { ListPokemonByTypeUseCase } from './list-pokemon-by-type.use-case';

function createPokemonRepository() {
  const listByType = vi.fn<PokemonRepository['listByType']>().mockResolvedValue([]);
  const pokemonRepository: PokemonRepository = {
    listByType,
    getPage: vi.fn().mockResolvedValue({ pokemon: [], nextOffset: null }),
    searchByExactName: vi.fn().mockResolvedValue(null),
  };

  return { pokemonRepository, listByType };
}

describe('ListPokemonByTypeUseCase', () => {
  it('requests the ten Pokemon required by a Home category', async () => {
    const { pokemonRepository, listByType } = createPokemonRepository();
    const listPokemonByType = new ListPokemonByTypeUseCase(pokemonRepository);

    await listPokemonByType.execute('fire');

    expect(listByType).toHaveBeenCalledWith('fire', 10, undefined);
  });
});
