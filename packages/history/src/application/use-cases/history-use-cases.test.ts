import { describe, expect, it } from 'vitest';
import {
  dismissVisit,
  getPendingLastVisit,
  readPokemonHistory,
  recordPokemonVisit,
} from '../../index';

function createMemoryStorage(): Storage {
  const storedValues = new Map<string, string>();

  return {
    get length() { return storedValues.size; },
    clear: () => storedValues.clear(),
    getItem: (key) => storedValues.get(key) ?? null,
    key: (index) => [...storedValues.keys()][index] ?? null,
    removeItem: (key) => storedValues.delete(key),
    setItem: (key, value) => storedValues.set(key, value),
  };
}

const pikachu = { id: 25, name: 'pikachu', imageUrl: 'pikachu.png' };

describe('Pokemon history storage', () => {
  it('recovers safely from corrupted stored JSON', () => {
    const storage = createMemoryStorage();
    storage.setItem('pokedex:history', '{invalid');

    expect(readPokemonHistory(storage)).toEqual([]);
  });

  it('creates the first history entry', () => {
    const storage = createMemoryStorage();
    recordPokemonVisit(pikachu, storage, { visitId: 'visit-1', visitedAt: '2026-01-01T10:00:00Z' });

    expect(readPokemonHistory(storage)).toEqual([
      { ...pikachu, visits: 1, lastVisitedAt: '2026-01-01T10:00:00Z' },
    ]);
  });

  it('increments repeat visits without creating duplicates', () => {
    const storage = createMemoryStorage();
    recordPokemonVisit(pikachu, storage, { visitId: 'visit-1', visitedAt: '2026-01-01T10:00:00Z' });
    recordPokemonVisit(pikachu, storage, { visitId: 'visit-2', visitedAt: '2026-01-02T10:00:00Z' });

    expect(readPokemonHistory(storage)).toEqual([
      { ...pikachu, visits: 2, lastVisitedAt: '2026-01-02T10:00:00Z' },
    ]);
  });

  it('sorts entries by their latest visit', () => {
    const storage = createMemoryStorage();
    recordPokemonVisit(pikachu, storage, { visitedAt: '2026-01-01T10:00:00Z' });
    recordPokemonVisit(
      { id: 1, name: 'bulbasaur', imageUrl: 'bulbasaur.png' },
      storage,
      { visitedAt: '2026-01-02T10:00:00Z' },
    );

    expect(readPokemonHistory(storage).map(({ id }) => id)).toEqual([1, 25]);
  });

  it('keeps a dismissed visit hidden and enables a later visit', () => {
    const storage = createMemoryStorage();
    recordPokemonVisit(pikachu, storage, { visitId: 'visit-1' });
    dismissVisit('visit-1', storage);

    expect(getPendingLastVisit(storage)).toBeNull();

    recordPokemonVisit(pikachu, storage, { visitId: 'visit-2' });
    expect(getPendingLastVisit(storage)?.visitId).toBe('visit-2');
  });
});
