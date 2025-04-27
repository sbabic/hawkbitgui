'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTargetsFiltersStore } from '@/stores/targets-filters-store';
import { FilterFiql, TargetType } from '@/entities';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import MultipleSelect from '@/app/components/multiple-select';
import { BaseOption } from '@/app/components/multiple-select/react-select-config';
import { TargetsTypesService } from '@/services/targets-types-service';
import { useTargetTypesStore } from '@/stores/targets-types-store';

export default function ByTypeFilterContainer() {
    const filter = useRef<FilterFiql>(new FilterFiql('targettype.name', ','));
    const [isLoading, setIsLoading] = useState(false);
    const [allTypes, setAllTypes] = useState<TargetType[]>([]);

    const selectedTypes = useTargetTypesStore((state) => state.selectedTypes);
    const setSelectedTypes = useTargetTypesStore((state) => state.setSelectedTypes);

    const filtersSnapshot = useTargetsFiltersStore.getState().filters;
    const setFilters = useTargetsFiltersStore((state) => state.setFilters);

    const fetchTargets = useTargetsTableStore.getState().fetchTargets;

    const handleOnChange = useCallback(
        async (changedOptions: BaseOption[]) => {
            const typeMap = new Map(allTypes.map((t) => [t.id, t]));
            const mappedTypes: TargetType[] = changedOptions.map((option) => typeMap.get(option.id)).filter((type): type is TargetType => !!type);

            setSelectedTypes(mappedTypes);
        },
        [allTypes, setSelectedTypes]
    );

    useEffect(() => {
        const fetchTypes = async () => {
            setIsLoading(true);
            try {
                const [fetchedTypes] = await Promise.all([TargetsTypesService.fetchTargetsTypes()]);
                setAllTypes(fetchedTypes);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTypes();
    }, [setSelectedTypes]);

    useEffect(() => {
        filter.current.setValues(selectedTypes.map((type: TargetType) => ['==', `${type.name}`]));
        const newFilters = { ...filtersSnapshot, [filter.current.property]: filter.current };
        setFilters(newFilters);
        fetchTargets().catch((err) => console.error(err));
    }, [selectedTypes]);

    return <MultipleSelect selectedOptions={selectedTypes} options={allTypes} isLoading={isLoading} onChange={handleOnChange} />;
}
