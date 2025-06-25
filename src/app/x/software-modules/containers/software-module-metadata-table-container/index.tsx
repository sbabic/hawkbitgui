'use client';

import { Metadata } from '@/entities';
import React, { useState } from 'react';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { useConfirmDialog, useModal } from '@/app/hooks';
import { Modal } from '@/app/components/modal';
import MetadataTable from '@/app/components/metadata-table';
import MetadataForm from '@/app/components/metadata-form';
import { useSoftwareModulesStore } from '@/stores/software-modules-store';
import { useGetSoftwareModuleMetadata } from '../../hooks/use-get-software-module-metadata';
import { useUpdateSoftwareModuleMetadata } from '../../hooks/use-update-software-module-metadata';
import { useDeleteSoftwareModuleMetadata } from '../../hooks/use-delete-software-module-metadata';

export default function SoftwareModuleMetadataTableContainer() {
  const selectedSoftwareModule = useSoftwareModulesStore((state) => state.selectedSoftwareModule);
  const [selectedMetadata, setSelectedMetadata] = useState<Metadata | undefined>();

  const {
    data: metadata,
    refetch: refetchMetadata,
    isLoading,
  } = useGetSoftwareModuleMetadata(selectedSoftwareModule?.id ?? 0, {
    queryOptions: { enabled: !!selectedSoftwareModule?.id },
  });
  const { updateSoftwareModuleMetadata } = useUpdateSoftwareModuleMetadata();
  const { deleteSoftwareModuleMetadata } = useDeleteSoftwareModuleMetadata();

  const editMetadataModal = useModal();
  const confirmDialog = useConfirmDialog<Metadata>();

  const handleDeleteClick = (item: Metadata) => {
    confirmDialog.open(item, async () => {
      if (!selectedSoftwareModule) {
        return;
      }
      await deleteSoftwareModuleMetadata({ softwareModuleId: selectedSoftwareModule.id, metadataKey: item.key });
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
    if (!selectedSoftwareModule) {
      return;
    }
    await updateSoftwareModuleMetadata({ softwareModuleId: selectedSoftwareModule.id, metadata: data });
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
