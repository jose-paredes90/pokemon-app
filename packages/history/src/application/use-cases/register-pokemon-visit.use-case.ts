import type { LastPokemonVisit } from '../../domain/models/last-pokemon-visit';
import type { PokemonHistoryEntry } from '../../domain/models/pokemon-history-entry';
import type { VisitedPokemon } from '../../domain/models/visited-pokemon';
import type { PokemonHistoryRepository } from '../../domain/repositories/pokemon-history.repository';

interface VisitMetadata {
  visitId?: string;
  visitedAt?: string;
}

export class RegisterPokemonVisitUseCase {
  constructor(private readonly historyRepository: PokemonHistoryRepository) {}

  execute(pokemon: VisitedPokemon, metadata: VisitMetadata = {}): LastPokemonVisit {
    const visitedAt = metadata.visitedAt ?? new Date().toISOString();
    const existingHistory = this.historyRepository.getHistory();
    const existingEntry = existingHistory.find((entry) => entry.id === pokemon.id);
    const updatedEntry: PokemonHistoryEntry = {
      ...pokemon,
      visits: (existingEntry?.visits ?? 0) + 1,
      lastVisitedAt: visitedAt,
    };
    const updatedHistory = [
      updatedEntry,
      ...existingHistory.filter((entry) => entry.id !== pokemon.id),
    ].sort((firstEntry, secondEntry) =>
      secondEntry.lastVisitedAt.localeCompare(firstEntry.lastVisitedAt),
    );
    const lastVisit: LastPokemonVisit = {
      visitId: metadata.visitId ?? createVisitId(),
      pokemonId: pokemon.id,
      name: pokemon.name,
      imageUrl: pokemon.imageUrl,
      visitedAt,
    };

    this.historyRepository.saveHistory(updatedHistory);
    this.historyRepository.saveLastVisit(lastVisit);
    return lastVisit;
  }
}

function createVisitId(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
