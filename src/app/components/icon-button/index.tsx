import { MouseEventHandler, ReactNode } from 'react';
import styles from './styles.module.scss';

export interface IconButtonProps {
  children?: ReactNode;
  className?: string;
  width?: string;
  height?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function IconButton({ children, className, width, height, disabled = false, style, onClick }: IconButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`${styles.iconButton} ${className} ${disabled ? styles.disabled : ''}`}
      disabled={disabled}
      style={{
        width,
        height,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
