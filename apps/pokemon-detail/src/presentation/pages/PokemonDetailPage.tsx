import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { usePokemonVisitRegistration } from '../hooks/usePokemonVisitRegistration';
import styles from './PokemonDetailPage.module.css';
import type { PokemonDetailPageProps } from './pokemon-detail-page.props';

const TYPE_LABELS: Record<string, string> = {
  normal: 'Normal',
  fire: 'Fuego',
  water: 'Agua',
  electric: 'Eléctrico',
  grass: 'Planta',
  ice: 'Hielo',
  fighting: 'Lucha',
  poison: 'Veneno',
  ground: 'Tierra',
  flying: 'Volador',
  psychic: 'Psíquico',
  bug: 'Bicho',
  rock: 'Roca',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
  fairy: 'Hada',
};

const STAT_LABELS: Record<string, string> = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Ataque especial',
  'special-defense': 'Defensa especial',
  speed: 'Velocidad',
};

export function PokemonDetailPage({ pokemonId, onBack }: PokemonDetailPageProps) {
  const detailQuery = usePokemonDetail(pokemonId);
  usePokemonVisitRegistration(detailQuery.data);

  if (detailQuery.isPending) {
    return <DetailSkeleton onBack={onBack} />;
  }

  if (detailQuery.isError) {
    return (
      <main className={styles.page}>
        <section className={styles.status} role="alert">
          <h1>No se pudo cargar este Pokemon</h1>
          <p>Comprueba tu conexión e inténtalo de nuevo.</p>
          <div className={styles.actions}>
            <button type="button" onClick={() => detailQuery.refetch()}>
              Reintentar
            </button>
            <button type="button" onClick={onBack}>
              Volver
            </button>
          </div>
        </section>
      </main>
    );
  }

  const pokemon = detailQuery.data;

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <button type="button" onClick={onBack} className={styles.backButton}>
          ← Volver
        </button>

        <div className={styles.hero}>
          <div className={styles.artworkPanel}>
            <img className={styles.artwork} src={pokemon.imageUrl} alt={pokemon.name} />
          </div>

          <div className={styles.summary}>
            <p className={styles.eyebrow}>Pokemon #{pokemon.id}</p>
            <h1>{pokemon.name}</h1>

            <div className={styles.types}>
              {pokemon.types.map((type) => (
                <span key={type.name}>{TYPE_LABELS[type.name] ?? type.name}</span>
              ))}
            </div>

            <dl className={styles.facts}>
              <div>
                <dt>Altura</dt>
                <dd>{(pokemon.heightInDecimeters / 10).toFixed(1)} m</dd>
              </div>
              <div>
                <dt>Peso</dt>
                <dd>{(pokemon.weightInHectograms / 10).toFixed(1)} kg</dd>
              </div>
              <div>
                <dt>Habilidades</dt>
                <dd>{pokemon.abilities.map(formatApiName).join(', ')}</dd>
              </div>
            </dl>
          </div>
        </div>

        <section className={styles.stats} aria-labelledby="stats-title">
          <h2 id="stats-title">Estadísticas base</h2>
          <div className={styles.statList}>
            {pokemon.stats.map((stat) => (
              <div className={styles.stat} key={stat.name}>
                <span className={styles.statName}>{STAT_LABELS[stat.name] ?? stat.name}</span>
                <div className={styles.statTrack}>
                  <span style={{ width: `${Math.min(100, (stat.value / 180) * 100)}%` }} />
                </div>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function DetailSkeleton({ onBack }: Pick<PokemonDetailPageProps, 'onBack'>) {
  return (
    <main className={styles.page} aria-label="Cargando detalle del Pokemon">
      <section className={styles.card}>
        <button type="button" onClick={onBack} className={styles.backButton}>
          ← Volver
        </button>
        <div className={styles.hero}>
          <div className={styles.artworkSkeleton} />
          <div className={styles.summarySkeleton}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>
    </main>
  );
}

function formatApiName(name: string): string {
  return name.replaceAll('-', ' ');
}
