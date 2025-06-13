'use client';

import TargetTable from '../../components/target-table';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { Target } from '@/entities';
import React, { useState } from 'react';
import { TargetsService } from '@/services/targets-service';
import TargetInfo from '@/app/components/target-info-modal';
import { Modal } from '@/app/components/modal';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { useConfirmDialog, useTargetsPolling } from '@/app/hooks';
import EditTargetFormContainer from '../edit-target-form-container';
import { useTargetActionsTableStore } from '@/stores/target-action-table-store';

export default function TargetTableContainer() {
  const filteredTargets = useTargetsTableStore((state) => state.filteredTargets);
  const isLoading = useTargetsTableStore((state) => state.isLoading);
  const isExpanded = useTargetsTableStore((state) => state.isExpanded);
  const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);
  const targetsTableStore = useTargetsTableStore();
  const setTargetActionTargetId = useTargetActionsTableStore((state) => state.setSelectedTargetId);

  const [isTargetInfoModalOpen, setIsTargetInfoModalOpen] = useState(false);
  const [isEditTargetModalOpen, setIsEditTargetModalOpen] = useState(false);

  const confirmDialog = useConfirmDialog<Target>();

  const handleDeleteClick = (target: Target) => {
    confirmDialog.open(target, async () => {
      await TargetsService.deleteTarget(target.controllerId);
      await fetchTargets();
      targetsTableStore.resetSelectedTarget();
    });
  };

  const handleEditClick = (target: Target) => {
    targetsTableStore.setSelectedTarget(target);
    setIsEditTargetModalOpen(true);
  };

  const handleOnRowClick = (target: Target) => {
    setTargetActionTargetId(target.controllerId);
  };

  useTargetsPolling();

  return (
    <>
      <TargetTable
        targets={filteredTargets.map((target) => ({
          ...target,
          status: 'Error',
        }))}
        expanded={isExpanded}
        onTargetNameClick={(target) => {
          targetsTableStore.setSelectedTarget(target);
          setIsTargetInfoModalOpen(true);
        }}
        onDeleteClick={handleDeleteClick}
        onEditClick={handleEditClick}
        onRowClick={handleOnRowClick}
        isLoading={isLoading}
      />
      <Modal isOpen={isTargetInfoModalOpen} variant='unstyled' onClose={() => setIsTargetInfoModalOpen(false)} size={'fitContent'}>
        <TargetInfo />
      </Modal>
      <Modal isOpen={isEditTargetModalOpen} onClose={() => setIsEditTargetModalOpen(false)} size={'fitContent'}>
        <EditTargetFormContainer onCancel={() => setIsEditTargetModalOpen(false)} onSubmitSuccess={() => setIsEditTargetModalOpen(false)} />
      </Modal>
      <ConfirmDeleteModal isOpen={confirmDialog.isOpen} onConfirm={confirmDialog.confirm} onClose={confirmDialog.close}>
        <ConfirmDeleteModal.Message>
          Are you sure you want to delete target <span style={{ fontWeight: 'bold' }}>{confirmDialog.data?.name}</span>?
        </ConfirmDeleteModal.Message>
      </ConfirmDeleteModal>
    </>
  );
}
