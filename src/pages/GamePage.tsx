import { ChoiceButton } from '../components/game/ChoiceButton';
import { getEventVisual } from '../components/game/eventVisuals';
import { getResultTone } from '../components/game/resultTone';
import { SceneImage } from '../components/game/SceneImage';
import { StatGrid } from '../components/game/StatGrid';
import { GameShell } from '../components/ui/GameShell';
import { LiveBadge } from '../components/ui/LiveBadge';
import { PixelButton } from '../components/ui/PixelButton';
import type {
  ChangeStatEffect,
  Choice,
  ChoiceId,
  Event as GameEvent,
  GameState,
  HistoryItem,
  ViolationRisk,
  VisibleStats,
} from '../game/model/types';
import styles from './GamePage.module.css';

const STAT_LABELS: Record<keyof VisibleStats, string> = {
  popularity: '人气',
  fans: '粉丝',
  reputation: '口碑',
  money: '财富',
  mentality: '精神',
  violation: '违规',
};

interface GamePageProps {
  gameState: GameState;
  event: GameEvent | null;
  choices: Choice[];
  historyItem: HistoryItem | null;
  isShowingResult: boolean;
  violationRisk: ViolationRisk | null;
  onChoice: (choiceId: ChoiceId) => void;
  onContinue: () => void;
}

export function GamePage({
  gameState,
  event,
  choices,
  historyItem,
  isShowingResult,
  violationRisk,
  onChoice,
  onContinue,
}: GamePageProps) {
  const visibleChanges =
    historyItem?.effects.filter(
      (effect): effect is ChangeStatEffect =>
        effect.type === 'changeStat' && effect.scope === 'visible',
    ) ?? [];

  const tone = getResultTone(visibleChanges, gameState.stats.violation);
  const eventVisual = event ? getEventVisual(event.category) : null;
  const showingResult = isShowingResult && historyItem !== null;

  return (
    <GameShell>
      <section className={styles.page}>
        <header className={styles.hud}>
          <div className={styles.dayLine}>
            <LiveBadge />
            <span>DAY {gameState.day}</span>
            <span>已走过 {gameState.history.length} 段人生</span>
          </div>
          <StatGrid stats={gameState.stats} variant="hud" />
        </header>

        {violationRisk && violationRisk.level !== 'normal' ? (
          <aside
            className={`${styles.riskAlert} ${
              violationRisk.level === 'high' ? styles.highRisk : ''
            }`}
            role="status"
          >
            <strong>{violationRisk.label}</strong>
            <span>{violationRisk.message}</span>
          </aside>
        ) : null}

        {event ? (
          <div className={styles.metaBar}>
            <span
              className={styles.categoryTag}
              data-accent={eventVisual?.accent}
            >
              <span aria-hidden="true" className={styles.categoryIcon}>
                {eventVisual?.icon}
              </span>
              {event.category}
            </span>
            <span>
              DAY {event.day} · 第 {event.order} 幕
            </span>
          </div>
        ) : null}

        {showingResult ? (
          <article
            className={`${styles.resultCard} ${
              tone === 'warm' ? styles.toneWarm : ''
            } ${tone === 'risk' ? styles.toneRisk : ''}`}
            aria-live="polite"
          >
            {historyItem.isImportant ? (
              <p className={styles.importantBadge}>关键选择</p>
            ) : null}
            <p className={styles.story}>{historyItem.summary}</p>
          </article>
        ) : event ? (
          <article className={styles.eventCard} data-mood={eventVisual?.mood}>
            <h1>{event.title}</h1>
            {event.time || event.location ? (
              <p className={styles.sceneContext}>
                {[event.time, event.location].filter(Boolean).join(' · ')}
              </p>
            ) : null}
            <p className={styles.story}>{event.scene ?? event.description}</p>
          </article>
        ) : (
          <p className={styles.story}>事件正在赶来的路上……</p>
        )}

        <div className={styles.sceneSlot}>
          <SceneImage
            category={event?.category}
            characterId={gameState.character}
            eventId={event?.id}
          />
        </div>

        {showingResult ? (
          <div className={styles.resultFooter}>
            <div className={styles.changes}>
              {visibleChanges.map((effect, index) => {
                const key = effect.key as keyof VisibleStats;
                return (
                  <span
                    className={
                      effect.amount < 0 ? styles.negative : styles.positive
                    }
                    key={`${key}-${index}`}
                  >
                    {STAT_LABELS[key]} {effect.amount > 0 ? '+' : ''}
                    {effect.amount}
                  </span>
                );
              })}
            </div>

            {historyItem.hiddenFeedback.length > 0 ? (
              <ul className={styles.hiddenFeedback}>
                {historyItem.hiddenFeedback.map((feedback) => (
                  <li key={feedback}>{feedback}</li>
                ))}
              </ul>
            ) : null}
            <PixelButton onClick={onContinue}>
              {gameState.status === 'ended' ? '查看主播人生报告' : '继续直播'}
            </PixelButton>
          </div>
        ) : event ? (
          <div className={styles.choices}>
            {choices.map((choice, index) => (
              <ChoiceButton
                index={index}
                isImportant={choice.isImportant}
                key={choice.id}
                label={choice.label}
                onClick={() => onChoice(choice.id)}
              />
            ))}
          </div>
        ) : null}
      </section>
    </GameShell>
  );
}
