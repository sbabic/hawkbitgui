'use client';
import styles from './styles.module.scss';

export default function Button({
    children,
    className,
    color = 'default',
}: {
    children?: React.ReactNode;
    className?: string;
    color?: 'default' | 'outline';
}) {
    const getStyleByColor = (color: string) => {
        switch (color) {
            case 'default':
                return styles.default;
            case 'outline':
                return styles.outline;
            default:
                return styles.default;
        }
    };
    return (
        <button
            className={`${styles.button} ${getStyleByColor(color)} ${className}`}
        >
            {children}
        </button>
    );
}
