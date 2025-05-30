'use client';

import { Metadata } from '@/entities';
import React, { useEffect } from 'react';
import TargetMetadataTable from '../../components/target-metadata-table';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { useConfirmDialog } from '@/app/hooks';
import { useDistributionsTableStore } from '@/stores/distributions-table-store';
import { useDistributionMetadataTableStore } from '@/stores/distribution-metadata-table-store';
import { DistributionSetsService } from '@/services/distribution-sets-service';

export default function DistributionMetadataTableContainer() {
  const selectedDistribution = useDistributionsTableStore((state) => state.selectedDistribution);
  const fetchMetadata = useDistributionMetadataTableStore((state) => state.fetchMetadata);
  const metadata = useDistributionMetadataTableStore((state) => state.metadata);

  const confirmDialog = useConfirmDialog<Metadata>();

  const handleDeleteClick = (item: Metadata) => {
    confirmDialog.open(item, async () => {
      if (!selectedDistribution) return;
      await DistributionSetsService.deleteMetadata(selectedDistribution.id, item.key);
      await fetchMetadata(selectedDistribution.id);
    });
  };

  const handleEditClick = (metadata: Metadata) => {
    console.log(metadata);
  };

  useEffect(() => {
    if (!selectedDistribution) return;
    fetchMetadata(selectedDistribution.id).catch(console.error);
  }, [fetchMetadata, selectedDistribution]);

  return (
    <>
      <TargetMetadataTable metadata={metadata} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
      <ConfirmDeleteModal isOpen={confirmDialog.isOpen} onConfirm={confirmDialog.confirm} onClose={confirmDialog.close}>
        <ConfirmDeleteModal.Message>
          Are you sure you want to delete metadata <span style={{ fontWeight: 'bold' }}>{confirmDialog.data?.key}</span>?
        </ConfirmDeleteModal.Message>
      </ConfirmDeleteModal>
    </>
  );
}
