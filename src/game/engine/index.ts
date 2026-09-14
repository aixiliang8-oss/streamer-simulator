import { endings } from '../content/endings';
import { events } from '../content/events';
import type {
  Character,
  Choice,
  ChoiceId,
  Condition,
  Effect,
  Ending,
  Event as GameEvent,
  EventId,
  GameState,
  HiddenStats,
  HistoryItem,
  LifeReport,
  NumericComparator,
  ViolationRisk,
  VisibleStats,
} from '../model/types';

const EMPTY_VISIBLE_STATS: VisibleStats = {
  popularity: 0,
  fans: 0,
  reputation: 0,
  money: 0,
  mentality: 0,
  violation: 0,
};

const EMPTY_HIDDEN_STATS: HiddenStats = {
  haters: 0,
  platformTrust: 0,
  loyalty: 0,
  commercialValue: 0,
  legalRisk: 0,
};

export interface ChoiceResolution {
  state: GameState;
  historyItem: HistoryItem;
}

function orderedEvents(eventList: readonly GameEvent[]): GameEvent[] {
  return [...eventList].sort(
    (left, right) => left.day - right.day || left.order - right.order,
  );
}

function compare(
  left: number,
  comparator: NumericComparator,
  right: number,
): boolean {
  switch (comparator) {
    case 'eq':
      return left === right;
    case 'gt':
      return left > right;
    case 'gte':
      return left >= right;
    case 'lt':
      return left < right;
    case 'lte':
      return left <= right;
  }
}

function matchesCondition(state: GameState, condition: Condition): boolean {
  switch (condition.type) {
    case 'tag':
      return state.tags.includes(condition.tagId) === condition.present;
    case 'history': {
      const occurred = state.history.some(
        (item) =>
          item.eventId === condition.eventId &&
          (condition.choiceId === undefined ||
            item.choiceId === condition.choiceId),
      );
      return occurred === condition.occurred;
    }
    case 'stat': {
      const value =
        condition.scope === 'visible'
          ? state.stats[condition.key as keyof VisibleStats]
          : state.hiddenStats[condition.key as keyof HiddenStats];
      return compare(value, condition.comparator, condition.value);
    }
  }
}

function matchesAllConditions(
  state: GameState,
  conditions: readonly Condition[],
): boolean {
  return conditions.every((condition) => matchesCondition(state, condition));
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function normalizeVisibleStat(key: keyof VisibleStats, value: number): number {
  if (key === 'reputation' || key === 'mentality' || key === 'violation') {
    return clamp(value, 0, 100);
  }

  return Math.max(0, value);
}

function applyEffect(state: GameState, effect: Effect): GameState {
  switch (effect.type) {
    case 'changeStat': {
      if (effect.scope === 'visible') {
        const key = effect.key as keyof VisibleStats;
        return {
          ...state,
          stats: {
            ...state.stats,
            [key]: normalizeVisibleStat(key, state.stats[key] + effect.amount),
          },
        };
      }

      const key = effect.key as keyof HiddenStats;
      return {
        ...state,
        hiddenStats: {
          ...state.hiddenStats,
          [key]: clamp(state.hiddenStats[key] + effect.amount, 0, 100),
        },
      };
    }
    case 'addTag':
      return state.tags.includes(effect.tagId)
        ? state
        : { ...state, tags: [...state.tags, effect.tagId] };
    case 'removeTag':
      return {
        ...state,
        tags: state.tags.filter((tagId) => tagId !== effect.tagId),
      };
    case 'triggerEnding':
      return state;
  }
}

export function createInitialGameState(
  character?: Character,
  firstEventId: EventId | null = null,
): GameState {
  return {
    schemaVersion: 1,
    status: 'playing',
    day: 1,
    eventIndexInDay: 0,
    character: character?.id ?? null,
    stats: { ...(character?.initialStats ?? EMPTY_VISIBLE_STATS) },
    hiddenStats: { ...(character?.initialHiddenStats ?? EMPTY_HIDDEN_STATS) },
    tags: [...(character?.initialTags ?? [])],
    history: [],
    currentEventId: firstEventId,
    ending: null,
  };
}

export function createGame(
  character: Character,
  eventList: readonly GameEvent[] = events,
): GameState {
  const firstEvent = orderedEvents(eventList)[0];
  if (!firstEvent) {
    throw new Error('无法创建游戏：事件列表为空。');
  }

  return createInitialGameState(character, firstEvent.id);
}

export function getCurrentEvent(
  gameState: GameState,
  eventList: readonly GameEvent[] = events,
): GameEvent | null {
  if (gameState.status === 'ended' || gameState.currentEventId === null) {
    return null;
  }

  return (
    eventList.find((event) => event.id === gameState.currentEventId) ?? null
  );
}

export function getAvailableChoices(
  gameState: GameState,
  event: GameEvent,
): Choice[] {
  return event.choices.filter((choice) =>
    matchesAllConditions(gameState, choice.conditions ?? []),
  );
}

export function checkEnding(
  gameState: GameState,
  kind: Ending['type'] = 'gameOver',
  endingList: readonly Ending[] = endings,
): Ending | null {
  return (
    [...endingList]
      .filter((ending) => ending.type === kind)
      .sort((left, right) => right.priority - left.priority)
      .find((ending) => matchesAllConditions(gameState, ending.conditions)) ??
    null
  );
}

export function applyChoice(
  gameState: GameState,
  choice: Choice | ChoiceId,
  eventList: readonly GameEvent[] = events,
  endingList: readonly Ending[] = endings,
): ChoiceResolution {
  if (gameState.status !== 'playing') {
    throw new Error('游戏已经结束，不能继续选择。');
  }

  const currentEvent = getCurrentEvent(gameState, eventList);
  if (!currentEvent) {
    throw new Error('当前事件不存在。');
  }

  const choiceId = typeof choice === 'string' ? choice : choice.id;
  const selectedChoice = getAvailableChoices(gameState, currentEvent).find(
    (candidate) => candidate.id === choiceId,
  );
  if (!selectedChoice) {
    throw new Error(`选项 ${choiceId} 在当前事件中不可用。`);
  }

  let nextState = selectedChoice.effects.reduce(applyEffect, gameState);
  const historyItem: HistoryItem = {
    sequence: gameState.history.length + 1,
    day: gameState.day,
    eventId: currentEvent.id,
    choiceId: selectedChoice.id,
    summary: selectedChoice.resultText,
    effects: selectedChoice.effects,
    hiddenFeedback: selectedChoice.hiddenFeedback ?? [],
    isImportant: selectedChoice.isImportant ?? false,
  };
  nextState = { ...nextState, history: [...nextState.history, historyItem] };

  const directEndingId = selectedChoice.effects.find(
    (effect) => effect.type === 'triggerEnding',
  )?.endingId;
  const immediateEnding = directEndingId
    ? (endingList.find((ending) => ending.id === directEndingId) ?? null)
    : checkEnding(nextState, 'gameOver', endingList);

  if (immediateEnding) {
    return {
      historyItem,
      state: {
        ...nextState,
        status: 'ended',
        currentEventId: null,
        ending: immediateEnding.id,
      },
    };
  }

  const sequence = orderedEvents(eventList);
  const currentIndex = sequence.findIndex(
    (event) => event.id === currentEvent.id,
  );
  const nextEvent = sequence[currentIndex + 1];

  if (nextEvent) {
    return {
      historyItem,
      state: {
        ...nextState,
        day: nextEvent.day,
        eventIndexInDay: nextEvent.order - 1,
        currentEventId: nextEvent.id,
      },
    };
  }

  const careerEnding = checkEnding(nextState, 'career', endingList);
  if (!careerEnding) {
    throw new Error('游戏流程结束，但没有匹配到正常结局。');
  }

  return {
    historyItem,
    state: {
      ...nextState,
      status: 'ended',
      currentEventId: null,
      ending: careerEnding.id,
    },
  };
}

export function getViolationRisk(gameState: GameState): ViolationRisk {
  if (gameState.stats.violation >= 100) {
    return {
      level: 'high',
      label: '永久封禁',
      message: '平台已经永久关闭了你的直播间。',
    };
  }

  if (gameState.stats.violation >= 80) {
    return {
      level: 'high',
      label: '高风险状态',
      message: '平台正在重点审查你的直播间，下一次违规可能直接结束主播生涯。',
    };
  }

  if (gameState.stats.violation >= 50) {
    return {
      level: 'attention',
      label: '平台关注',
      message: '近期操作已经引起平台注意，推荐和审核正在变得谨慎。',
    };
  }

  return { level: 'normal', label: null, message: null };
}

function createPersona(ending: Ending, gameState: GameState) {
  const choiceIds = new Set(gameState.history.map((item) => item.choiceId));
  const routeTag = choiceIds.has('career-content')
    ? '内容理想'
    : choiceIds.has('career-business')
      ? '经营路线'
      : choiceIds.has('career-controversy')
        ? '争议路线'
        : gameState.tags.includes('selfCare')
          ? '懂得停播'
          : null;

  return {
    ...ending.persona,
    tags: [
      ...new Set([...ending.persona.tags, ...(routeTag ? [routeTag] : [])]),
    ],
  };
}

export function createLifeReport(
  gameState: GameState,
  character: Character,
  eventList: readonly GameEvent[] = events,
  endingList: readonly Ending[] = endings,
): LifeReport {
  if (gameState.status !== 'ended' || gameState.ending === null) {
    throw new Error('只有已经结束的游戏才能生成人生报告。');
  }

  const ending = endingList.find(
    (candidate) => candidate.id === gameState.ending,
  );
  if (!ending) {
    throw new Error(`找不到结局 ${gameState.ending}。`);
  }

  const moments = gameState.history.map((item) => {
    const event = eventList.find((candidate) => candidate.id === item.eventId);
    const selectedChoice = event?.choices.find(
      (candidate) => candidate.id === item.choiceId,
    );

    return {
      day: item.day,
      time: event?.time,
      location: event?.location,
      scene: event?.scene,
      eventTitle: event?.title ?? item.eventId,
      choiceLabel: selectedChoice?.label ?? item.choiceId,
      summary: item.summary,
      visibleChanges: item.effects.flatMap((effect) =>
        effect.type === 'changeStat' && effect.scope === 'visible'
          ? [
              {
                key: effect.key as keyof VisibleStats,
                amount: effect.amount,
              },
            ]
          : [],
      ),
      hiddenFeedback: [...item.hiddenFeedback],
      isImportant: item.isImportant,
    };
  });

  const firstMoment = moments[0];
  const decisiveMoment = [...moments]
    .reverse()
    .find((moment) => moment.isImportant);
  const summary = firstMoment
    ? `第 ${firstMoment.day} 天，在“${firstMoment.eventTitle}”里，你从“${firstMoment.choiceLabel}”开始。${
        decisiveMoment
          ? `后来在“${decisiveMoment.eventTitle}”里，你选择了“${decisiveMoment.choiceLabel}”。`
          : ''
      }这些决定把你带到了“${ending.title}”。`
    : ending.description;

  return {
    endingTitle: ending.title,
    endingDescription: ending.description,
    characterName: character.name,
    persona: createPersona(ending, gameState),
    survivedDays: gameState.day,
    finalStats: { ...gameState.stats },
    moments,
    summary,
  };
}
