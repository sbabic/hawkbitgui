'use client';
import styles from './styles.module.scss';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import IconButton from '@/app/components/icon-button';
import XIcon from '@/app/components/icons/x-icon';

export default function Modal({
    isOpen,
    variant = 'default',
    onClose,
    children,
}: {
    isOpen?: boolean;
    variant?: 'default' | 'unstyled';
    onClose?: () => void;
    children: React.ReactNode;
}) {
    useEffect(() => {
        function handler(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose?.();
        }
        document.addEventListener('keydown', handler);
        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, [onClose]);

    if (!isOpen) return null;

    const getStyleByVariant = (variant: string) => {
        switch (variant) {
            case 'default':
                return styles.default;
            case 'unstyled':
                return styles.unstyled;
            default:
                return styles.default;
        }
    };

    return createPortal(
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={`${styles.modalContent} ${getStyleByVariant(variant)}`} onClick={(e) => e.stopPropagation()}>
                <IconButton className={styles.quitButton} onClick={() => onClose?.()}>
                    <XIcon />
                </IconButton>
                {children}
            </div>
        </div>,
        document.body
    );
}
