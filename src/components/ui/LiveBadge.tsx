import styles from './LiveBadge.module.css';

interface LiveBadgeProps {
  label?: string;
  size?: 'sm' | 'lg';
}

export function LiveBadge({ label = 'LIVE', size = 'sm' }: LiveBadgeProps) {
  return (
    <span className={`${styles.badge} ${size === 'lg' ? styles.lg : ''}`}>
      <span aria-hidden="true" className={styles.dot} />
      {label}
    </span>
  );
}
