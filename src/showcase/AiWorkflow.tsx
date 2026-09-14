import { workflow } from './showcaseData';
import styles from './ShowcasePage.module.css';

export function AiWorkflow() {
  return (
    <div className={styles.workflowWrap}>
      <ol className={styles.workflow}>
        {workflow.map((member, index) => (
          <li key={member.role}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{member.role}</h3>
              <p>{member.subtitle}</p>
            </div>
            <ul>
              {member.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className={styles.workflowConclusion}>
        AI 提高了探索、执行与 Review
        的效率，但产品目标、优先级、取舍和最终验收仍然由我完成。
      </p>
    </div>
  );
}
