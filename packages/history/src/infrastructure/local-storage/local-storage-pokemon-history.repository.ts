import type { LastPokemonVisit } from '../../domain/models/last-pokemon-visit';
import type { PokemonHistoryEntry } from '../../domain/models/pokemon-history-entry';
import type { PokemonHistoryRepository } from '../../domain/repositories/pokemon-history.repository';

const HISTORY_STORAGE_KEY = 'pokedex:history';
const LAST_VISIT_STORAGE_KEY = 'pokedex:last-visit';
const DISMISSED_VISIT_STORAGE_KEY = 'pokedex:dismissed-visit-id';

export class LocalStoragePokemonHistoryRepository implements PokemonHistoryRepository {
  constructor(private readonly providedStorage?: Storage) {}

  private get storage(): Storage {
    return this.providedStorage ?? window.localStorage;
  }

  getHistory(): PokemonHistoryEntry[] {
    const storedHistory = parseJson(this.storage.getItem(HISTORY_STORAGE_KEY));
    return Array.isArray(storedHistory) ? storedHistory.filter(isHistoryEntry) : [];
  }

  saveHistory(history: PokemonHistoryEntry[]): void {
    this.storage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  }

  getLastVisit(): LastPokemonVisit | null {
    const storedVisit = parseJson(this.storage.getItem(LAST_VISIT_STORAGE_KEY));
    return isLastVisit(storedVisit) ? storedVisit : null;
  }

  saveLastVisit(visit: LastPokemonVisit): void {
    this.storage.setItem(LAST_VISIT_STORAGE_KEY, JSON.stringify(visit));
  }

  getDismissedVisitId(): string | null {
    return this.storage.getItem(DISMISSED_VISIT_STORAGE_KEY);
  }

  saveDismissedVisitId(visitId: string): void {
    this.storage.setItem(DISMISSED_VISIT_STORAGE_KEY, visitId);
  }

  clear(): void {
    this.storage.removeItem(HISTORY_STORAGE_KEY);
    this.storage.removeItem(LAST_VISIT_STORAGE_KEY);
    this.storage.removeItem(DISMISSED_VISIT_STORAGE_KEY);
  }
}

function isHistoryEntry(candidate: unknown): candidate is PokemonHistoryEntry {
  if (!candidate || typeof candidate !== 'object') return false;
  const entry = candidate as Record<string, unknown>;

  return (
    typeof entry.id === 'number' &&
    typeof entry.name === 'string' &&
    typeof entry.imageUrl === 'string' &&
    typeof entry.visits === 'number' &&
    entry.visits > 0 &&
    typeof entry.lastVisitedAt === 'string'
  );
}

function isLastVisit(candidate: unknown): candidate is LastPokemonVisit {
  if (!candidate || typeof candidate !== 'object') return false;
  const visit = candidate as Record<string, unknown>;

  return (
    typeof visit.visitId === 'string' &&
    typeof visit.pokemonId === 'number' &&
    typeof visit.name === 'string' &&
    typeof visit.imageUrl === 'string' &&
    typeof visit.visitedAt === 'string'
  );
}

function parseJson(rawValue: string | null): unknown {
  if (!rawValue) return null;

  try {
    return JSON.parse(rawValue) as unknown;
  } catch {
    return null;
  }
}
