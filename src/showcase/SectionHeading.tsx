import styles from './ShowcasePage.module.css';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  intro?: string;
}

export function SectionHeading({ eyebrow, title, intro }: SectionHeadingProps) {
  return (
    <header className={styles.sectionHeading}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      {intro ? <p className={styles.sectionIntro}>{intro}</p> : null}
    </header>
  );
}
