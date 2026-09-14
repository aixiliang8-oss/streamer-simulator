import type { ButtonHTMLAttributes } from 'react';

import styles from './PixelButton.module.css';

type PixelButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function PixelButton({ className = '', ...props }: PixelButtonProps) {
  return (
    <button
      className={`${styles.button} ${className}`}
      type="button"
      {...props}
    />
  );
}
