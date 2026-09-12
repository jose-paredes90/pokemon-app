import { describe, expect, it, vi } from 'vitest';
import type { PokemonRepository } from '../../../pokemon/domain/repositories/pokemon.repository';
import { GetPokemonPageUseCase } from './get-pokemon-page.use-case';

function createPokemonRepository() {
  const getPage = vi.fn<PokemonRepository['getPage']>().mockResolvedValue({
    pokemon: [],
    nextOffset: null,
  });
  const pokemonRepository: PokemonRepository = {
    listByType: vi.fn().mockResolvedValue([]),
    getPage,
    searchByExactName: vi.fn().mockResolvedValue(null),
  };

  return { pokemonRepository, getPage };
}

describe('GetPokemonPageUseCase', () => {
  it('requests Search pages containing thirty Pokemon', async () => {
    const { pokemonRepository, getPage } = createPokemonRepository();
    const getPokemonPage = new GetPokemonPageUseCase(pokemonRepository);

    await getPokemonPage.execute(60);

    expect(getPage).toHaveBeenCalledWith(60, 30, undefined);
  });
});
