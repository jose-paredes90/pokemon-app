import type { PokemonSummary } from '../../domain/models/pokemon-summary';
import styles from './PokemonCard.module.css';

interface PokemonCardProps {
  pokemon: PokemonSummary;
  onSelect: (pokemonId: number) => void;
}

export function PokemonCard({ pokemon, onSelect }: PokemonCardProps) {
  return (
    <button type="button" className={styles.card} onClick={() => onSelect(pokemon.id)}>
      <img className={styles.image} src={pokemon.imageUrl} alt="" loading="lazy" />
      <span className={styles.name}>{pokemon.name}</span>
    </button>
  );
}
