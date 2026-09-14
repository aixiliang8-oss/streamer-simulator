import { useMemo, useState } from 'react';

import { newcomerCharacter } from '../game/content/characters';
import {
  applyChoice,
  createGame,
  createLifeReport,
  getAvailableChoices,
  getCurrentEvent,
  getViolationRisk,
} from '../game/engine';
import type { ChoiceId, GameState, HistoryItem } from '../game/model/types';

type SessionView = 'event' | 'result' | 'report';

export function useGameSession() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [view, setView] = useState<SessionView>('event');
  const [lastHistoryItem, setLastHistoryItem] = useState<HistoryItem | null>(
    null,
  );

  const currentEvent = gameState ? getCurrentEvent(gameState) : null;
  const availableChoices =
    gameState && currentEvent
      ? getAvailableChoices(gameState, currentEvent)
      : [];
  const violationRisk = gameState ? getViolationRisk(gameState) : null;
  const report = useMemo(
    () =>
      gameState?.status === 'ended'
        ? createLifeReport(gameState, newcomerCharacter)
        : null,
    [gameState],
  );

  function start() {
    setGameState(createGame(newcomerCharacter));
    setLastHistoryItem(null);
    setView('event');
  }

  function choose(choiceId: ChoiceId) {
    if (!gameState) {
      return;
    }

    const resolution = applyChoice(gameState, choiceId);
    setGameState(resolution.state);
    setLastHistoryItem(resolution.historyItem);
    setView('result');
  }

  function continueGame() {
    setView(gameState?.status === 'ended' ? 'report' : 'event');
  }

  function restart() {
    setGameState(null);
    setLastHistoryItem(null);
    setView('event');
  }

  return {
    character: newcomerCharacter,
    gameState,
    view,
    currentEvent,
    availableChoices,
    violationRisk,
    lastHistoryItem,
    report,
    start,
    choose,
    continueGame,
    restart,
  };
}
