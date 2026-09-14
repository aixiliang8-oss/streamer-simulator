import {
  CATEGORY_SCENE_IMAGES,
  CHARACTER_PORTRAIT_IMAGES,
  EVENT_SCENE_IMAGES,
} from '../../assets/scenes/registry';
import type { CharacterId, EventId } from '../../game/model/types';
import { getEventVisual } from './eventVisuals';
import styles from './SceneImage.module.css';

interface SceneImageProps {
  eventId?: EventId | null;
  category?: string | null;
  characterId?: CharacterId | null;
}

// A dedicated, unobstructed block for the scene illustration — no text or
// controls ever sit on top of it, so the artwork stays fully visible. Falls
// back to a mood-tinted gradient with a watermark icon until an illustration
// is registered for this event/category (see assets/scenes/registry.ts).
export function SceneImage({
  eventId,
  category,
  characterId,
}: SceneImageProps) {
  const visual = category ? getEventVisual(category) : null;
  const mood = visual?.mood ?? 'daily';
  const image =
    (eventId && EVENT_SCENE_IMAGES[eventId]) ||
    (category && CATEGORY_SCENE_IMAGES[category]) ||
    undefined;
  const portrait = characterId
    ? CHARACTER_PORTRAIT_IMAGES[characterId]
    : undefined;

  return (
    <div className={styles.frame} data-mood={mood}>
      <div
        className={styles.art}
        style={image ? { backgroundImage: `url(${image})` } : undefined}
      >
        {!image ? (
          <span aria-hidden="true" className={styles.placeholderIcon}>
            {visual?.icon ?? '📺'}
          </span>
        ) : null}
        {portrait ? (
          <img alt="" className={styles.portrait} src={portrait} />
        ) : null}
      </div>
    </div>
  );
}
