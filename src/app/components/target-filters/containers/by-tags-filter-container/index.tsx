'use client';

import { useTargetsFiltersStore } from '@/stores/targets-filters-store';
import { useTargetTagsStore } from '@/stores/targets-tags-store';
import { Tag } from '@/entities';
import { useConfirmDialog, useFilterMultipleSelect, useModal } from '@/app/hooks';
import React, { useEffect, useMemo } from 'react';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import EditableMultipleSelect from '@/app/components/editable-multiple-select';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { TargetTagsService } from '@/services/target-tags-service';
import { Modal } from '@/app/components/modal';
import EditTargetTagFormContainer from '@/app/x/deployment/containers/edit-target-tag-form-container';

export default function ByTagsFilterContainer() {
  const selectedTags = useTargetTagsStore((state) => state.selectedTags);
  const setSelectedTags = useTargetTagsStore((state) => state.setSelectedTags);
  const setSelectedTag = useTargetTagsStore((state) => state.setSelectedTag);
  const allTags = useTargetTagsStore((state) => state.allTags);
  const areTagsLoading = useTargetTagsStore((state) => state.isLoading);
  const fetchAllTags = useTargetTagsStore((state) => state.fetchAllTags);
  const confirmDialog = useConfirmDialog<Tag>();
  const editTagModal = useModal();

  const filters = useTargetsFiltersStore((state) => state.filters);
  const setFilters = useTargetsFiltersStore((state) => state.setFilters);
  const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);

  const options = useMemo(() => {
    return allTags.map((tag) => ({
      ...tag,
      onEdit: async () => {
        setSelectedTag(tag);
        editTagModal.open();
        await fetchAllTags();
        await fetchTargets();
      },
      onDelete: () => {
        confirmDialog.open(tag, async () => {
          await TargetTagsService.deleteTag(tag.id);
          await fetchAllTags();
          await fetchTargets();
        });
      },
    }));
  }, [allTags, confirmDialog, editTagModal, fetchAllTags, fetchTargets, setSelectedTag]);

  const { handleOnChange } = useFilterMultipleSelect<Tag>({
    filterField: 'tag.name',
    allOptions: allTags,
    selectedOptions: selectedTags,
    setSelectedOptions: setSelectedTags,
    getOptionId: (tag) => tag.id,
    getOptionLabel: (tag) => tag.name,
    onFilterChanged: async () => {
      await fetchTargets();
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
