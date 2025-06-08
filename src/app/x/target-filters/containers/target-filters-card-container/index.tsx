'use client';

import TargetFiltersCard from '../../components/target-filters-card';
import { useTargetFiltersPageStore } from '@/stores/target-filters-page-store';

export default function TargetFiltersCardContainer() {
  const setTableType = useTargetFiltersPageStore((state) => state.setTableType);

  return <TargetFiltersCard onCreateClick={() => setTableType('set-target-filter')} />;
}
