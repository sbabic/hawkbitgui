'use client';

import { Rollout } from '@/entities/rollout';
import RolloutsTable from '../../components/rollouts-table';
import { useGetRollouts } from '../../hooks/use-get-rollouts';
import { useConfirmDialog } from '@/app/hooks';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { useDeleteRollout } from '../../hooks/use-delete-rollout';

export default function RolloutsTableContainer() {
  const { data: rollouts, refetch } = useGetRollouts();

  const { deleteRollout } = useDeleteRollout();

  const confirmDialog = useConfirmDialog<Rollout>();

  const handleRolloutNameClick = (rollout: Rollout) => {
    console.log('Rollout name clicked:', rollout.name);
  };

  const handlePlayClick = (rollout: Rollout) => {
    console.log('Play clicked for rollout:', rollout.name);
  };

  const handlePinClick = (rollout: Rollout) => {
    console.log('Pin clicked for rollout:', rollout.name);
  };

  const handleDetailsClick = (rollout: Rollout) => {
    console.log('Details clicked for rollout:', rollout.name);
  };

  const handleEditClick = (rollout: Rollout) => {
    console.log('Edit clicked for rollout:', rollout.name);
  };

  const handleCopyClick = (rollout: Rollout) => {
    console.log('Copy clicked for rollout:', rollout.name);
  };

  const handleDeleteClick = (rollout: Rollout) => {
    confirmDialog.open(rollout, async () => {
      await deleteRollout(rollout.id);
      await refetch();
    });
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
      <ConfirmDeleteModal isOpen={confirmDialog.isOpen} onConfirm={confirmDialog.confirm} onClose={confirmDialog.close}>
        <ConfirmDeleteModal.Message>
          Are you sure you want to delete rollout <span style={{ fontWeight: 'bold' }}>{confirmDialog.data?.name}</span>?
        </ConfirmDeleteModal.Message>
      </ConfirmDeleteModal>
    </>
  );
}
