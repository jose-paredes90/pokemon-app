import { usePokemonHistory } from '../hooks/usePokemonHistory';
import styles from './PokemonHistoryPage.module.css';
import type { PokemonHistoryPageProps } from './pokemon-history-page.props';

export function PokemonHistoryPage({ onPokemonSelected, onBack }: PokemonHistoryPageProps) {
  const { historyEntries, clearHistory } = usePokemonHistory();

  const handleClearHistory = () => {
    if (!window.confirm('¿Quieres borrar todo el historial de Pokemon visitados?')) return;

    clearHistory();
  };

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Tu recorrido</p>
            <h1>Historial de visitas</h1>
          </div>
          <div className={styles.actions}>
            {historyEntries.length > 0 && (
              <button type="button" onClick={handleClearHistory}>
                Borrar historial
              </button>
            )}
            <button type="button" onClick={onBack}>
              Volver al inicio
            </button>
          </div>
        </div>

        {historyEntries.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>Aún no hay visitas</h2>
            <p>Abre el detalle de un Pokemon y aparecerá aquí.</p>
            <button type="button" onClick={onBack}>
              Explorar Pokemon
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {historyEntries.map((entry) => (
              <button
                type="button"
                className={styles.historyCard}
                key={entry.id}
                onClick={() => onPokemonSelected(entry.id)}
              >
                <img src={entry.imageUrl} alt="" />
                <span className={styles.name}>{entry.name}</span>
                <span className={styles.visits}>
                  {entry.visits} {entry.visits === 1 ? 'visita' : 'visitas'}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
