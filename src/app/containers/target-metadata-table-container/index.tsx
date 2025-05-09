'use client';

import { useTargetsTableStore } from '@/stores/targets-table-store';
import { Metadata } from '@/entities';
import React, { useEffect } from 'react';
import TargetMetadataTable from '@/app/components/target-metadata-table';
import { useTargetsMetadataTableStore } from '@/stores/targets-metadata-table-store';
import { TargetsService } from '@/services/targets-service';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { useConfirmDialog } from '@/app/hooks';

export default function TargetMetadataTableContainer() {
  const selectedTarget = useTargetsTableStore((state) => state.selectedTarget);
  const fetchMetadata = useTargetsMetadataTableStore((state) => state.fetchMetadata);
  const metadata = useTargetsMetadataTableStore((state) => state.metadata);

  const confirmDialog = useConfirmDialog<Metadata>();

  const handleDeleteClick = (item: Metadata) => {
    confirmDialog.open(item, async () => {
      if (!selectedTarget) return;
      await TargetsService.deleteMetadata(selectedTarget.controllerId, item.key);
      await fetchMetadata(selectedTarget.controllerId);
    });
  };

  const handleEditClick = (metadata: Metadata) => {
    console.log(metadata);
  };

  useEffect(() => {
    if (!selectedTarget) return;
    fetchMetadata(selectedTarget.controllerId).catch(console.error);
  }, [fetchMetadata, selectedTarget]);

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
