'use client';

import { useTargetsTableStore } from '@/stores/targets-table-store';
import { Metadata } from '@/entities';
import React, { useEffect } from 'react';
import TargetMetadataTable from '../../components/target-metadata-table';
import { useTargetsMetadataTableStore } from '@/stores/targets-metadata-table-store';
import { TargetsService } from '@/services/targets-service';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { useConfirmDialog, useModal } from '@/app/hooks';
import { Modal } from '@/app/components/modal';
import EditTargetMetadataFormContainer from '@/app/x/deployment/containers/edit-target-metadata-form-container';

export default function TargetMetadataTableContainer() {
  const selectedTarget = useTargetsTableStore((state) => state.selectedTarget);
  const setSelectedMetadata = useTargetsMetadataTableStore((state) => state.setSelectedMetadata);
  const fetchMetadata = useTargetsMetadataTableStore((state) => state.fetchMetadata);
  const metadata = useTargetsMetadataTableStore((state) => state.metadata);
  const editMetadataModal = useModal();
  const confirmDialog = useConfirmDialog<Metadata>();

  const handleDeleteClick = (item: Metadata) => {
    confirmDialog.open(item, async () => {
      if (!selectedTarget) return;
      await TargetsService.deleteMetadata(selectedTarget.controllerId, item.key);
      await fetchMetadata(selectedTarget.controllerId);
    });
  };

  const handleEditClick = (metadata: Metadata) => {
    setSelectedMetadata(metadata);
    editMetadataModal.open();
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
      <Modal isOpen={editMetadataModal.isOpen} onClose={editMetadataModal.close}>
        <EditTargetMetadataFormContainer onSubmitSuccess={editMetadataModal.close} />
      </Modal>
    </>
  );
}
