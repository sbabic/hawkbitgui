'use client';

import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import TargetFiltersTable from '../../components/target-filters-table';
import { useDeleteTargetFilter } from '../../hooks/use-delete-target-filter';
import { useConfirmDialog } from '@/app/hooks';
import { TargetFilter } from '@/entities/target-filter';
import { useTargetFiltersPageStore } from '@/stores/target-filters-page-store';
import { useState } from 'react';
import { Modal } from '@/app/components/modal';
import AutoAssignDistributionFormContainer from '../auto-assign-distribution-form-container';
import { useGetPaginatedTargetFilters } from '../../hooks/use-get-paginated-target-filters';
import { useTargetFiltersTableStore } from '@/stores/target-filters-table-store';

export default function TargetFiltersTableContainer() {
  const { data: targetFiltersData, refetch, isLoading } = useGetPaginatedTargetFilters();
  const { targetFilters, totalTargetFilters } = targetFiltersData ?? { targetFilters: [], totalTargetFilters: 0 };

  const page = useTargetFiltersTableStore((state) => state.page);
  const size = useTargetFiltersTableStore((state) => state.size);
  const visibleColumns = useTargetFiltersTableStore((state) => state.visibleColumns);
  const setPage = useTargetFiltersTableStore((state) => state.setPage);

  const setSelectedTargetFilter = useTargetFiltersPageStore((state) => state.setSelectedTargetFilter);
  const setAutoAssign = useTargetFiltersPageStore((state) => state.setAutoAssign);

  const confirmDialog = useConfirmDialog<TargetFilter>();
  const [autoAssignDistributionModal, setAutoAssignDistributionModal] = useState(false);

  const { deleteTargetFilter } = useDeleteTargetFilter();

  const handleDelete = (targetFilter: TargetFilter) => {
    confirmDialog.open(targetFilter, async () => {
      await deleteTargetFilter(targetFilter.id);
      await refetch();
    });
  };

  const openAutoAssignDistribution = (targetFilter: TargetFilter) => {
    setAutoAssign({
      targetFilterId: targetFilter.id,
      distributionSetId: targetFilter.autoAssignDistributionSet ?? undefined,
      actionType: targetFilter.autoAssignActionType ?? undefined,
    });
    setAutoAssignDistributionModal(true);
  };

  const closeAutoAssignDistributionModal = () => {
    setAutoAssign(undefined);
    setAutoAssignDistributionModal(false);
    refetch();
  };

  return (
    <>
      <TargetFiltersTable
        modules={targetFilters ?? []}
        isLoading={isLoading}
        visibleColumns={visibleColumns}
        pagination={{
          page,
          size,
          totalItems: totalTargetFilters,
        }}
        onNameClick={setSelectedTargetFilter}
        onDelete={handleDelete}
        onAutoAssignDistributionClick={openAutoAssignDistribution}
        onPageChange={setPage}
      />
      <ConfirmDeleteModal isOpen={confirmDialog.isOpen} onConfirm={confirmDialog.confirm} onClose={confirmDialog.close}>
        <ConfirmDeleteModal.Message>
          Are you sure you want to delete target filter <span style={{ fontWeight: 'bold' }}>{confirmDialog.data?.name}</span>?
        </ConfirmDeleteModal.Message>
      </ConfirmDeleteModal>
      <Modal isOpen={autoAssignDistributionModal} onClose={closeAutoAssignDistributionModal}>
        <Modal.Header>Select auto assignment distribution set</Modal.Header>
        <Modal.Content>
          <AutoAssignDistributionFormContainer onSubmitSuccess={closeAutoAssignDistributionModal} onCancel={closeAutoAssignDistributionModal} />
        </Modal.Content>
      </Modal>
    </>
  );
}
