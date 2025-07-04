'use client';

import DistributionSetsTable from '../../components/distribution-sets-table';
import { Modal } from '@/app/components/modal';
import { useEffect, useState } from 'react';
import DistributionSetInfo from '../../components/distribution-set-info';
import { useDistributionsSetsTableStore } from '@/stores/distribution-sets-table-store';
import { Distribution } from '@/entities';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { useConfirmDialog } from '@/app/hooks';
import { useDeleteDistributionSet } from '../../hooks/use-delete-distribution-set';
import EditDistributionSetFormContainer from '../edit-distribution-set-form-container';
import { useGetPaginatedDistributionSets } from '../../hooks/use-get-paginated-distribution-sets';

export default function DistributionSetsTableContainer() {
  const { data: distributionSetsData, refetch, isLoading } = useGetPaginatedDistributionSets();
  const { distributionSets, totalDistributionSets } = distributionSetsData ?? { distributionSets: [], totalDistributionSets: 0 };

  const visibleColumns = useDistributionsSetsTableStore((state) => state.visibleColumns);

  const page = useDistributionsSetsTableStore((state) => state.page);
  const size = useDistributionsSetsTableStore((state) => state.size);
  const setPage = useDistributionsSetsTableStore((state) => state.setPage);

  const setSelectedDistribution = useDistributionsSetsTableStore((state) => state.setSelectedDistribution);
  const selectedDistribution = useDistributionsSetsTableStore((state) => state.selectedDistribution);

  useEffect(() => {
    if (selectedDistribution) {
      const updatedDistribution = distributionSets?.find((ds) => ds.id === selectedDistribution.id);
      if (updatedDistribution) {
        setSelectedDistribution(updatedDistribution);
      }
    }
  }, [distributionSets, selectedDistribution, setSelectedDistribution]);

  const [isDistributionSetInfoModalOpen, setIsDistributionSetInfoModalOpen] = useState(false);
  const [isEditDistributionSetFormOpen, setIsEditDistributionSetFormOpen] = useState(false);
  const confirmDialog = useConfirmDialog<Distribution>();

  const { deleteDistributionSet } = useDeleteDistributionSet();

  const handleNameClick = (distributionSet: Distribution) => {
    setSelectedDistribution(distributionSet);
    setIsDistributionSetInfoModalOpen(true);
  };

  const handleEditClick = (distributionSet: Distribution) => {
    setSelectedDistribution(distributionSet);
    setIsEditDistributionSetFormOpen(true);
  };

  const handleDeleteClick = (distributionSet: Distribution) => {
    confirmDialog.open(distributionSet, async () => {
      await deleteDistributionSet(distributionSet.id);
      refetch();
    });
  };

  const closeInfoModal = () => {
    setIsDistributionSetInfoModalOpen(false);
    setSelectedDistribution(undefined);
  };

  const closeEditForm = () => {
    setIsEditDistributionSetFormOpen(false);
    setSelectedDistribution(undefined);
  };

  return (
    <>
      <DistributionSetsTable
        distributionSets={distributionSets ?? []}
        isLoading={isLoading}
        visibleColumns={visibleColumns}
        pagination={{
          page,
          size,
          totalItems: totalDistributionSets,
        }}
        onNameClick={handleNameClick}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onPageChange={setPage}
      />
      {isEditDistributionSetFormOpen && selectedDistribution && (
        <Modal isOpen={isEditDistributionSetFormOpen} onClose={closeEditForm}>
          <Modal.Header>Edit distribution set</Modal.Header>
          <Modal.Content>
            <EditDistributionSetFormContainer distributionSet={selectedDistribution} onSubmitSuccess={closeEditForm} onCancel={closeEditForm} />
          </Modal.Content>
        </Modal>
      )}
      <ConfirmDeleteModal isOpen={confirmDialog.isOpen} onConfirm={confirmDialog.confirm} onClose={confirmDialog.close}>
        <ConfirmDeleteModal.Message>
          Are you sure you want to delete rollout <span style={{ fontWeight: 'bold' }}>{confirmDialog.data?.name}</span>?
        </ConfirmDeleteModal.Message>
      </ConfirmDeleteModal>
      <Modal isOpen={isDistributionSetInfoModalOpen} variant='unstyled' size='lg' onClose={closeInfoModal}>
        <DistributionSetInfo />
      </Modal>
    </>
  );
}
