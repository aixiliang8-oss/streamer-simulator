import blackRedEnding from '../assets/endings/black-red-edge.png';
import deepNightEnding from '../assets/endings/deep-night-companion.png';
import firstStreamScene from '../assets/scenes/events/first-stream.png';
import growthScene from '../assets/scenes/categories/highlight-happy.png';
import pressureScene from '../assets/scenes/categories/tense-pressure.png';
import styles from './ShowcasePage.module.css';

const gallery = [
  { image: firstStreamScene, label: '从 0 个观众开始', type: 'event' },
  { image: growthScene, label: '一次增长，留下长期痕迹', type: 'growth' },
  { image: pressureScene, label: '在风险里做选择', type: 'risk' },
  { image: deepNightEnding, label: '深夜陪伴主播', type: 'ending' },
  { image: blackRedEnding, label: '黑红边缘主播', type: 'ending' },
] as const;

export function ShowcaseGallery() {
  return (
    <div className={styles.gallery}>
      {gallery.map((item) => (
        <figure className={styles[`gallery${item.type}`]} key={item.label}>
          <img alt={item.label} loading="lazy" src={item.image} />
          <figcaption>{item.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
