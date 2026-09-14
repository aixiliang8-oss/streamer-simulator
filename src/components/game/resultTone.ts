// Display-only classification of a choice's outcome, used purely to pick a
// CSS accent for the result card (warm / risky / neutral). It reads only
// values GamePage already has on hand — the visible effect deltas it
// already renders as +/- numbers, and the resulting violation stat the
// engine already computes and already drives getViolationRisk's 50/80/100
// tiers. It adds no new game rule and never touches hidden stats or
// Effect application.
import type { ChangeStatEffect, VisibleStats } from '../../game/model/types';

export type ResultTone = 'warm' | 'risk' | 'neutral';

const GOOD_WHEN_UP: ReadonlyArray<keyof VisibleStats> = [
  'popularity',
  'fans',
  'reputation',
  'money',
  'mentality',
];

const WARM_THRESHOLD = 8;
const RISK_THRESHOLD = -8;

// Matches the engine's own "attention" tier in getViolationRisk — once the
// player is already sitting at or above it, this turn's result reads as
// risky even if the immediate deltas happen to look net positive.
const VIOLATION_ATTENTION_LEVEL = 50;

export function getResultTone(
  effects: ChangeStatEffect[],
  currentViolation?: number,
): ResultTone {
  let score = 0;

  for (const effect of effects) {
    if (effect.scope !== 'visible') continue;
    const key = effect.key as keyof VisibleStats;

    if (key === 'violation') {
      score -= effect.amount;
    } else if (GOOD_WHEN_UP.includes(key)) {
      score += effect.amount;
    }
  }

  if (
    currentViolation !== undefined &&
    currentViolation >= VIOLATION_ATTENTION_LEVEL
  ) {
    return score <= RISK_THRESHOLD || score < WARM_THRESHOLD
      ? 'risk'
      : 'neutral';
  }

  if (score >= WARM_THRESHOLD) return 'warm';
  if (score <= RISK_THRESHOLD) return 'risk';
  return 'neutral';
}
