import type { PokemonHistoryRepository } from '../../domain/repositories/pokemon-history.repository';

export class GetPokemonHistoryUseCase {
  constructor(private readonly historyRepository: PokemonHistoryRepository) {}

  execute() {
    return this.historyRepository
      .getHistory()
      .sort((firstEntry, secondEntry) =>
        secondEntry.lastVisitedAt.localeCompare(firstEntry.lastVisitedAt),
      );
  }
}
