'use client';

import React from 'react';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { Modal } from '@/app/components/modal';
import EditableMultipleSelect from '@/app/components/editable-multiple-select';
import { useGetSoftwareModuleTypes } from '@/app/x/software-module-types/hooks/use-get-software-module-types';
import { useConfirmDialog, useFilterMultipleSelect, useModal } from '@/app/hooks';
import { SoftwareModuleType } from '@/entities/software-module-type';
import { useSoftwareModuleFiltersStore } from '@/stores/software-module-filters-store';
import { useDeleteSoftwareModuleType } from '@/app/x/software-module-types/hooks/use-delete-software-module-type';
import EditSoftwareModuleTypeFormContainer from '@/app/x/software-module-types/containers/edit-software-module-type-form-container';

export default function SoftwareModuleTypeFilterContainer() {
  const { data: softwareModuleTypes, isLoading, refetch } = useGetSoftwareModuleTypes();
  const setSelectedType = useSoftwareModuleFiltersStore((state) => state.setSelectedType);
  const selectedTypes = useSoftwareModuleFiltersStore((state) => state.selectedTypes);
  const setSelectedTypes = useSoftwareModuleFiltersStore((state) => state.setSelectedTypes);
  const filters = useSoftwareModuleFiltersStore((state) => state.filters);
  const setFilters = useSoftwareModuleFiltersStore((state) => state.setFilters);

  const { deleteSoftwareModuleType, isPending: isDeletingType } = useDeleteSoftwareModuleType();

  const confirmDialog = useConfirmDialog<SoftwareModuleType>();
  const editTypeModal = useModal();

  const handleEditSoftwareModuleType = (type: SoftwareModuleType) => {
    setSelectedType(type);
    editTypeModal.open();
  };

  const handleDeleteSoftwareModuleType = (type: SoftwareModuleType) => {
    confirmDialog.open(type, async () => {
      await deleteSoftwareModuleType(type.id);
      refetch();
    });
  };

  const { handleOnChange } = useFilterMultipleSelect<SoftwareModuleType>({
    filterField: 'type',
    allOptions: softwareModuleTypes ?? [],
    selectedOptions: selectedTypes,
    setSelectedOptions: setSelectedTypes,
    getOptionId: (type) => type.id,
    getOptionLabel: (type) => type.key,
    onFilterChanged: async () => {},
    setFilters,
    filters,
  });

  return (
    <>
      <EditableMultipleSelect
        selectedOptions={selectedTypes}
        options={softwareModuleTypes ?? []}
        isLoading={isLoading || isDeletingType}
        onChange={handleOnChange}
        onDataEdit={handleEditSoftwareModuleType}
        onDataDelete={handleDeleteSoftwareModuleType}
      />
      {confirmDialog.isOpen && (
        <ConfirmDeleteModal isOpen={confirmDialog.isOpen} onConfirm={confirmDialog.confirm} onClose={confirmDialog.close}>
          <ConfirmDeleteModal.Message>
            Are you sure you want to delete type <span style={{ fontWeight: 'bold' }}>{confirmDialog.data?.name}</span>?
          </ConfirmDeleteModal.Message>
        </ConfirmDeleteModal>
      )}
      {editTypeModal.isOpen && (
        <Modal isOpen={editTypeModal.isOpen} onClose={editTypeModal.close}>
          <Modal.Header>Edit type</Modal.Header>
          <Modal.Content>
            <EditSoftwareModuleTypeFormContainer onSubmitSuccess={editTypeModal.close} onCancel={editTypeModal.close} />
          </Modal.Content>
        </Modal>
      )}
    </>
  );
}
