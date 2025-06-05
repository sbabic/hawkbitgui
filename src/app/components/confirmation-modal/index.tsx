'use client';

import { Modal } from '@/app/components/modal';

import { ActionButtons } from '../action-buttons';
import { ReactNode } from 'react';

export default function ConfirmationModal({
  title,
  onConfirm,
  onClose,
  isOpen,
  children,
  confirmButtonText = 'Accept',
  cancelButtonText = 'Cancel',
  size = 'sm',
}: {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
  children?: ReactNode;
  confirmButtonText?: string;
  cancelButtonText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fitContent';
}) {
  return (
    <Modal size={size} isOpen={isOpen} onClose={onClose}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        {children}
        <ActionButtons>
          <ActionButtons.Primary onClick={onConfirm}>{confirmButtonText}</ActionButtons.Primary>
          <ActionButtons.Secondary onClick={onClose}>{cancelButtonText}</ActionButtons.Secondary>
        </ActionButtons>
      </Modal.Content>
    </Modal>
  );
}
