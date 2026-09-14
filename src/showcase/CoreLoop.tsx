import { hiddenStats, visibleStats } from './showcaseData';
import styles from './ShowcasePage.module.css';

const loopSteps = [
  '人生事件',
  '做出选择',
  '显性属性 / Hidden State / Tag',
  '影响后续事件',
  '塑造主播人格',
  '不同人生结局',
] as const;

export function CoreLoop() {
  return (
    <div className={styles.loopWrap}>
      <ol className={styles.loop}>
        {loopSteps.map((title, index) => (
          <li key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{title}</strong>
          </li>
        ))}
      </ol>
      <p className={styles.loopDescription}>
        玩家看到的是人气、粉丝、口碑、财富、精神、违规等显性状态；部分选择也会影响平台信任、商业价值、法律风险等隐藏状态，并在后续剧情中重新出现。
      </p>
      <div className={styles.statePanels}>
        <article>
          <p>显性状态</p>
          <div className={styles.chips}>
            {visibleStats.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </div>
        </article>
        <article>
          <p>隐藏状态</p>
          <div className={styles.chips}>
            {hiddenStats.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
            <span>Tags</span>
          </div>
        </article>
      </div>
    </div>
  );
}
