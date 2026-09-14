import type { VisibleStats } from '../../game/model/types';
import styles from './StatGrid.module.css';

interface StatItem {
  key: keyof VisibleStats;
  label: string;
  icon: string;
  danger?: boolean;
}

const STAT_ITEMS: readonly StatItem[] = [
  { key: 'popularity', label: '人气', icon: '🔥' },
  { key: 'fans', label: '粉丝', icon: '💗' },
  { key: 'reputation', label: '口碑', icon: '⭐' },
  { key: 'money', label: '财富', icon: '💰' },
  { key: 'mentality', label: '精神', icon: '🌙' },
  { key: 'violation', label: '违规', icon: '⚠️', danger: true },
];

// Bars are visually capped at 100 so a stat that has grown past it (fans and
// popularity both can) still reads as "full" instead of overflowing the
// track — the exact number is always shown next to the bar regardless.
const BAR_MAX = 100;

interface StatGridProps {
  stats: VisibleStats;
  variant?: 'hud' | 'summary';
}

export function StatGrid({ stats, variant = 'summary' }: StatGridProps) {
  if (variant === 'hud') {
    return (
      <div className={styles.hud}>
        {STAT_ITEMS.map((item) => {
          const value = stats[item.key];
          const isDanger = Boolean(item.danger) && value > 0;
          const percent = Math.max(
            0,
            Math.min(100, (value / BAR_MAX) * 100),
          );

          return (
            <div className={styles.barRow} key={item.key}>
              <span aria-hidden="true" className={styles.barIcon}>
                {item.icon}
              </span>
              <span className={styles.barLabel}>{item.label}</span>
              <span className={styles.barTrack}>
                <span
                  className={`${styles.barFill} ${
                    isDanger ? styles.barFillDanger : ''
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </span>
              <span
                className={`${styles.barValue} ${
                  isDanger ? styles.danger : ''
                }`}
              >
                {value}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <dl className={styles.summaryGrid}>
      {STAT_ITEMS.map((item) => (
        <div className={styles.summaryItem} key={item.key}>
          <dt>{item.label}</dt>
          <dd
            className={
              item.danger && stats[item.key] > 0 ? styles.danger : undefined
            }
          >
            {stats[item.key]}
          </dd>
        </div>
      ))}
    </dl>
  );
}
