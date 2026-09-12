import { historyDependencies } from '@pokedex/history';
import { useState } from 'react';

export function usePokemonHistory() {
  const [historyEntries, setHistoryEntries] = useState(() =>
    historyDependencies.getPokemonHistory.execute(),
  );

  const clearHistory = () => {
    historyDependencies.clearPokemonHistory.execute();
    setHistoryEntries([]);
  };

  return { historyEntries, clearHistory };
}
