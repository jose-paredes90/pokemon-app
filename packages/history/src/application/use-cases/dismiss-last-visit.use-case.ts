import type { PokemonHistoryRepository } from '../../domain/repositories/pokemon-history.repository';

export class DismissLastVisitUseCase {
  constructor(private readonly historyRepository: PokemonHistoryRepository) {}

  execute(visitId: string): void {
    this.historyRepository.saveDismissedVisitId(visitId);
  }
}
