import { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { RemoteErrorBoundary } from '../../../../app/components/RemoteErrorBoundary';

const PokemonHistoryRemote = lazy(() => import('pokemonHistory/PokemonHistory'));

export function HistoryPage() {
  const navigate = useNavigate();

  return (
    <RemoteErrorBoundary>
      <Suspense fallback={<p>Cargando historial...</p>}>
        <PokemonHistoryRemote
          onPokemonSelected={(pokemonId) => navigate(`/pokemon/${pokemonId}`)}
          onBack={() => navigate('/')}
        />
      </Suspense>
    </RemoteErrorBoundary>
  );
}
