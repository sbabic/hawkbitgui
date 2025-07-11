'use client';

import React from 'react';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { Modal } from '@/app/components/modal';
import EditableMultipleSelect from '@/app/components/editable-multiple-select';
import { useConfirmDialog, useFilterMultipleSelect, useModal } from '@/app/hooks';
import { useGetDistributionSetTags } from '../../hooks/use-get-distribution-set-tags';
import { useDistributionSetFiltersStore } from '@/stores/distribution-set-filters-store';
import { Tag } from '@/entities';
import { useDeleteDistributionSetTag } from '../../hooks/use-delete-distribution-set-tag';
import EditDistributionSetTagFormContainer from '../edit-distribution-set-tag-form-container';

export default function DistributionSetTagFilterContainer() {
  const { data: distributionSetTags, isLoading, refetch } = useGetDistributionSetTags();
  const setSelectedTag = useDistributionSetFiltersStore((state) => state.setSelectedTag);
  const selectedTags = useDistributionSetFiltersStore((state) => state.selectedTags);
  const setSelectedTags = useDistributionSetFiltersStore((state) => state.setSelectedTags);
  const filters = useDistributionSetFiltersStore((state) => state.filters);
  const setFilters = useDistributionSetFiltersStore((state) => state.setFilters);

  const { deleteDistributionSetTag, isPending: isDeletingTag } = useDeleteDistributionSetTag();

  const confirmDialog = useConfirmDialog<Tag>();
  const editTagModal = useModal();

  const handleEditDistributionSetTag = (tag: Tag) => {
    setSelectedTag(tag);
    editTagModal.open();
  };

  const handleDeleteDistributionSetTag = (tag: Tag) => {
    confirmDialog.open(tag, async () => {
      await deleteDistributionSetTag(tag.id);
      refetch();
    });
  };

  const { handleOnChange } = useFilterMultipleSelect<Tag>({
    filterField: 'tag',
    allOptions: distributionSetTags ?? [],
    selectedOptions: selectedTags,
    setSelectedOptions: setSelectedTags,
    getOptionId: (tag) => tag.id,
    getOptionLabel: (tag) => tag.name,
    onFilterChanged: async () => {},
    setFilters,
    filters,
  });

  return (
    <>
      <EditableMultipleSelect
        selectedOptions={selectedTags}
        options={distributionSetTags ?? []}
        isLoading={isLoading || isDeletingTag}
        onChange={handleOnChange}
        onDataEdit={handleEditDistributionSetTag}
        onDataDelete={handleDeleteDistributionSetTag}
      />
      {confirmDialog.isOpen && (
        <ConfirmDeleteModal isOpen={confirmDialog.isOpen} onConfirm={confirmDialog.confirm} onClose={confirmDialog.close}>
          <ConfirmDeleteModal.Message>
            Are you sure you want to delete tag <span style={{ fontWeight: 'bold' }}>{confirmDialog.data?.name}</span>?
          </ConfirmDeleteModal.Message>
        </ConfirmDeleteModal>
      )}
      {editTagModal.isOpen && (
        <Modal isOpen={editTagModal.isOpen} onClose={editTagModal.close}>
          <Modal.Header>Edit tag</Modal.Header>
          <Modal.Content>
            <EditDistributionSetTagFormContainer onSubmitSuccess={editTagModal.close} onCancel={editTagModal.close} />
          </Modal.Content>
        </Modal>
      )}
    </>
  );
}
