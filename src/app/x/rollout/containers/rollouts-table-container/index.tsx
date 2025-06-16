'use client';

import { Rollout, RolloutStatus } from '@/entities/rollout';
import RolloutsTable from '../../components/rollouts-table';
import { useGetRollouts } from '../../hooks/use-get-rollouts';
import { useConfirmDialog } from '@/app/hooks';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { useDeleteRollout } from '../../hooks/use-delete-rollout';
import { useRolloutsPageStore } from '@/stores/rollouts-page-store';
import { Modal } from '@/app/components/modal';
import { useState } from 'react';
import EditRolloutFormContainer from '../edit-rollout-form-container';
import CopyRolloutFormContainer from '../copy-rollout-form-container';
import { useStartRollout } from '../../hooks/use-start-rollout';
import { Query } from '@tanstack/react-query';
import { ApiError } from '@/types/hawkbit-api/error';

export default function RolloutsTableContainer() {
  const { data: rollouts, refetch } = useGetRollouts({
    queryOptions: {
      refetchInterval: (query: Query<Rollout[], ApiError>) => {
        const currentQueryData = query.state.data;
        if (
          currentQueryData?.some(
            (rollout) =>
              rollout.status === RolloutStatus.running ||
              rollout.status === RolloutStatus.creating ||
              rollout.status === RolloutStatus.starting ||
              rollout.status === RolloutStatus.deleting ||
              rollout.status === RolloutStatus.stopping
          )
        ) {
          return 5000; // Poll every 5 seconds
        }
        return false;
      },
    },
  });
  const selectedRollout = useRolloutsPageStore((state) => state.selectedRollout);
  const setSelectedRollout = useRolloutsPageStore((state) => state.setSelectedRollout);
  const setTableType = useRolloutsPageStore((state) => state.setTableType);
  const [isEditRolloutFormOpen, setIsEditRolloutFormOpen] = useState(false);
  const [isCopyRolloutFormOpen, setIsCopyRolloutFormOpen] = useState(false);

  const { deleteRollout } = useDeleteRollout();
  const { startRollout } = useStartRollout();

  const confirmDialog = useConfirmDialog<Rollout>();

  const handleRolloutNameClick = (rollout: Rollout) => {
    setTableType({ tableType: 'deploy-groups', selectedRollout: rollout });
  };

  const handlePlayClick = async (rollout: Rollout) => {
    await startRollout(rollout.id);
    refetch();
  };

  const handlePinClick = (rollout: Rollout) => {
    console.log('Pin clicked for rollout:', rollout.name);
  };

  const handleDetailsClick = (rollout: Rollout) => {
    console.log('Details clicked for rollout:', rollout.name);
  };

  const handleEditClick = (rollout: Rollout) => {
    setSelectedRollout(rollout);
    setIsEditRolloutFormOpen(true);
  };

  const handleCopyClick = (rollout: Rollout) => {
    setSelectedRollout(rollout);
    setIsCopyRolloutFormOpen(true);
  };

  const handleDeleteClick = (rollout: Rollout) => {
    confirmDialog.open(rollout, async () => {
      await deleteRollout(rollout.id);
      refetch();
    });
  };

  const closeEditForm = () => {
    setIsEditRolloutFormOpen(false);
    setSelectedRollout(undefined);
  };

  const closeCopyForm = () => {
    setIsCopyRolloutFormOpen(false);
    setSelectedRollout(undefined);
  };

  const actions = {
    onRolloutNameClick: handleRolloutNameClick,
    onPlayClick: handlePlayClick,
    onPinClick: handlePinClick,
    onDetailsClick: handleDetailsClick,
    onEditClick: handleEditClick,
    onCopyClick: handleCopyClick,
    onDeleteClick: handleDeleteClick,
  };

  return (
    <>
      <RolloutsTable rollouts={rollouts ?? []} {...actions} />
      {isEditRolloutFormOpen && (
        <Modal size='xl' isOpen={isEditRolloutFormOpen} onClose={closeEditForm}>
          <Modal.Header>Edit rollout</Modal.Header>
          <Modal.Content>
            <div style={{ maxHeight: '82vh', overflow: 'auto' }}>
              <EditRolloutFormContainer onSubmitSuccess={closeEditForm} onCancel={closeEditForm} />
            </div>
          </Modal.Content>
        </Modal>
      )}
      {isCopyRolloutFormOpen && selectedRollout && (
        <Modal size='xl' isOpen={isCopyRolloutFormOpen} onClose={closeCopyForm}>
          <Modal.Header>Copy rollout</Modal.Header>
          <Modal.Content>
            <div style={{ maxHeight: '82vh', overflow: 'auto' }}>
              <CopyRolloutFormContainer rollout={selectedRollout} onSubmitSuccess={closeCopyForm} onCancel={closeCopyForm} />
            </div>
          </Modal.Content>
        </Modal>
      )}
      <ConfirmDeleteModal isOpen={confirmDialog.isOpen} onConfirm={confirmDialog.confirm} onClose={confirmDialog.close}>
        <ConfirmDeleteModal.Message>
          Are you sure you want to delete rollout <span style={{ fontWeight: 'bold' }}>{confirmDialog.data?.name}</span>?
        </ConfirmDeleteModal.Message>
      </ConfirmDeleteModal>
    </>
  );
}
