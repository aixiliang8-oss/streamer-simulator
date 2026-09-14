import { GamePage } from '../pages/GamePage';
import { ReportPage } from '../pages/ReportPage';
import { StartPage } from '../pages/StartPage';
import { ShowcasePage } from '../showcase/ShowcasePage';
import { useGameSession } from '../hooks/useGameSession';

export function App() {
  const session = useGameSession();

  if (window.location.pathname === '/showcase') {
    return <ShowcasePage />;
  }

  if (!session.gameState) {
    return <StartPage onStart={session.start} />;
  }

  if (session.view === 'report' && session.report) {
    return <ReportPage report={session.report} onRestart={session.restart} />;
  }

  return (
    <GamePage
      choices={session.availableChoices}
      event={session.currentEvent}
      gameState={session.gameState}
      historyItem={session.lastHistoryItem}
      isShowingResult={session.view === 'result'}
      violationRisk={session.violationRisk}
      onChoice={session.choose}
      onContinue={session.continueGame}
    />
  );
}
