import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireSession } from '../../features/auth/presentation/components/RequireSession';
import { LoginPage } from '../../features/auth/presentation/pages/LoginPage';
import { HistoryPage } from '../../features/history/presentation/pages/HistoryPage';
import { HomePage } from '../../features/home/presentation/pages/HomePage';
import { PokemonDetailPage } from '../../features/pokemon-detail/presentation/pages/PokemonDetailPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RequireSession />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:pokemonId" element={<PokemonDetailPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
