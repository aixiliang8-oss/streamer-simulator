import { iterations } from './showcaseData';
import styles from './ShowcasePage.module.css';

export function IterationTimeline() {
  return (
    <ol className={styles.timeline}>
      {iterations.map((iteration) => (
        <li key={iteration.version}>
          <div className={styles.timelineVersion}>{iteration.version}</div>
          <article>
            <h3>{iteration.title}</h3>
            <blockquote>{iteration.quote}</blockquote>
            <p>{iteration.problem}</p>
            <ul>
              {iteration.changes.map((change) => (
                <li key={change}>{change}</li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ol>
  );
}
