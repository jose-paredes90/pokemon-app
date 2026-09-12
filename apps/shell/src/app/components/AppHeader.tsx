import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/presentation/store/useAuthStore';
import { SearchModal } from '../../features/search/presentation/components/SearchModal';
import { useThemeStore } from '../../features/theme/presentation/store/useThemeStore';
import styles from './AppHeader.module.css';

export function AppHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const username = useAuthStore((state) => state.username);
  const signOut = useAuthStore((state) => state.signOut);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const handleSignOut = () => {
    signOut();
    void navigate('/login', { replace: true });
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        POKEDEX
      </Link>

      <nav className={styles.actions} aria-label="Navegación principal">
        <button type="button" onClick={() => setIsSearchOpen(true)} className={styles.primaryButton}>
          Buscar Pokemon
        </button>
        <Link to="/history">Ver historial</Link>
        <button type="button" onClick={toggleTheme} className={styles.secondaryButton}>
          {theme === 'light' ? 'Tema oscuro' : 'Tema claro'}
        </button>
        <details className={styles.userMenu}>
          <summary>{username}</summary>
          <div className={styles.userMenuPanel}>
            <button type="button" onClick={handleSignOut}>Cerrar sesión</button>
          </div>
        </details>
      </nav>
      {isSearchOpen && <SearchModal onClose={closeSearch} />}
    </header>
  );
}
