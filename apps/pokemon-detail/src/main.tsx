import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PokemonDetailRemote from './presentation/remote/PokemonDetailRemote';
import './styles/global.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontró el elemento raíz.');
}

createRoot(rootElement).render(
  <StrictMode>
    <PokemonDetailRemote pokemonId={25} onBack={() => window.history.back()} />
  </StrictMode>,
);
