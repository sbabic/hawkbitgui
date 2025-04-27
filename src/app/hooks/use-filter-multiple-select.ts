import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FilterFiql } from '@/entities';

interface UseFilterMultipleSelectProps<T> {
    filterField: string;
    fetchOptions: () => Promise<T[]>;
    selectedOptions: T[];
    setSelectedOptions: (options: T[]) => void;
    getOptionId: (option: T) => string | number;
    getOptionLabel: (option: T) => string;
    fetchTargets: () => Promise<void>;
    setFilters: (filters: Record<string, FilterFiql>) => void;
    filters: Record<string, FilterFiql>;
}

export function useFilterMultipleSelect<T>({
    filterField,
    fetchOptions,
    selectedOptions,
    setSelectedOptions,
    getOptionId,
    getOptionLabel,
    fetchTargets,
    setFilters,
    filters,
}: UseFilterMultipleSelectProps<T>) {
    const filter = useRef(new FilterFiql(filterField, ','));
    const [allOptions, setAllOptions] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const optionMap = useMemo(() => new Map(allOptions.map((opt) => [getOptionId(opt), opt])), [allOptions, getOptionId]);

    const cachedFilters = useMemo(() => filters, [filters]);

    const handleOnChange = useCallback(
        (changedOptions: { id: string | number }[]) => {
            const mapped = changedOptions.map((opt) => optionMap.get(opt.id)).filter((opt): opt is T => !!opt);

            setSelectedOptions(mapped);
        },
        [optionMap, setSelectedOptions]
    );

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const fetched = await fetchOptions();
                setAllOptions(fetched);
            } catch (error) {
                console.error(`Failed to fetch options for ${filterField}:`, error);
            } finally {
                setIsLoading(false);
            }
        };

        fetch();
    }, [fetchOptions, filterField]);

    useEffect(() => {
        filter.current.setValues(selectedOptions.map((opt) => ['==', getOptionLabel(opt)]));
        const newFilters = { ...cachedFilters, [filter.current.property]: filter.current };
        setFilters(newFilters);

        fetchTargets().catch((error) => console.error('Failed to fetch targets:', error));
    }, [selectedOptions]);

    return {
        allOptions,
        isLoading,
        selectedOptions,
        handleOnChange,
    };
}
