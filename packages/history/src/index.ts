import { ClearPokemonHistoryUseCase } from './application/use-cases/clear-pokemon-history.use-case';
import { DismissLastVisitUseCase } from './application/use-cases/dismiss-last-visit.use-case';
import { GetPendingLastVisitUseCase } from './application/use-cases/get-pending-last-visit.use-case';
import { GetPokemonHistoryUseCase } from './application/use-cases/get-pokemon-history.use-case';
import { RegisterPokemonVisitUseCase } from './application/use-cases/register-pokemon-visit.use-case';
import type { VisitedPokemon } from './domain/models/visited-pokemon';
import { LocalStoragePokemonHistoryRepository } from './infrastructure/local-storage/local-storage-pokemon-history.repository';

const historyRepository = new LocalStoragePokemonHistoryRepository();

export const historyDependencies = {
  registerPokemonVisit: new RegisterPokemonVisitUseCase(historyRepository),
  getPokemonHistory: new GetPokemonHistoryUseCase(historyRepository),
  getPendingLastVisit: new GetPendingLastVisitUseCase(historyRepository),
  dismissLastVisit: new DismissLastVisitUseCase(historyRepository),
  clearPokemonHistory: new ClearPokemonHistoryUseCase(historyRepository),
};

export type { LastPokemonVisit } from './domain/models/last-pokemon-visit';
export type { PokemonHistoryEntry } from './domain/models/pokemon-history-entry';
export type { VisitedPokemon } from './domain/models/visited-pokemon';
export type { PokemonHistoryRepository } from './domain/repositories/pokemon-history.repository';

export function readPokemonHistory(storage: Storage = window.localStorage) {
  return new GetPokemonHistoryUseCase(new LocalStoragePokemonHistoryRepository(storage)).execute();
}

export function recordPokemonVisit(
  pokemon: VisitedPokemon,
  storage: Storage = window.localStorage,
  metadata: { visitId?: string; visitedAt?: string } = {},
) {
  return new RegisterPokemonVisitUseCase(
    new LocalStoragePokemonHistoryRepository(storage),
  ).execute(pokemon, metadata);
}

export function getPendingLastVisit(storage: Storage = window.localStorage) {
  return new GetPendingLastVisitUseCase(
    new LocalStoragePokemonHistoryRepository(storage),
  ).execute();
}

export function dismissVisit(visitId: string, storage: Storage = window.localStorage): void {
  new DismissLastVisitUseCase(new LocalStoragePokemonHistoryRepository(storage)).execute(visitId);
}

export function clearPokemonHistory(storage: Storage = window.localStorage): void {
  new ClearPokemonHistoryUseCase(new LocalStoragePokemonHistoryRepository(storage)).execute();
}
