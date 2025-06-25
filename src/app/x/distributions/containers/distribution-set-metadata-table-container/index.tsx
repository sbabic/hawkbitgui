'use client';

import { Metadata } from '@/entities';
import React, { useState } from 'react';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { useConfirmDialog, useModal } from '@/app/hooks';
import { Modal } from '@/app/components/modal';
import { useDistributionsSetsTableStore } from '@/stores/distribution-sets-table-store';
import MetadataTable from '@/app/components/metadata-table';
import MetadataForm from '@/app/components/metadata-form';
import { useGetDistributionSetMetadata } from '../../hooks/use-get-distribution-set-metadata';
import { useUpdateDistributionSetMetadata } from '../../hooks/use-update-distribution-set-metadata';
import { useDeleteDistributionSetMetadata } from '../../hooks/use-delete-distribution-set-metadata';

export default function DistributionSetMetadataTableContainer() {
  const selectedDistribution = useDistributionsSetsTableStore((state) => state.selectedDistribution);
  const [selectedMetadata, setSelectedMetadata] = useState<Metadata | undefined>();

  const {
    data: metadata,
    refetch: refetchMetadata,
    isLoading,
  } = useGetDistributionSetMetadata(selectedDistribution?.id ?? 0, {
    queryOptions: { enabled: !!selectedDistribution?.id },
  });
  const { updateDistributionSetMetadata } = useUpdateDistributionSetMetadata();
  const { deleteDistributionSetMetadata } = useDeleteDistributionSetMetadata();

  const editMetadataModal = useModal();
  const confirmDialog = useConfirmDialog<Metadata>();

  const handleDeleteClick = (item: Metadata) => {
    confirmDialog.open(item, async () => {
      if (!selectedDistribution) {
        return;
      }
      await deleteDistributionSetMetadata({ distributionSetId: selectedDistribution.id, metadataKey: item.key });
      refetchMetadata();
    });
  };

  const handleEditClick = (metadata: Metadata) => {
    setSelectedMetadata(metadata);
    editMetadataModal.open();
  };

  const handleCloseEdit = () => {
    setSelectedMetadata(undefined);
    editMetadataModal.close();
  };

  const handleEditSubmit = async (data: Metadata) => {
    if (!selectedDistribution) {
      return;
    }
    await updateDistributionSetMetadata({ distributionSetId: selectedDistribution.id, metadata: data });
    refetchMetadata();
    handleCloseEdit();
  };

  return (
    <>
      <MetadataTable metadata={metadata ?? []} isLoading={isLoading} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
      <ConfirmDeleteModal isOpen={confirmDialog.isOpen} onConfirm={confirmDialog.confirm} onClose={confirmDialog.close}>
        <ConfirmDeleteModal.Message>
          Are you sure you want to delete metadata <span style={{ fontWeight: 'bold' }}>{confirmDialog.data?.key}</span>?
        </ConfirmDeleteModal.Message>
      </ConfirmDeleteModal>
      <Modal isOpen={editMetadataModal.isOpen} onClose={handleCloseEdit}>
        <MetadataForm mode={'edit'} onSubmit={handleEditSubmit} onCancel={handleCloseEdit} defaultValues={selectedMetadata} />
      </Modal>
    </>
  );
}
