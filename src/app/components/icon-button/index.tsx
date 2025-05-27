import { MouseEventHandler, ReactNode } from 'react';
import styles from './styles.module.scss';

export default function IconButton({
  children,
  className,
  width,
  height,
  onClick,
}: {
  children?: ReactNode;
  className?: string;
  width?: string;
  height?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`${styles.iconButton} ${className}`}
      style={{
        width,
        height,
      }}
    >
      {children}
    </button>
  );
}
