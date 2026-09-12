import { PokemonCard } from '../../../pokemon/presentation/components/PokemonCard';
import type { HomePokemonType } from '../../application/models/home-pokemon-type';
import { usePokemonByType } from '../hooks/usePokemonByType';
import styles from './PokemonCategory.module.css';

const CATEGORY_SKELETON_COUNT = 10;
const CATEGORY_LABELS: Record<HomePokemonType, string> = {
  fire: 'Fuego',
  water: 'Agua',
  grass: 'Planta',
};

interface PokemonCategoryProps {
  name: HomePokemonType;
  onSelectPokemon: (pokemonId: number) => void;
}

export function PokemonCategory({ name, onSelectPokemon }: PokemonCategoryProps) {
  const categoryQuery = usePokemonByType(name);
  const categoryLabel = CATEGORY_LABELS[name];

  return (
    <section className={styles.section} aria-labelledby={`${name}-category`}>
      <h2 id={`${name}-category`} className={styles.heading}>
        {categoryLabel}{' '}
        <span className={styles.count}>
          {categoryQuery.data?.length ?? CATEGORY_SKELETON_COUNT} Pokemon
        </span>
      </h2>

      {categoryQuery.isPending && (
        <div className={styles.grid} aria-label={`Cargando Pokemon de tipo ${categoryLabel}`}>
          {Array.from({ length: CATEGORY_SKELETON_COUNT }, (_, index) => (
            <div className={styles.skeleton} key={index} aria-hidden="true" />
          ))}
        </div>
      )}

      {categoryQuery.isError && (
        <div className={styles.status} role="alert">
          No se pudo cargar esta categoría.
          <button className={styles.retryButton} type="button" onClick={() => categoryQuery.refetch()}>
            Reintentar
          </button>
        </div>
      )}

      {categoryQuery.isSuccess && categoryQuery.data.length === 0 && (
        <p className={styles.status}>No hay Pokemon en esta categoría.</p>
      )}

      {categoryQuery.isSuccess && categoryQuery.data.length > 0 && (
        <div className={styles.grid}>
          {categoryQuery.data.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} onSelect={onSelectPokemon} />
          ))}
        </div>
      )}
    </section>
  );
}
