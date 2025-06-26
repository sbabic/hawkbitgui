'use client';

import { useTargetsFiltersStore } from '@/stores/targets-filters-store';
import { useFilterMultipleSelect } from '@/app/hooks';
import React, { useEffect, useMemo } from 'react';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { useTargetsCustomsFiltersStore } from '@/stores/targets-custom-filters-store';
import { TargetFilter } from '@/entities/target-filter';
import MultipleSelect from '@/app/components/multiple-select';

export default function ByCustomFilterContainer() {
  const selectedFilters = useTargetsCustomsFiltersStore((state) => state.selectedFilters);
  const setSelectedFilters = useTargetsCustomsFiltersStore((state) => state.setSelectedFilters);
  const allFilters = useTargetsCustomsFiltersStore((state) => state.allFilters);
  const areFiltersLoading = useTargetsCustomsFiltersStore((state) => state.isLoading);
  const fetchAllFilters = useTargetsCustomsFiltersStore((state) => state.fetchAllFilters);

  const filters = useTargetsFiltersStore((state) => state.filters);
  const setFilters = useTargetsFiltersStore((state) => state.setFilters);
  const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);

  const options = useMemo(() => {
    return allFilters.map((filter) => ({
      ...filter,
    }));
  }, [allFilters]);

  const { handleOnChange } = useFilterMultipleSelect<TargetFilter>({
    filterField: '',
    allOptions: allFilters,
    selectedOptions: selectedFilters,
    setSelectedOptions: setSelectedFilters,
    getOptionId: (filter) => filter.id,
    getOptionLabel: (filter) => filter.query,
    onFilterChanged: async () => {
      await fetchTargets();
    },
    setFilters,
    filters,
  });

  useEffect(() => {
    fetchAllFilters();
  }, [fetchAllFilters]);

  return <MultipleSelect selectedOptions={selectedFilters} options={options} isLoading={areFiltersLoading} onChange={handleOnChange} />;
}
