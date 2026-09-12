import { describe, expect, it, vi } from 'vitest';
import type { PokemonSummary } from '../../../pokemon/domain/models/pokemon-summary';
import type { PokemonRepository } from '../../../pokemon/domain/repositories/pokemon.repository';
import { SearchPokemonByNameUseCase } from './search-pokemon-by-name.use-case';

function createPokemonRepository() {
  const searchByExactName = vi
    .fn<PokemonRepository['searchByExactName']>()
    .mockResolvedValue(null);
  const pokemonRepository: PokemonRepository = {
    listByType: vi.fn().mockResolvedValue([]),
    getPage: vi.fn().mockResolvedValue({ pokemon: [], nextOffset: null }),
    searchByExactName,
  };

  return { pokemonRepository, searchByExactName };
}

describe('SearchPokemonByNameUseCase', () => {
  it.each([
    [' Pikachu ', 'pikachu'],
    ['porygon-z', 'porygon-z'],
  ])('searches %j using the valid exact name %j', async (input, normalizedName) => {
    const { pokemonRepository, searchByExactName } = createPokemonRepository();
    const searchPokemonByName = new SearchPokemonByNameUseCase(pokemonRepository);

    await searchPokemonByName.execute(input);

    expect(searchByExactName).toHaveBeenCalledWith(normalizedName, undefined);
  });

  it.each(['mr mime', 'pikachú'])(
    'returns invalid for %j without calling the repository',
    async (input) => {
      const { pokemonRepository, searchByExactName } = createPokemonRepository();
      const searchPokemonByName = new SearchPokemonByNameUseCase(pokemonRepository);

      await expect(searchPokemonByName.execute(input)).resolves.toEqual({ status: 'invalid' });
      expect(searchByExactName).not.toHaveBeenCalled();
    },
  );

  it('returns not-found when the repository has no exact match', async () => {
    const { pokemonRepository } = createPokemonRepository();
    const searchPokemonByName = new SearchPokemonByNameUseCase(pokemonRepository);

    await expect(searchPokemonByName.execute('missingno')).resolves.toEqual({
      status: 'not-found',
      searchName: 'missingno',
    });
  });

  it('returns found with the Pokemon returned by the repository', async () => {
    const pokemon: PokemonSummary = {
      id: 25,
      name: 'pikachu',
      imageUrl: 'https://example.com/pikachu.png',
    };
    const { pokemonRepository, searchByExactName } = createPokemonRepository();
    searchByExactName.mockResolvedValue(pokemon);
    const searchPokemonByName = new SearchPokemonByNameUseCase(pokemonRepository);

    await expect(searchPokemonByName.execute('pikachu')).resolves.toEqual({
      status: 'found',
      pokemon,
      searchName: 'pikachu',
    });
  });
});
