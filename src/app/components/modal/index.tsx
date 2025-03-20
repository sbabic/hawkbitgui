'use client';
import './styles.scss';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({
    isOpen,
    onClose,
    children,
}: {
    children: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}) {
    console.log('isOpen', isOpen);
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

    return createPortal(
        <div className={'modalOverlay'} onClick={onClose}>
            <div
                className={'modalContent'}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}
