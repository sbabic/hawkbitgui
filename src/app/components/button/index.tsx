'use client';

import SpinnerIcon from '../icons/spinner-icon';
import styles from './styles.module.scss';

type Variant = 'default' | 'outline' | 'ghost' | 'text';

type Color = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  variant?: Variant;
  color?: Color;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export default function Button({
  children,
  type = 'button',
  className,
  variant = 'default',
  color = 'primary',
  onClick,
  leftIcon,
  rightIcon,
  isLoading = false,
  disabled = false,
}: ButtonProps) {
  const getStyleByVariant = (variant: Variant) => {
    switch (variant) {
      case 'default':
        return styles.default;
      case 'outline':
        return styles.outline;
      case 'ghost':
        return styles.ghost;
      case 'text':
        return styles.text;
      default:
        return styles.default;
    }
  };

  const getStyleByColor = (color: Color) => {
    switch (color) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'danger':
        return styles.danger;
      default:
        return '';
    }
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      className={`${styles.button} ${getStyleByVariant(variant)} ${getStyleByColor(color)} ${isDisabled ? styles.disabled : ''} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {isLoading && <SpinnerIcon />}
      {!isLoading && (
        <>
          {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
          {children}
          {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
