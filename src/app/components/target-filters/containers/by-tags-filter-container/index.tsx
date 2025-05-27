'use client';

import { useTargetsFiltersStore } from '@/stores/targets-filters-store';
import { useTargetTagsStore } from '@/stores/targets-tags-store';
import { Tag } from '@/entities';
import { useConfirmDialog, useFilterMultipleSelect } from '@/app/hooks';
import React, { useEffect, useMemo } from 'react';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import EditableMultipleSelect from '@/app/components/editable-multiple-select';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { TargetTagsService } from '@/services/target-tags-service';

export default function ByTagsFilterContainer() {
  const selectedTags = useTargetTagsStore((state) => state.selectedTags);
  const setSelectedTags = useTargetTagsStore((state) => state.setSelectedTags);
  const allTags = useTargetTagsStore((state) => state.allTags);
  const areTagsLoading = useTargetTagsStore((state) => state.isLoading);
  const fetchAllTags = useTargetTagsStore((state) => state.fetchAllTags);
  const confirmDialog = useConfirmDialog<Tag>();

  const filters = useTargetsFiltersStore((state) => state.filters);
  const setFilters = useTargetsFiltersStore((state) => state.setFilters);
  const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);

  const options = useMemo(() => {
    return allTags.map((tag) => ({
      ...tag,
      onEdit: () => {
        // Handle edit action for the tag
        console.log(`Edit tag: ${tag.name}`);
      },
      onDelete: () => {
        confirmDialog.open(tag, async () => {
          await TargetTagsService.deleteTag(tag.id);
          await fetchAllTags();
          await fetchTargets();
        });
      },
    }));
  }, [allTags]);

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
    </>
  );
}
