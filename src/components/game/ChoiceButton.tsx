import styles from './ChoiceButton.module.css';

const INDEX_LETTERS = ['A', 'B', 'C', 'D'];

interface ChoiceButtonProps {
  index: number;
  label: string;
  isImportant?: boolean;
  onClick: () => void;
}

// A single life-decision button. Visually heavier than a plain form option:
// a lettered marker plus a "this is the decision you're about to make" feel.
// Purely presentational — the caller still owns what onClick does.
//
// The button's accessible name is pinned to `label` via aria-label, so the
// decorative index marker never leaks into it.
export function ChoiceButton({
  index,
  label,
  isImportant,
  onClick,
}: ChoiceButtonProps) {
  return (
    <button
      aria-label={label}
      className={`${styles.choice} ${isImportant ? styles.major : ''}`}
      onClick={onClick}
      type="button"
    >
      <span className={styles.index} aria-hidden="true">
        {INDEX_LETTERS[index] ?? index + 1}
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
