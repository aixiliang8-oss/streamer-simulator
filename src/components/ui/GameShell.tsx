import type { PropsWithChildren } from 'react';

import { NightBackdrop } from './NightBackdrop';
import styles from './GameShell.module.css';

export function GameShell({ children }: PropsWithChildren) {
  return (
    <main className={styles.shell}>
      <NightBackdrop />
      <div className={styles.content}>{children}</div>
    </main>
  );
}
