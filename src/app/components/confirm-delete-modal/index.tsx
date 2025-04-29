'use client';

import styles from './styles.module.scss';
import { Modal } from '@/app/components/modal';
import Button from '@/app/components/button';

export default function ConfirmDeleteModal({
    message,
    onConfirm,
    onClose,
    isOpen,
}: {
    message: string;
    onClose?: () => void;
    onConfirm?: () => void;
    isOpen: boolean;
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={'fitContent'}>
            <div className={styles.container}>
                <h2 className={styles.title}>Confirm Deletion</h2>
                <p className={styles.message}>{message}</p>
                <div className={styles.actionButtons}>
                    <Button variant={'default'} onClick={onConfirm}>
                        Yes, delete
                    </Button>
                    <Button variant={'outline'} onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
