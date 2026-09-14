import { START_COVER_IMAGE } from '../assets/scenes/registry';
import { endings } from '../game/content/endings';
import { events } from '../game/content/events';
import { AiWorkflow } from './AiWorkflow';
import { CoreLoop } from './CoreLoop';
import { IterationTimeline } from './IterationTimeline';
import { SectionHeading } from './SectionHeading';
import { ShowcaseGallery } from './ShowcaseGallery';
import { designPrinciples, productionUrl, repositoryUrl } from './showcaseData';
import styles from './ShowcasePage.module.css';

const gameFacts = [
  `${events.length} 个剧情事件`,
  `${endings.length} 种人生结局`,
  '完整可玩的 Web Demo',
] as const;

export function ShowcasePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="showcase-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>AI PRODUCT MANAGER · CASE STUDY</p>
          <p className={styles.gameName}>STREAMER SIMULATOR</p>
          <h1 id="showcase-title">《主播模拟器》</h1>
          <p className={styles.heroLead}>
            一个由长期选择塑造人生结果的主播成长模拟 Demo
          </p>
          <p className={styles.heroBody}>
            从 0
            个观众开始，在流量、商业化、舆论与平台规则之间，走出属于自己的主播人生。
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href={productionUrl}>
              立即体验 Demo <span aria-hidden="true">↗</span>
            </a>
            <a className={styles.secondaryAction} href="#case-study">
              查看设计过程 <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          {START_COVER_IMAGE ? (
            <img alt="主播模拟器的夜晚直播间" src={START_COVER_IMAGE} />
          ) : null}
          <div className={styles.heroCaption}>
            <span className={styles.liveDot} /> LIVE FROM A SMALL ROOM
          </div>
        </div>
      </section>

      <section className={styles.section} id="case-study">
        <SectionHeading eyebrow="WHY" title="为什么做《主播模拟器》？" />
        <div className={styles.whyGrid}>
          <p className={styles.question}>我想验证一个问题：</p>
          <p className={styles.whyLead}>
            当 AI Coding 和多 Agent
            协作逐渐成熟之后，一个产品经理能否独立完成从产品定义、机制设计、体验迭代到最终上线的完整闭环？
          </p>
          <div className={styles.whyBody}>
            <p>
              我选择了自己熟悉的直播场景。主播成长不是一道简单的“正确选择题”：流量、商业化、粉丝关系、平台规则、舆论风险与个人状态之间，往往存在长期博弈。
            </p>
            <p>于是，我把这些选择设计成了一套「主播人生模拟系统」。</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.loopSection}`}>
        <SectionHeading
          eyebrow="CORE LOOP"
          title="你的每一次选择，都会留下痕迹"
          intro="数值是过程，人生才是结果。"
        />
        <CoreLoop />
      </section>

      <section className={`${styles.section} ${styles.iterationSection}`}>
        <SectionHeading
          eyebrow="PRODUCT ITERATION"
          title="从“选择题”到“主播人生”"
          intro="每一轮都从一个真实体验问题开始：问题是什么、为什么改、改完后玩家感受到了什么。"
        />
        <IterationTimeline />
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="DESIGN PRINCIPLES"
          title="把人生感放回机制里"
        />
        <div className={styles.principles}>
          {designPrinciples.map((principle) => (
            <article key={principle.index}>
              <span>{principle.index}</span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.workflowSection}`}>
        <SectionHeading
          eyebrow="AI WORKFLOW"
          title="我如何和 AI 一起完成这个项目"
          intro="不是工具清单，而是一套由产品目标驱动的 Multi-Agent 协作流程。"
        />
        <AiWorkflow />
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="FINAL PRODUCT"
          title="最终，它真的成为了一款可以玩的游戏"
          intro="从深夜的第一场直播，到一段真正属于玩家的人生报告。"
        />
        <ShowcaseGallery />
        <ul className={styles.factList} aria-label="产品成果">
          {gameFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </section>

      <section className={styles.finalCta}>
        <p className={styles.eyebrow}>NOW IT'S YOUR TURN</p>
        <h2>你的主播人生，会走向哪里？</h2>
        <p>无需登录，打开即可体验。</p>
        <div className={styles.finalActions}>
          <a className={styles.primaryAction} href={productionUrl}>
            进入《主播模拟器》 <span aria-hidden="true">↗</span>
          </a>
          <a className={styles.githubAction} href={repositoryUrl}>
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
