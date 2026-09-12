import type { PokemonHistoryRepository } from '../../domain/repositories/pokemon-history.repository';

export class ClearPokemonHistoryUseCase {
  constructor(private readonly historyRepository: PokemonHistoryRepository) {}

  execute(): void {
    this.historyRepository.clear();
  }
}
