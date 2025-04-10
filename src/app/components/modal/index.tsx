'use client';
import './styles.scss';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import IconButton from '@/app/components/icon-button';
import XIcon from '@/app/components/icons/x-icon';

export default function Modal({ isOpen, onClose, children }: { children: React.ReactNode; isOpen?: boolean; onClose?: () => void }) {
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
            <div className={'modalContent'} onClick={(e) => e.stopPropagation()}>
                <IconButton className={'quitButton'} onClick={() => onClose?.()}>
                    <XIcon />
                </IconButton>
                {children}
            </div>
        </div>,
        document.body
    );
}
