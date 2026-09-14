import styles from './NightBackdrop.module.css';

const BUILDING_COUNT = 7;

export function NightBackdrop() {
  return (
    <div aria-hidden="true" className={styles.backdrop}>
      <div className={styles.sky} />
      <div className={styles.moon} />
      <div className={styles.skyline}>
        {Array.from({ length: BUILDING_COUNT }, (_, index) => (
          <span className={styles.building} key={index} />
        ))}
      </div>
      <div className={styles.deskGlow} />
    </div>
  );
}
