'use client';

import React, { useEffect, useMemo } from 'react';
import MultipleSelect from '@/app/components/multiple-select';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { Modal } from '@/app/components/modal';
import { useTargetsFiltersStore } from '@/stores/targets-filters-store';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { useTargetTypesStore } from '@/stores/targets-types-store';
import { useConfirmDialog, useFilterMultipleSelect, useModal } from '@/app/hooks';
import { TargetType } from '@/entities';
import { TargetsTypesService } from '@/services/targets-types-service';
import EditTargetTypeFormContainer from '@/app/x/deployment/containers/edit-target-type-form-container';
import EditableMultipleSelect from '@/app/components/editable-multiple-select';

export default function ByTypeFilterContainer() {
  const selectedTypes = useTargetTypesStore((state) => state.selectedTypes);
  const setSelectedTypes = useTargetTypesStore((state) => state.setSelectedTypes);
  const setSelectedType = useTargetTypesStore((state) => state.setSelectedType);
  const allTypes = useTargetTypesStore((state) => state.allTypes);
  const areTypesLoading = useTargetTypesStore((state) => state.isLoading);
  const fetchAllTypes = useTargetTypesStore((state) => state.fetchAllTypes);

  const filters = useTargetsFiltersStore((state) => state.filters);
  const setFilters = useTargetsFiltersStore((state) => state.setFilters);

  const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);

  const confirmDialog = useConfirmDialog<TargetType>();
  const editTypeModal = useModal();

  useEffect(() => {
    const fetchTypes = async () => {
      await fetchAllTypes();
    };
    fetchTypes();
  }, [fetchAllTypes]);

  const options = useMemo(() => {
    return allTypes.map((type) => ({
      ...type,
      onEdit: async () => {
        setSelectedType(type);
        editTypeModal.open();
        await fetchAllTypes();
        await fetchTargets();
      },
      onDelete: () => {
        confirmDialog.open(type, async () => {
          await TargetsTypesService.deleteType(type.id);
          await fetchAllTypes();
          await fetchTargets();
        });
      },
    }));
  }, [allTypes, confirmDialog, editTypeModal, fetchAllTypes, fetchTargets, setSelectedType]);

  const { handleOnChange } = useFilterMultipleSelect<TargetType>({
    filterField: 'targettype.name',
    allOptions: allTypes,
    selectedOptions: selectedTypes,
    setSelectedOptions: setSelectedTypes,
    getOptionId: (type) => type.id,
    getOptionLabel: (type) => type.name,
    onFilterChanged: async () => {
      await fetchTargets();
    },
    setFilters,
    filters,
  });

  return (
    <>
      <EditableMultipleSelect selectedOptions={selectedTypes} options={options} isLoading={areTypesLoading} onChange={handleOnChange} />
      <ConfirmDeleteModal isOpen={confirmDialog.isOpen} onConfirm={confirmDialog.confirm} onClose={confirmDialog.close}>
        <ConfirmDeleteModal.Message>
          Are you sure you want to delete type <span style={{ fontWeight: 'bold' }}>{confirmDialog.data?.name}</span>?
        </ConfirmDeleteModal.Message>
      </ConfirmDeleteModal>
      <Modal isOpen={editTypeModal.isOpen} onClose={editTypeModal.close}>
        <EditTargetTypeFormContainer onSubmitSuccess={() => editTypeModal.close()} onCancel={editTypeModal.close} />
      </Modal>
    </>
  );
}
