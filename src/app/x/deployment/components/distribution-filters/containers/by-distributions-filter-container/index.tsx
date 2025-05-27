'use client';

import MultipleSelect from '@/app/components/multiple-select';
import { useTargetsFiltersStore } from '@/stores/targets-filters-store';
import { useTargetTagsStore } from '@/stores/targets-tags-store';
import { DistributionTag } from '@/entities';
import { useFilterMultipleSelect } from '@/app/hooks';
import { useDistributionsFiltersStore } from '@/stores/distributions-filters-store';
import { useDistributionsTableStore } from '@/stores/distributions-table-store';
import { useEffect } from 'react';

export default function ByDistributionsFilterContainer() {
  const selectedTags = useTargetTagsStore((state) => state.selectedTags);
  const setSelectedTags = useTargetTagsStore((state) => state.setSelectedTags);
  const allTags = useTargetTagsStore((state) => state.allTags);
  const areTagsLoading = useTargetTagsStore((state) => state.isLoading);
  const fetchAllTags = useTargetTagsStore((state) => state.fetchAllTags);

  const filters = useTargetsFiltersStore((state) => state.filters);
  const setFilters = useDistributionsFiltersStore((state) => state.setFilters);

  const fetchDistributions = useDistributionsTableStore((state) => state.fetchDistributions);

  useEffect(() => {
    const fetchTags = async () => {
      await fetchAllTags();
    };
    fetchTags();
  }, [fetchAllTags]);

  const { handleOnChange } = useFilterMultipleSelect<DistributionTag>({
    filterField: 'tag.name',
    allOptions: [],
    selectedOptions: selectedTags,
    setSelectedOptions: setSelectedTags,
    getOptionId: (tag) => tag.id,
    getOptionLabel: (tag) => tag.name,
    setFilters,
    filters,
    onFilterChanged: async () => {
      await fetchDistributions();
    },
  });

  return <MultipleSelect selectedOptions={selectedTags} options={allTags} isLoading={areTagsLoading} onChange={handleOnChange} />;
}
