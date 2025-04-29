'use client';

import styles from './styles.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    variant?: 'default' | 'outline' | 'ghost' | 'text';
    onClick?: () => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export default function Button({ children, type = 'button', className, variant = 'default', onClick, leftIcon, rightIcon }: ButtonProps) {
    const getStyleByVariant = (variant: string) => {
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
    return (
        <button type={type} className={`${styles.button} ${getStyleByVariant(variant)} ${className}`} onClick={onClick}>
            {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
        </button>
    );
}
