import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import type { LoginLocationState } from './login-location-state';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUsername = useAuthStore((state) => state.username);
  const signIn = useAuthStore((state) => state.signIn);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  if (currentUsername) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername || !password) {
      setValidationMessage('Ingresa tu usuario y contraseña.');
      return;
    }

    signIn(trimmedUsername);

    const locationState = location.state as LoginLocationState | null;
    void navigate(locationState?.from ?? '/', { replace: true });
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Reto frontend</p>
        <h1>POKEDEX</h1>
        <p className={styles.description}>
          Inicia sesión para explorar Pokemon por tipo, buscar en el catálogo y conservar un
          historial local de visitas.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label>
            Usuario
            <input
              name="username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>

          <label>
            Contraseña
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          {validationMessage ? <p className={styles.error}>{validationMessage}</p> : null}

          <button type="submit">Iniciar sesión</button>
        </form>
      </section>
    </main>
  );
}
