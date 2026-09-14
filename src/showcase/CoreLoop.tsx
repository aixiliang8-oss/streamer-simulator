import { hiddenStats, visibleStats } from './showcaseData';
import styles from './ShowcasePage.module.css';

const loopSteps = [
  ['人生事件', '深夜的直播间，问题真的发生了。'],
  ['做出选择', '选择一种价值取向，而非标准答案。'],
  ['状态留下痕迹', '显性属性、隐藏状态与 Tag 同时变化。'],
  ['未来重新回应', '影响后续剧情、人物关系与风险。'],
  ['成为一种主播', 'Persona 与人生结局写下这局故事。'],
] as const;

export function CoreLoop() {
  return (
    <div className={styles.loopWrap}>
      <ol className={styles.loop}>
        {loopSteps.map(([title, description], index) => (
          <li key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{title}</strong>
            <small>{description}</small>
          </li>
        ))}
      </ol>
      <div className={styles.statePanels}>
        <article>
          <p>看得见的状态</p>
          <h3>每一次选择都有即时反馈</h3>
          <div className={styles.chips}>
            {visibleStats.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </div>
        </article>
        <article>
          <p>看不见的状态</p>
          <h3>真正决定未来的，未必会立刻显示</h3>
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
