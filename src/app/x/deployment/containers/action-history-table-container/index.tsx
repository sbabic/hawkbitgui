'use client';

import React, { useEffect, useState } from 'react';
import ActionHistoryTable from '@/app/x/deployment/components/action-history-table';
import { useTargetActionsTableStore } from '@/stores/target-action-table-store';
import { TargetAction } from '@/entities/target-action';
import { Modal } from '@/app/components/modal';
import { useModal } from '@/app/hooks';
import ActionInfo from '@/app/x/deployment/components/action-info';
import ConfirmationModal from '@/app/components/confirmation-modal';
import { useConfirmDialog } from '@/app/hooks/use-confirm-dialog';
import { TargetsService } from '@/services/targets-service';
import { handleErrorWithToast } from '@/utils/handle-error-with-toast';

export default function ActionHistoryTableContainer() {
  const targetActions = useTargetActionsTableStore((state) => state.actions);
  const isLoading = useTargetActionsTableStore((state) => state.isLoading);
  const isExpanded = useTargetActionsTableStore((state) => state.isExpanded);
  const fetchTargetActions = useTargetActionsTableStore((state) => state.fetchActions);
  const selectedTargetId = useTargetActionsTableStore((state) => state.selectedTargetId);
  const setSelectedAction = useTargetActionsTableStore((state) => state.setSelectedAction);

  const { isOpen, open, close } = useModal();

  const [isCancelling, setIsCancelling] = useState(false);
  const confirmCancelDialog = useConfirmDialog<TargetAction>();
  const confirmForceDialog = useConfirmDialog<TargetAction>();

  const handleActionIdClick = (targetAction: TargetAction) => {
    if (!selectedTargetId) {
      console.warn('No target ID selected. Skipping action history fetch.');
      return;
    }
    setSelectedAction(targetAction);
    open();
  };

  const handleCancelClick = (targetAction: TargetAction) => {
    confirmCancelDialog.open(targetAction, async () => {
      if (!selectedTargetId) return;
      setIsCancelling(true);
      try {
        await TargetsService.cancelAction(selectedTargetId, targetAction.id);
        fetchTargetActions(selectedTargetId);
      } catch (e) {
        handleErrorWithToast(e, 'Failed to cancel action');
      } finally {
        setIsCancelling(false);
      }
    });
  };

  const handleForceClick = (targetAction: TargetAction) => {
    confirmForceDialog.open(targetAction, async () => {
      if (!selectedTargetId) return;
      setIsCancelling(true);
      try {
        await TargetsService.targetForceAction(selectedTargetId, targetAction.id);
        fetchTargetActions(selectedTargetId);
      } catch (e) {
        handleErrorWithToast(e, 'Failed to force action');
      } finally {
        setIsCancelling(false);
      }
    });
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
      <ActionHistoryTable
        targetActions={targetActions}
        expanded={isExpanded}
        isLoading={isLoading}
        onActionIdClick={handleActionIdClick}
        onCancelClick={handleCancelClick}
        onForceClick={handleForceClick}
      />
      <Modal isOpen={isOpen} variant='unstyled' size='lg' onClose={close}>
        <ActionInfo />
      </Modal>
      <ConfirmationModal
        isOpen={confirmCancelDialog.isOpen}
        onClose={confirmCancelDialog.close}
        onConfirm={confirmCancelDialog.confirm}
        title='Cancel Action'
        confirmButtonText={isCancelling ? 'Cancelling...' : 'Yes, Cancel'}
        cancelButtonText='No'
        size='sm'
      >
        <p>Are you sure you want to cancel this action?</p>
      </ConfirmationModal>
      <ConfirmationModal
        isOpen={confirmForceDialog.isOpen}
        onClose={confirmForceDialog.close}
        onConfirm={confirmForceDialog.confirm}
        title='Force Action'
        confirmButtonText={isCancelling ? 'Forcing...' : 'Yes'}
        cancelButtonText='No'
        size='sm'
      >
        <p>Are you sure you want to force?</p>
      </ConfirmationModal>
    </>
  );
}
