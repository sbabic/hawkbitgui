import { MouseEventHandler, ReactNode } from 'react';
import styles from './styles.module.scss';

export default function IconButton({
  children,
  className,
  width,
  height,
  disabled = false,
  onClick,
}: {
  children?: ReactNode;
  className?: string;
  width?: string;
  height?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`${styles.iconButton} ${className} ${disabled ? styles.disabled : ''}`}
      disabled={disabled}
      style={{
        width,
        height,
      }}
    >
      {children}
    </button>
  );
}
