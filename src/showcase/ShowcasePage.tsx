import deepNightEnding from '../assets/endings/deep-night-companion.png';
import { START_COVER_IMAGE } from '../assets/scenes/registry';
import firstStreamScene from '../assets/scenes/events/first-stream.png';
import { AiWorkflow } from './AiWorkflow';
import { CoreLoop } from './CoreLoop';
import { IterationTimeline } from './IterationTimeline';
import { SectionHeading } from './SectionHeading';
import { productionUrl, repositoryUrl } from './showcaseData';
import styles from './ShowcasePage.module.css';

export function ShowcasePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="showcase-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>AI PRODUCT MANAGER · CASE STUDY</p>
          <h1 id="showcase-title">主播模拟器</h1>
          <p className={styles.heroLead}>
            一个由长期选择塑造人生结果的主播成长模拟 Demo
          </p>
          <p className={styles.heroBody}>
            从 0
            个观众开始，在流量、商业化、粉丝关系、舆论与平台规则之间，走出不同的主播人生。
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href={productionUrl}>
              立即体验 Demo <span aria-hidden="true">↗</span>
            </a>
            <a className={styles.secondaryAction} href={repositoryUrl}>
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          {START_COVER_IMAGE ? (
            <img alt="主播模拟器的夜晚直播间" src={START_COVER_IMAGE} />
          ) : null}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading eyebrow="WHY" title="为什么做这个产品" />
        <div className={styles.whyGrid}>
          <p className={styles.whyLead}>
            我想验证，在 AI Coding 和多 Agent
            协作逐渐成熟之后，一个产品经理能否独立完成从产品定义、机制设计、体验迭代到最终上线的完整闭环。
          </p>
          <p className={styles.whyBody}>
            我选择了自己熟悉的直播场景，把流量、商业化、粉丝关系、平台规则和舆论风险，设计成一套人生模拟系统。
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="CORE LOOP"
          title="你的每一次选择，都会留下痕迹"
        />
        <CoreLoop />
      </section>

      <section className={`${styles.section} ${styles.iterationSection}`}>
        <SectionHeading
          eyebrow="PRODUCT ITERATION"
          title="从选择题到主播人生"
          intro="用三次迭代，让选择从一次计算变成一段会回头影响自己的经历。"
        />
        <div className={styles.iterationLayout}>
          <IterationTimeline />
          <img
            alt="主播模拟器中的直播事件场景"
            className={styles.inlineImage}
            src={firstStreamScene}
          />
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="AI WORKFLOW"
          title="我是怎么和 AI 一起完成它的"
        />
        <AiWorkflow />
      </section>

      <section className={styles.finalCta}>
        <p className={styles.eyebrow}>NOW IT'S YOUR TURN</p>
        <h2>你的主播人生，会走向哪里？</h2>
        <p>主播模拟器现已可以在线体验。</p>
        <img
          alt="主播模拟器的人生结局报告"
          className={styles.endingImage}
          src={deepNightEnding}
        />
        <div className={styles.finalActions}>
          <a className={styles.primaryAction} href={productionUrl}>
            开始体验 <span aria-hidden="true">↗</span>
          </a>
          <a className={styles.githubAction} href={repositoryUrl}>
            查看 GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
