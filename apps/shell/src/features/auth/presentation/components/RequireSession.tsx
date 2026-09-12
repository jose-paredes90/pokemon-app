import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export function RequireSession() {
  const location = useLocation();
  const username = useAuthStore((state) => state.username);

  if (!username) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
