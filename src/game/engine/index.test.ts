import { describe, expect, it } from 'vitest';

import { newcomerCharacter } from '../content/characters';
import { events } from '../content/events';
import {
  applyChoice,
  checkEnding,
  createGame,
  createInitialGameState,
  createLifeReport,
  getAvailableChoices,
  getCurrentEvent,
  getViolationRisk,
} from './index';

function choose(gameState: ReturnType<typeof createGame>, choiceId: string) {
  return applyChoice(gameState, choiceId).state;
}

describe('vertical slice engine', () => {
  it('keeps the Phase 1 empty-state factory serializable', () => {
    const state = createInitialGameState();

    expect(state).toMatchObject({
      schemaVersion: 1,
      status: 'playing',
      day: 1,
      eventIndexInDay: 0,
      character: null,
      currentEventId: null,
      tags: [],
      history: [],
      ending: null,
    });
    expect(() => JSON.stringify(state)).not.toThrow();
  });

  it('uses twenty ordered data events and lets a tag change a later choice', () => {
    expect(events).toHaveLength(20);
    expect(new Set(events.map((event) => event.id)).size).toBe(20);
    expect(
      new Set(events.map((event) => `${event.day}-${event.order}`)).size,
    ).toBe(20);
    expect(
      events.every(
        (event) => event.choices.length >= 2 && event.choices.length <= 3,
      ),
    ).toBe(true);
    expect(
      events.every((event) => event.time && event.location && event.scene),
    ).toBe(true);

    let state = createGame(newcomerCharacter);
    expect(getCurrentEvent(state)?.id).toBe('first-stream');

    state = choose(state, 'first-stream-careful');
    state = choose(state, 'empty-room-chat');

    const feedbackEvent = getCurrentEvent(state);
    expect(feedbackEvent?.id).toBe('first-feedback');
    expect(state.tags).toContain('genuine');
    expect(
      getAvailableChoices(state, feedbackEvent!).map((choice) => choice.id),
    ).toContain('feedback-reply');
    expect(
      getAvailableChoices(state, feedbackEvent!).find(
        (choice) => choice.id === 'feedback-reply',
      )?.causeText,
    ).toContain('因为你曾认真对待');
    expect(
      getAvailableChoices(state, feedbackEvent!).map((choice) => choice.id),
    ).not.toContain('feedback-overstate');

    state = choose(state, 'feedback-reply');
    expect(state.history.at(-1)?.hiddenFeedback[0]).toContain('核心观众');
  });

  it('completes the relationship path with a companion persona report', () => {
    let state = createGame(newcomerCharacter);
    const choices = [
      'first-stream-careful',
      'empty-room-chat',
      'feedback-reply',
      'gift-remember-name',
      'keep-going-schedule',
      'direction-community',
      'viral-reply-community',
      'community-build-language',
      'fans-first',
      'hater-explain',
      'business-review',
      'mcn-review-contract',
      'rules-study',
      'collab-support',
      'crisis-stop-and-check',
      'algorithm-trust-plan',
      'boundary-public-rules',
      'burnout-talk-openly',
      'career-content',
      'summary-remember-people',
    ];

    for (const choiceId of choices) {
      state = choose(state, choiceId);
    }

    expect(state.status).toBe('ended');
    expect(state.ending).toBe('deep-night-companion');
    expect(state.hiddenStats.loyalty).toBeGreaterThanOrEqual(65);
    expect(state.history).toHaveLength(20);
    const report = createLifeReport(state, newcomerCharacter);
    expect(report.moments).toHaveLength(20);
    expect(report.persona).toEqual({
      title: '长期主义者',
      tags: ['温柔陪伴', '关系经营', '内容理想'],
      description:
        '你相信稳定的回应比瞬间的热搜更珍贵，把直播间经营成了一盏小夜灯。',
    });
    expect(report.summary).toContain('第一次直播');
    expect(report.summary).toContain('深夜陪伴主播');
    const firstMoment = report.moments[0];
    expect(firstMoment).toBeDefined();
    expect(firstMoment).toMatchObject({
      time: '晚上 20:03',
      location: '出租屋 · 临时直播角',
      choiceLabel: '认真调试，先和空气打招呼',
      hiddenFeedback: ['平台认为你的开播表现稳定，推荐意愿略有上升。'],
    });
    expect(firstMoment!.visibleChanges).toContainEqual({
      key: 'popularity',
      amount: 3,
    });
  });

  it('can end early when accumulated violation reaches the threshold', () => {
    let state = createGame(newcomerCharacter);
    const choices = [
      'first-stream-clickbait',
      'empty-room-fake-traffic',
      'feedback-watch-numbers',
      'gift-big-performance',
      'keep-going-rest',
      'direction-trends',
      'viral-squeeze-traffic',
      'community-open-door',
      'traffic-first',
      'hater-fight',
      'business-risky-ad',
    ];

    for (const choiceId of choices) {
      state = choose(state, choiceId);
    }

    expect(state.status).toBe('ended');
    expect(state.ending).toBe('permanent-ban');
    expect(state.history).toHaveLength(11);
    expect(state.stats.violation).toBe(100);
  });

  it('recognizes a high-value commercial route', () => {
    let state = createGame(newcomerCharacter);
    const choices = [
      'first-stream-clickbait',
      'empty-room-fake-traffic',
      'feedback-watch-numbers',
      'gift-big-performance',
      'keep-going-rest',
      'direction-trends',
      'viral-squeeze-traffic',
      'community-ignore',
      'traffic-first',
      'hater-mute',
      'business-decline',
      'mcn-sign-now',
      'rules-ignore',
      'collab-steal-show',
      'crisis-delete-comments',
      'algorithm-appeal',
      'boundary-accept',
      'burnout-force-stream',
      'career-business',
      'summary-chase-heat',
    ];

    for (const choiceId of choices) {
      state = choose(state, choiceId);
    }

    expect(state.status).toBe('ended');
    expect(state.ending).toBe('commercial-streamer');
    expect(state.history).toHaveLength(20);
  });

  it('returns qualitative risk feedback at the exact violation thresholds', () => {
    const state = createGame(newcomerCharacter);

    expect(
      getViolationRisk({ ...state, stats: { ...state.stats, violation: 49 } })
        .level,
    ).toBe('normal');
    expect(
      getViolationRisk({ ...state, stats: { ...state.stats, violation: 50 } })
        .label,
    ).toBe('平台关注');
    expect(
      getViolationRisk({ ...state, stats: { ...state.stats, violation: 80 } })
        .label,
    ).toBe('高风险状态');
    expect(
      getViolationRisk({ ...state, stats: { ...state.stats, violation: 100 } })
        .label,
    ).toBe('永久封禁');
  });

  it('uses the black-red edge ending below the permanent-ban threshold', () => {
    let state = createGame(newcomerCharacter);
    const choices = [
      'first-stream-clickbait',
      'empty-room-fake-traffic',
      'feedback-watch-numbers',
      'gift-big-performance',
      'keep-going-rest',
      'direction-trends',
      'viral-squeeze-traffic',
      'community-open-door',
      'traffic-first',
      'hater-fight',
      'business-review',
      'mcn-review-contract',
      'rules-study',
      'collab-steal-show',
      'crisis-stop-and-check',
      'algorithm-trust-plan',
      'boundary-accept',
      'burnout-rest',
      'career-controversy',
      'summary-chase-heat',
    ];

    for (const choiceId of choices) {
      state = choose(state, choiceId);
    }

    expect(state.stats.violation).toBe(85);
    expect(state.tags).toContain('controversial');
    expect(state.ending).toBe('black-red-edge');
  });

  it.each([
    {
      name: 'low mentality',
      kind: 'gameOver' as const,
      stats: { mentality: 15 },
      hiddenStats: {},
      tags: [],
      endingId: 'left-streaming',
    },
    {
      name: 'commercial value',
      kind: 'career' as const,
      stats: { money: 100 },
      hiddenStats: { commercialValue: 60 },
      tags: [],
      endingId: 'commercial-streamer',
    },
    {
      name: 'loyal audience',
      kind: 'career' as const,
      stats: { reputation: 80 },
      hiddenStats: { loyalty: 65 },
      tags: [],
      endingId: 'deep-night-companion',
    },
    {
      name: 'traffic breakout',
      kind: 'career' as const,
      stats: { popularity: 180, fans: 180 },
      hiddenStats: {},
      tags: [],
      endingId: 'traffic-breakout',
    },
    {
      name: 'slow persistence',
      kind: 'career' as const,
      stats: { mentality: 60 },
      hiddenStats: {},
      tags: [],
      endingId: 'slow-burn-persistent',
    },
  ])('matches the $name narrative ending', (route) => {
    const state = createGame(newcomerCharacter);
    const ending = checkEnding(
      {
        ...state,
        stats: { ...state.stats, ...route.stats },
        hiddenStats: { ...state.hiddenStats, ...route.hiddenStats },
        tags: route.tags,
      },
      route.kind,
    );

    expect(ending?.id).toBe(route.endingId);
    expect(ending?.persona.tags.length).toBeGreaterThan(0);
  });
});
