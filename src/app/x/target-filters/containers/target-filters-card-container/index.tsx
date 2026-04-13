'use client';

import TargetFiltersCard from '../../components/target-filters-card';
import { useTargetFiltersPageStore } from '@/stores/target-filters-page-store';
import { useTargetFiltersTableStore } from '@/stores/target-filters-table-store';
import { debounce } from 'lodash-es';
import { useEffect, useMemo } from 'react';

export default function TargetFiltersCardContainer() {
  const setTableType = useTargetFiltersPageStore((state) => state.setTableType);
  const setSearchQuery = useTargetFiltersTableStore((state) => state.setSearchQuery);
  const setPage = useTargetFiltersTableStore((state) => state.setPage);

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(0);
        setSearchQuery(value.trim() ? value.trim() : undefined);
      }, 300),
    [setPage, setSearchQuery]
  );

  useEffect(() => {
    return () => {
      handleSearch.cancel();
      setSearchQuery(undefined);
      setPage(0);
    };
  }, [handleSearch, setPage, setSearchQuery]);

  return <TargetFiltersCard onCreateClick={() => setTableType('set-target-filter')} onSearchChange={handleSearch} />;
}
