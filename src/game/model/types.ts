export type CharacterId = string;
export type EventId = string;
export type ChoiceId = string;
export type EndingId = string;
export type TagId = string;

export interface VisibleStats {
  popularity: number;
  fans: number;
  reputation: number;
  money: number;
  mentality: number;
  violation: number;
}

export interface HiddenStats {
  haters: number;
  platformTrust: number;
  loyalty: number;
  commercialValue: number;
  legalRisk: number;
}

export interface Tag {
  id: TagId;
  name: string;
  description: string;
}

export interface CharacterTalent {
  id: string;
  name: string;
  description: string;
}

export interface Character {
  id: CharacterId;
  name: string;
  description: string;
  initialStats: VisibleStats;
  initialHiddenStats: HiddenStats;
  initialTags: TagId[];
  talents: CharacterTalent[];
}

export type NumericComparator = 'eq' | 'gt' | 'gte' | 'lt' | 'lte';

export interface StatCondition {
  type: 'stat';
  scope: 'visible' | 'hidden';
  key: keyof VisibleStats | keyof HiddenStats;
  comparator: NumericComparator;
  value: number;
}

export interface TagCondition {
  type: 'tag';
  tagId: TagId;
  present: boolean;
}

export interface HistoryCondition {
  type: 'history';
  eventId: EventId;
  choiceId?: ChoiceId;
  occurred: boolean;
}

export type Condition = StatCondition | TagCondition | HistoryCondition;

export interface ChangeStatEffect {
  type: 'changeStat';
  scope: 'visible' | 'hidden';
  key: keyof VisibleStats | keyof HiddenStats;
  amount: number;
}

export interface AddTagEffect {
  type: 'addTag';
  tagId: TagId;
}

export interface RemoveTagEffect {
  type: 'removeTag';
  tagId: TagId;
}

export interface TriggerEndingEffect {
  type: 'triggerEnding';
  endingId: EndingId;
}

export type Effect =
  ChangeStatEffect | AddTagEffect | RemoveTagEffect | TriggerEndingEffect;

export interface Choice {
  id: ChoiceId;
  label: string;
  resultText: string;
  causeText?: string;
  hiddenFeedback?: string[];
  isImportant?: boolean;
  conditions?: Condition[];
  effects: Effect[];
}

export interface Event {
  id: EventId;
  title: string;
  description: string;
  time?: string;
  location?: string;
  scene?: string;
  category: string;
  day: number;
  order: number;
  availableDays?: readonly number[];
  weight: number;
  conditions: Condition[];
  choices: Choice[];
}

export interface Persona {
  title: string;
  tags: string[];
  description: string;
}

export interface Ending {
  id: EndingId;
  title: string;
  description: string;
  persona: Persona;
  type: 'gameOver' | 'career';
  priority: number;
  conditions: Condition[];
}

export interface HistoryItem {
  sequence: number;
  day: number;
  eventId: EventId;
  choiceId: ChoiceId;
  summary: string;
  effects: Effect[];
  hiddenFeedback: string[];
  isImportant: boolean;
}

export interface ViolationRisk {
  level: 'normal' | 'attention' | 'high';
  label: string | null;
  message: string | null;
}

export interface GameState {
  schemaVersion: number;
  status: 'playing' | 'ended';
  day: number;
  eventIndexInDay: number;
  character: CharacterId | null;
  stats: VisibleStats;
  hiddenStats: HiddenStats;
  tags: TagId[];
  history: HistoryItem[];
  currentEventId: EventId | null;
  ending: EndingId | null;
}

export interface LifeReportMoment {
  day: number;
  time?: string;
  location?: string;
  scene?: string;
  eventTitle: string;
  choiceLabel: string;
  summary: string;
  visibleChanges: Array<{
    key: keyof VisibleStats;
    amount: number;
  }>;
  hiddenFeedback: string[];
  isImportant: boolean;
}

export interface LifeReport {
  endingTitle: string;
  endingDescription: string;
  characterName: string;
  persona: Persona;
  survivedDays: number;
  finalStats: VisibleStats;
  moments: LifeReportMoment[];
  summary: string;
}
