'use client';

import MultipleSelect from '@/app/components/multiple-select';
import { useTargetsFiltersStore } from '@/stores/targets-filters-store';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { useTargetTypesStore } from '@/stores/targets-types-store';
import { TargetType } from '@/entities';
import { useFilterMultipleSelect } from '@/app/hooks';
import { useEffect } from 'react';

export default function ByTypeFilterContainer() {
  const selectedTypes = useTargetTypesStore((state) => state.selectedTypes);
  const setSelectedTypes = useTargetTypesStore((state) => state.setSelectedTypes);
  const allTypes = useTargetTypesStore((state) => state.allTypes);
  const areTypesLoading = useTargetTypesStore((state) => state.isLoading);
  const fetchAllTypes = useTargetTypesStore((state) => state.fetchAllTypes);

  const filters = useTargetsFiltersStore((state) => state.filters);
  const setFilters = useTargetsFiltersStore((state) => state.setFilters);

  const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);

  useEffect(() => {
    const fetchTypes = async () => {
      await fetchAllTypes();
    };
    fetchTypes();
  }, [fetchAllTypes]);

  const { handleOnChange } = useFilterMultipleSelect<TargetType>({
    filterField: 'targettype.name',
    allOptions: allTypes,
    selectedOptions: selectedTypes,
    setSelectedOptions: setSelectedTypes,
    getOptionId: (type: TargetType) => type.id,
    getOptionLabel: (type: TargetType) => type.name,
    onFilterChanged: async () => {
      await fetchTargets();
    },
    setFilters,
    filters,
  });

  return <MultipleSelect selectedOptions={selectedTypes} options={allTypes} isLoading={areTypesLoading} onChange={handleOnChange} />;
}
