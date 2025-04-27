'use client';
import styles from './styles.module.scss';

export default function Button({
    children,
    className,
    variant = 'default',
    onClick,
    leftIcon,
    rightIcon,
}: {
    children?: React.ReactNode;
    className?: string;
    variant?: 'default' | 'outline' | 'ghost' | 'text';
    onClick?: () => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}) {
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
        <button className={`${styles.button} ${getStyleByVariant(variant)} ${className}`} onClick={onClick}>
            {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
        </button>
    );
}
