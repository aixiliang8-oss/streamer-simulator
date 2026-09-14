import { START_COVER_IMAGE } from '../assets/scenes/registry';
import { GameShell } from '../components/ui/GameShell';
import { PixelButton } from '../components/ui/PixelButton';
import styles from './StartPage.module.css';

interface StartPageProps {
  onStart: () => void;
}

export function StartPage({ onStart }: StartPageProps) {
  return (
    <GameShell>
      <section className={styles.page} aria-labelledby="game-title">
        <div
          className={styles.cover}
          style={
            START_COVER_IMAGE
              ? { backgroundImage: `url(${START_COVER_IMAGE})` }
              : undefined
          }
        />
        <div className={styles.scrim} />

        <div className={styles.content}>
          <h1 id="game-title">主播模拟器</h1>
          <p className={styles.slogan}>房间很小，梦想暂时没有上限。</p>
          <PixelButton onClick={onStart}>开始游戏</PixelButton>
        </div>
      </section>
    </GameShell>
  );
}
