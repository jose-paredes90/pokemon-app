import { AppProviders } from './providers/AppProviders';
import { AppRouter } from './router/AppRouter';
import { useAuthStore } from '../features/auth/presentation/store/useAuthStore';
import { LastVisitedToast } from '../features/history/presentation/components/LastVisitedToast';

export function App() {
  const username = useAuthStore((state) => state.username);

  return (
    <AppProviders>
      <AppRouter />
      {username && <LastVisitedToast />}
    </AppProviders>
  );
}
