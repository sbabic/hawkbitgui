'use client';

import MultipleSelect from '@/app/components/multiple-select';
import { useTargetsFiltersStore } from '@/stores/targets-filters-store';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { useTargetStatusStore } from '@/stores/targets-status-store';
import { useFilterMultipleSelect } from '@/app/hooks';
import { TargetStatus, TargetStatusColors } from '@/entities';
import { useMemo } from 'react';

export default function ByStatusFilterContainer() {
  const selectedStatuses = useTargetStatusStore((state) => state.selectedStatuses);
  const setSelectedStatuses = useTargetStatusStore((state) => state.setSelectedStatuses); // new setter needed

  const filters = useTargetsFiltersStore((state) => state.filters);
  const setFilters = useTargetsFiltersStore((state) => state.setFilters);

  const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);

  const targetStatusEnum = useMemo(() => Object.values(TargetStatus), []);

  const { handleOnChange } = useFilterMultipleSelect<TargetStatus>({
    filterField: 'updateStatus',
    allOptions: targetStatusEnum as TargetStatus[],
    selectedOptions: selectedStatuses,
    setSelectedOptions: setSelectedStatuses,
    getOptionId: (status) => status,
    getOptionLabel: (status) => status,
    onFilterChanged: async () => {
      await fetchTargets();
    },
    setFilters,
    filters,
  });

  return (
    <MultipleSelect
      selectedOptions={selectedStatuses.map((status) => ({
        id: status,
        label: status,
        name: status,
        colour: TargetStatusColors[status],
      }))}
      options={targetStatusEnum.map((status) => ({
        id: status,
        label: status,
        name: status,
        colour: TargetStatusColors[status],
      }))}
      onChange={handleOnChange}
    />
  );
}
