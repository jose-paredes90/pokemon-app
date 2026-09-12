import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PokemonHistoryRemote from './presentation/remote/PokemonHistoryRemote';
import './styles/global.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontró el elemento raíz.');
}

createRoot(rootElement).render(
  <StrictMode>
    <PokemonHistoryRemote
      onPokemonSelected={(pokemonId) => window.alert(`Pokemon seleccionado: #${pokemonId}`)}
      onBack={() => window.history.back()}
    />
  </StrictMode>,
);
