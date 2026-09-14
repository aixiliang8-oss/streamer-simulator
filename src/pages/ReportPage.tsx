import { useState } from 'react';

import { ENDING_ILLUSTRATION_IMAGES } from '../assets/scenes/registry';
import { GameShell } from '../components/ui/GameShell';
import { PixelButton } from '../components/ui/PixelButton';
import type { LifeReport, VisibleStats } from '../game/model/types';
import styles from './ReportPage.module.css';

const HIGHLIGHT_LIMIT = 3;

const STAT_LABELS: Record<keyof VisibleStats, string> = {
  popularity: '人气',
  fans: '粉丝',
  reputation: '口碑',
  money: '财富',
  mentality: '精神',
  violation: '违规',
};

const STAT_ORDER = Object.keys(STAT_LABELS) as (keyof VisibleStats)[];

interface ReportPageProps {
  report: LifeReport;
  onRestart: () => void;
}

export function ReportPage({ report, onRestart }: ReportPageProps) {
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const endingImage = ENDING_ILLUSTRATION_IMAGES[report.endingTitle];
  const storyParagraphs = report.endingDescription
    .split('\n\n')
    .filter(Boolean);
  const highlightMoments = report.moments
    .filter((moment) => moment.isImportant)
    .slice(0, HIGHLIGHT_LIMIT);

  return (
    <GameShell>
      <main className={styles.page}>
        <section className={styles.poster}>
          <p className={styles.watermark}>主播模拟器 · LIFE REPORT</p>

          <div
            className={styles.posterArt}
            style={
              endingImage
                ? { backgroundImage: `url(${endingImage})` }
                : undefined
            }
          >
            {!endingImage ? (
              <span aria-hidden="true" className={styles.posterArtIcon}>
                🌙
              </span>
            ) : null}
          </div>

          <header className={styles.hero}>
            <p>主播人生报告</p>
            <h1>{report.endingTitle}</h1>
          </header>
        </section>

        <section className={styles.identity}>
          <span className={styles.primaryTag}>{report.persona.title}</span>
          <p className={styles.personaDescription}>
            {report.persona.description}
          </p>

          <div className={styles.story}>
            {storyParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <blockquote className={styles.pullQuote}>{report.summary}</blockquote>

          <div className={styles.secondaryTags} aria-label="人生关键词">
            {report.persona.tags.map((tag) => (
              <small key={tag}>#{tag}</small>
            ))}
          </div>
        </section>

        {highlightMoments.length > 0 ? (
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>代表性经历</h2>
              <span>{highlightMoments.length} 个关键时刻</span>
            </div>
            <ul className={styles.highlights}>
              {highlightMoments.map((moment, index) => (
                <li key={`${moment.day}-${index}`}>
                  <span className={styles.highlightDay}>
                    DAY {moment.day}
                    {moment.location ? ` · ${moment.location}` : ''}
                  </span>
                  <h3>{moment.eventTitle}</h3>
                  <p className={styles.choiceText}>
                    你选择了：{moment.choiceLabel}
                  </p>
                  <small>{moment.summary}</small>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className={styles.section}>
          <h2>最终状态</h2>
          <dl className={styles.statsTable}>
            <div className={styles.statsRow}>
              <dt>生存天数</dt>
              <dd className={styles.statsValue}>DAY {report.survivedDays}</dd>
            </div>
            {STAT_ORDER.map((key) => (
              <div className={styles.statsRow} key={key}>
                <dt>{STAT_LABELS[key]}</dt>
                <dd
                  className={`${styles.statsValue} ${
                    key === 'violation' && report.finalStats[key] > 0
                      ? styles.danger
                      : ''
                  }`}
                >
                  {report.finalStats[key]}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <h2>人生轨迹</h2>
            <span>{report.moments.length} 段经历</span>
          </div>
          <PixelButton
            aria-expanded={isTimelineOpen}
            onClick={() => setIsTimelineOpen((isOpen) => !isOpen)}
          >
            {isTimelineOpen ? '收起完整人生轨迹' : '查看完整人生轨迹'}
          </PixelButton>
          {isTimelineOpen ? (
            <ol className={styles.timeline}>
              {report.moments.map((moment, index) => (
                <li key={`${moment.day}-${index}`}>
                  <div className={styles.momentHeader}>
                    <span>
                      DAY {moment.day}
                      {moment.time ? ` · ${moment.time}` : ''}
                    </span>
                    {moment.isImportant ? <strong>关键选择</strong> : null}
                  </div>
                  {moment.location ? (
                    <small className={styles.location}>{moment.location}</small>
                  ) : null}
                  <h3>{moment.eventTitle}</h3>
                  {moment.scene ? <p>{moment.scene}</p> : null}
                  <p className={styles.choiceText}>
                    你选择了：{moment.choiceLabel}
                  </p>
                  <small>{moment.summary}</small>
                  {moment.visibleChanges.length > 0 ? (
                    <div className={styles.changes} aria-label="属性影响">
                      {moment.visibleChanges.map((change, changeIndex) => (
                        <span
                          className={
                            change.amount < 0
                              ? styles.negative
                              : styles.positive
                          }
                          key={`${change.key}-${changeIndex}`}
                        >
                          {STAT_LABELS[change.key]}{' '}
                          {change.amount > 0 ? '+' : ''}
                          {change.amount}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {moment.hiddenFeedback.length > 0 ? (
                    <ul className={styles.hiddenFeedback}>
                      {moment.hiddenFeedback.map((feedback) => (
                        <li key={feedback}>{feedback}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ol>
          ) : null}
        </section>

        <PixelButton onClick={onRestart}>重新开始</PixelButton>
      </main>
    </GameShell>
  );
}
