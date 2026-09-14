// Display-only lookup: maps an Event's existing `category` string to an
// icon, accent color and narrative "mood" for GamePage's scene layer. This
// mirrors the existing STAT_LABELS pattern in the page components — it does
// not read or infer anything the engine hasn't already put on the event,
// and it adds no new game rules.
import type { Event as GameEvent } from '../../game/model/types';

export type EventAccent = 'pink' | 'violet' | 'gold' | 'success' | 'danger';

// Five broad emotional registers used to pick a scene backdrop treatment
// and card accent: daily life, a career high, public controversy, business
// opportunity, or a reflective/values-driven turning point.
export type EventMood =
  'daily' | 'highlight' | 'tense' | 'business' | 'reflective';

export interface EventVisual {
  icon: string;
  accent: EventAccent;
  mood: EventMood;
}

const CATEGORY_VISUALS: Record<string, EventVisual> = {
  开播: { icon: '🎬', accent: 'pink', mood: 'highlight' },
  日常: { icon: '💤', accent: 'violet', mood: 'daily' },
  粉丝: { icon: '💗', accent: 'pink', mood: 'daily' },
  舆论: { icon: '🗯️', accent: 'danger', mood: 'tense' },
  商务: { icon: '💼', accent: 'gold', mood: 'business' },
  流量: { icon: '🔥', accent: 'gold', mood: 'highlight' },
  成长: { icon: '🌱', accent: 'success', mood: 'highlight' },
  平台: { icon: '📡', accent: 'violet', mood: 'tense' },
  同行: { icon: '🎤', accent: 'violet', mood: 'business' },
  签约: { icon: '📝', accent: 'gold', mood: 'business' },
  危机: { icon: '⚠️', accent: 'danger', mood: 'tense' },
  压力: { icon: '🫧', accent: 'danger', mood: 'tense' },
  边界: { icon: '🚧', accent: 'gold', mood: 'reflective' },
  定位: { icon: '🎯', accent: 'violet', mood: 'daily' },
  坚持: { icon: '🕯️', accent: 'success', mood: 'daily' },
  抉择: { icon: '⚖️', accent: 'gold', mood: 'reflective' },
  人生选择: { icon: '🌙', accent: 'pink', mood: 'reflective' },
};

const DEFAULT_VISUAL: EventVisual = {
  icon: '📺',
  accent: 'violet',
  mood: 'daily',
};

export function getEventVisual(category: GameEvent['category']): EventVisual {
  return CATEGORY_VISUALS[category] ?? DEFAULT_VISUAL;
}
