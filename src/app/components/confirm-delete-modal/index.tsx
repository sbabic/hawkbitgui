'use client';

import styles from './styles.module.scss';
import { Modal } from '@/app/components/modal';

import { ActionButtons } from '../action-buttons';

function Message({ children }: { children: React.ReactNode }) {
  return <div className={styles.message}>{children}</div>;
}

export default function ConfirmDeleteModal({
  onConfirm,
  onClose,
  isOpen,
  children,
}: {
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Modal size='sm' isOpen={isOpen} onClose={onClose}>
      <Modal.Header>Confirm Deletion</Modal.Header>
      <Modal.Content>
        {children}
        <ActionButtons>
          <ActionButtons.Primary onClick={onConfirm}>Yes, delete</ActionButtons.Primary>
          <ActionButtons.Secondary onClick={onClose}>Cancel</ActionButtons.Secondary>
        </ActionButtons>
      </Modal.Content>
    </Modal>
  );
}

ConfirmDeleteModal.Message = Message;
