'use client';

import React, { useEffect } from 'react';
import ActionHistoryTable from '@/app/x/deployment/components/action-history-table';
import { useTargetActionsTableStore } from '@/stores/target-action-table-store';
import { TargetAction } from '@/entities/target-action';
import { Modal } from '@/app/components/modal';
import { useModal } from '@/app/hooks';
import ActionInfo from '@/app/x/deployment/components/action-info';

export default function ActionHistoryTableContainer() {
  const targetActions = useTargetActionsTableStore((state) => state.actions);
  const isLoading = useTargetActionsTableStore((state) => state.isLoading);
  const isExpanded = useTargetActionsTableStore((state) => state.isExpanded);
  const fetchTargetActions = useTargetActionsTableStore((state) => state.fetchActions);
  const selectedTargetId = useTargetActionsTableStore((state) => state.selectedTargetId);
  const setSelectedAction = useTargetActionsTableStore((state) => state.setSelectedAction);

  const { isOpen, open, close } = useModal();

  const handleActionIdClick = (targetAction: TargetAction) => {
    if (!selectedTargetId) {
      console.warn('No target ID selected. Skipping action history fetch.');
      return;
    }
    setSelectedAction(targetAction);
    open();
  };

  useEffect(() => {
    if (!selectedTargetId) {
      console.warn('No target ID selected. Skipping action history fetch.');
      return;
    }
    fetchTargetActions(selectedTargetId).catch(console.error);
  }, [fetchTargetActions, selectedTargetId]);

  return (
    <>
      <ActionHistoryTable targetActions={targetActions} expanded={isExpanded} isLoading={isLoading} onActionIdClick={handleActionIdClick} />
      <Modal isOpen={isOpen} variant='unstyled' size='lg' onClose={close}>
        <ActionInfo />
      </Modal>
    </>
  );
}
