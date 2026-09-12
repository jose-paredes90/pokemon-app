import { lazy, Suspense } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { RemoteErrorBoundary } from '../../../../app/components/RemoteErrorBoundary';

const PokemonDetailRemote = lazy(() => import('pokemonDetail/PokemonDetail'));

export function PokemonDetailPage() {
  const navigate = useNavigate();
  const { pokemonId } = useParams();
  const parsedPokemonId = Number(pokemonId);

  if (!Number.isInteger(parsedPokemonId) || parsedPokemonId <= 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <RemoteErrorBoundary>
      <Suspense fallback={<p>Cargando detalle del Pokemon...</p>}>
        <PokemonDetailRemote pokemonId={parsedPokemonId} onBack={() => navigate(-1)} />
      </Suspense>
    </RemoteErrorBoundary>
  );
}
