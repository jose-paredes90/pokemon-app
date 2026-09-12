import { Component, type ErrorInfo, type PropsWithChildren } from 'react';
import styles from './RemoteErrorBoundary.module.css';

interface RemoteErrorBoundaryState {
  hasError: boolean;
}

export class RemoteErrorBoundary extends Component<
  PropsWithChildren,
  RemoteErrorBoundaryState
> {
  state: RemoteErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): RemoteErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('A remote could not be rendered.', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className={styles.page}>
          <section className={styles.status} role="alert">
            <h1>Esta sección no está disponible</h1>
            <p>No se pudo cargar el microfrontend. Verifica que esté iniciado e inténtalo de nuevo.</p>
            <button type="button" onClick={() => window.location.reload()}>
              Recargar
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
