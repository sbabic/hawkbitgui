'use client';

import MultipleSelect from '@/app/components/multiple-select';
import { useTargetsFiltersStore } from '@/stores/targets-filters-store';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { useTargetTypesStore } from '@/stores/targets-types-store';
import { TargetsTypesService } from '@/services/targets-types-service';
import { TargetType } from '@/entities';
import { useFilterMultipleSelect } from '@/app/hooks';

export default function ByTypeFilterContainer() {
    const selectedTypes = useTargetTypesStore((state) => state.selectedTypes);
    const setSelectedTypes = useTargetTypesStore((state) => state.setSelectedTypes);

    const filters = useTargetsFiltersStore((state) => state.filters);
    const setFilters = useTargetsFiltersStore((state) => state.setFilters);

    const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);

    const { allOptions, isLoading, handleOnChange } = useFilterMultipleSelect<TargetType>({
        filterField: 'targettype.name',
        fetchOptions: TargetsTypesService.fetchTargetsTypes,
        selectedOptions: selectedTypes,
        setSelectedOptions: setSelectedTypes,
        getOptionId: (type: TargetType) => type.id,
        getOptionLabel: (type: TargetType) => type.name,
        fetchEntities: fetchTargets,
        setFilters,
        filters,
    });

    return <MultipleSelect selectedOptions={selectedTypes} options={allOptions} isLoading={isLoading} onChange={handleOnChange} />;
}
