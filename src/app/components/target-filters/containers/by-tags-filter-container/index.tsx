'use client';

import { useTargetsFiltersStore } from '@/stores/targets-filters-store';
import { useTargetTagsStore } from '@/stores/targets-tags-store';
import { Tag } from '@/entities';
import { useFilterMultipleSelect } from '@/app/hooks';
import { useEffect } from 'react';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import EditableMultipleSelect from '@/app/components/editable-multiple-select';

export default function ByTagsFilterContainer() {
  const selectedTags = useTargetTagsStore((state) => state.selectedTags);
  const setSelectedTags = useTargetTagsStore((state) => state.setSelectedTags);
  const allTags = useTargetTagsStore((state) => state.allTags);
  const areTagsLoading = useTargetTagsStore((state) => state.isLoading);
  const fetchAllTags = useTargetTagsStore((state) => state.fetchAllTags);

  const filters = useTargetsFiltersStore((state) => state.filters);
  const setFilters = useTargetsFiltersStore((state) => state.setFilters);
  const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);

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

  return <EditableMultipleSelect selectedOptions={selectedTags} options={allTags} isLoading={areTagsLoading} onChange={handleOnChange} />;
}
