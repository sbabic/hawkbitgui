'use client';
import styles from './styles.module.scss';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import IconButton from '@/app/components/icon-button';
import XIcon from '@/app/components/icons/x-icon';

function ModalHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.modalHeader}>
      <h2>{children}</h2>
    </div>
  );
}

function ModalContent({ children }: { children: React.ReactNode }) {
  return <div className={styles.modalContent}>{children}</div>;
}
export function Modal({
  isOpen,
  variant = 'default',
  size = 'md',
  onClose,
  children,
}: {
  isOpen?: boolean;
  variant?: 'default' | 'unstyled';
  size?: 'md' | 'lg' | 'xl' | 'fitContent';
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

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={`${styles.modalContainer} ${styles[variant]} ${styles[size]}`} onClick={(e) => e.stopPropagation()}>
        <IconButton className={styles.quitButton} onClick={() => onClose?.()}>
          <XIcon />
        </IconButton>
        {children}
      </div>
    </div>,
    document.body
  );
}

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
