import { describe, expect, it } from 'vitest';
import { extractPokemonId } from './pokemon-summary.mapper';

describe('extractPokemonId', () => {
  it('extracts the numeric identifier from a PokeAPI resource URL', () => {
    expect(extractPokemonId('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25);
  });

  it('rejects resource URLs without a valid positive identifier', () => {
    expect(() => extractPokemonId('https://pokeapi.co/api/v2/pokemon/pikachu/')).toThrow(
      'Invalid Pokemon resource URL',
    );
  });
});
