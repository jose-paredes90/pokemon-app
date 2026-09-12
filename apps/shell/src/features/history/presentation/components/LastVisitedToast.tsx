import { historyDependencies } from '@pokedex/history';
import { useState } from 'react';
import styles from './LastVisitedToast.module.css';

export function LastVisitedToast() {
  const [pendingVisit, setPendingVisit] = useState(() =>
    historyDependencies.getPendingLastVisit.execute(),
  );

  if (!pendingVisit) return null;

  const handleClose = () => {
    historyDependencies.dismissLastVisit.execute(pendingVisit.visitId);
    setPendingVisit(null);
  };

  return (
    <aside className={styles.toast} aria-live="polite">
      <img src={pendingVisit.imageUrl} alt="" />
      <div>
        <strong>Último visitado</strong>
        <span>{pendingVisit.name}</span>
      </div>
      <button type="button" onClick={handleClose} aria-label="Cerrar notificación del último visitado">
        Cerrar
      </button>
    </aside>
  );
}
