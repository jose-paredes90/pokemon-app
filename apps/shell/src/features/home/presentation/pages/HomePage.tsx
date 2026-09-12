import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../../../../app/components/AppHeader';
import type { HomePokemonType } from '../../application/models/home-pokemon-type';
import { PokemonCategory } from '../components/PokemonCategory';
import styles from './HomePage.module.css';

const INITIAL_CATEGORIES = ['fire', 'water', 'grass'] satisfies HomePokemonType[];

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.content}>
        <p className={styles.eyebrow}>Explora por tipo</p>
        <h1>Descubre Pokemon</h1>
        <p className={styles.description}>
          Comienza con tres tipos clásicos o usa el buscador para encontrar un Pokemon exacto.
        </p>

        <div className={styles.categories}>
          {INITIAL_CATEGORIES.map((category) => (
            <PokemonCategory
              key={category}
              name={category}
              onSelectPokemon={(pokemonId) => navigate(`/pokemon/${pokemonId}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
