import { useCallback, useEffect, useMemo, useRef } from 'react';
import { FilterFiql } from '@/entities';

interface UseFilterMultipleSelectProps<T> {
  filterField: string;
  selectedOptions: T[];
  setSelectedOptions: (options: T[]) => void;
  getOptionId: (option: T) => string | number;
  getOptionLabel: (option: T) => string;
  setFilters: (filters: Record<string, FilterFiql>) => void;
  filters: Record<string, FilterFiql>;
  allOptions: T[];
  onFilterChanged: (filters: Record<string, FilterFiql>) => void;
}

export function useFilterMultipleSelect<T>({
  filterField,
  selectedOptions,
  setSelectedOptions,
  getOptionId,
  getOptionLabel,
  onFilterChanged,
  setFilters,
  filters,
  allOptions,
}: UseFilterMultipleSelectProps<T>) {
  const filter = useRef(new FilterFiql(filterField, ','));

  const optionMap = useMemo(() => new Map(allOptions.map((opt) => [getOptionId(opt), opt])), [allOptions, getOptionId]);

  const handleOnChange = useCallback(
    (changedOptions: { id: string | number }[]) => {
      const mapped = changedOptions.map((opt) => optionMap.get(opt.id)).filter((opt): opt is T => !!opt);
      setSelectedOptions(mapped);
    },
    [optionMap, setSelectedOptions]
  );

  useEffect(() => {
    const isFilterPropertyEmpty = filter.current.property === '' || filter.current.property === undefined;

    filter.current.setValues(selectedOptions.map((opt) => [isFilterPropertyEmpty ? '' : '==', getOptionLabel(opt)]));

    const newFilters = { ...filters, [filter.current.property]: filter.current };
    setFilters(newFilters);

    onFilterChanged(newFilters);
  }, [selectedOptions, getOptionLabel, filters, setFilters, onFilterChanged]);

  return {
    allOptions,
    selectedOptions,
    handleOnChange,
  };
}
