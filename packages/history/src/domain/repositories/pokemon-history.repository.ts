import type { LastPokemonVisit } from '../models/last-pokemon-visit';
import type { PokemonHistoryEntry } from '../models/pokemon-history-entry';

export interface PokemonHistoryRepository {
  getHistory(): PokemonHistoryEntry[];
  saveHistory(history: PokemonHistoryEntry[]): void;
  getLastVisit(): LastPokemonVisit | null;
  saveLastVisit(visit: LastPokemonVisit): void;
  getDismissedVisitId(): string | null;
  saveDismissedVisitId(visitId: string): void;
  clear(): void;
}
