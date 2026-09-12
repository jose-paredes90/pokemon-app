import type { PokemonHistoryRepository } from '../../domain/repositories/pokemon-history.repository';

export class GetPendingLastVisitUseCase {
  constructor(private readonly historyRepository: PokemonHistoryRepository) {}

  execute() {
    const lastVisit = this.historyRepository.getLastVisit();
    if (!lastVisit || this.historyRepository.getDismissedVisitId() === lastVisit.visitId) {
      return null;
    }
    return lastVisit;
  }
}
