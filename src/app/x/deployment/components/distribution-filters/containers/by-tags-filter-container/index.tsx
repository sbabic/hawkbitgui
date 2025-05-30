'use client';

import { DistributionTag } from '@/entities';
import { useConfirmDialog, useFilterMultipleSelect, useModal } from '@/app/hooks';
import React, { useEffect, useMemo } from 'react';
import EditableMultipleSelect from '@/app/components/editable-multiple-select';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { Modal } from '@/app/components/modal';
import EditTargetTagFormContainer from '@/app/x/deployment/containers/edit-target-tag-form-container';
import { useDistributionTagsStore } from '@/stores/distributions-tags-store';
import { DistributionSetTagsService } from '@/services/distribution-set-tags-service';
import { useDistributionsTableStore } from '@/stores/distributions-table-store';
import { useDistributionsFiltersStore } from '@/stores/distributions-filters-store';

export default function ByTagsFilterContainer() {
  const selectedTags = useDistributionTagsStore((state) => state.selectedTags);
  const setSelectedTags = useDistributionTagsStore((state) => state.setSelectedTags);
  const setSelectedTag = useDistributionTagsStore((state) => state.setSelectedTag);
  const allTags = useDistributionTagsStore((state) => state.allTags);
  const areTagsLoading = useDistributionTagsStore((state) => state.isLoading);
  const fetchAllTags = useDistributionTagsStore((state) => state.fetchAllTags);
  const confirmDialog = useConfirmDialog<DistributionTag>();
  const editTagModal = useModal();

  const filters = useDistributionsFiltersStore((state) => state.filters);
  const setFilters = useDistributionsFiltersStore((state) => state.setFilters);
  const fetchDistributions = useDistributionsTableStore((state) => state.fetchDistributions);

  const options = useMemo(() => {
    return allTags.map((tag) => ({
      ...tag,
      onEdit: async () => {
        setSelectedTag(tag);
        editTagModal.open();
        await fetchAllTags();
        await fetchDistributions();
      },
      onDelete: () => {
        confirmDialog.open(tag, async () => {
          await DistributionSetTagsService.deleteTag(tag.id);
          await fetchAllTags();
          await fetchDistributions();
        });
      },
    }));
  }, [allTags, confirmDialog, editTagModal, fetchAllTags, fetchDistributions, setSelectedTag]);

  const { handleOnChange } = useFilterMultipleSelect<DistributionTag>({
    filterField: 'tag.name',
    allOptions: allTags,
    selectedOptions: selectedTags,
    setSelectedOptions: setSelectedTags,
    getOptionId: (tag) => tag.id,
    getOptionLabel: (tag) => tag.name,
    onFilterChanged: async () => {
      await fetchDistributions();
    },
    setFilters,
    filters,
  });

  useEffect(() => {
    const fetchTags = async () => {
      await fetchAllTags();
    };
    fetchTags();
  }, [fetchAllTags]);

  return (
    <>
      <EditableMultipleSelect selectedOptions={selectedTags} options={options} isLoading={areTagsLoading} onChange={handleOnChange} />
      <ConfirmDeleteModal isOpen={confirmDialog.isOpen} onConfirm={confirmDialog.confirm} onClose={confirmDialog.close}>
        <ConfirmDeleteModal.Message>
          Are you sure you want to delete tag <span style={{ fontWeight: 'bold' }}>{confirmDialog.data?.name}</span>?
        </ConfirmDeleteModal.Message>
      </ConfirmDeleteModal>
      <Modal isOpen={editTagModal.isOpen} onClose={editTagModal.close}>
        <EditTargetTagFormContainer onSubmitSuccess={() => editTagModal.close()} onCancel={editTagModal.close} />
      </Modal>
    </>
  );
}
