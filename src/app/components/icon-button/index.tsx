import { ReactNode } from 'react';
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
    onClick?: () => void;
}) {
    return (
        <button
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
