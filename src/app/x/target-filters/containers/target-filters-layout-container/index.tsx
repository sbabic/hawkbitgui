import { useTargetFiltersPageStore } from '@/stores/target-filters-page-store';
import TargetFiltersCardContainer from '../target-filters-card-container';
import SetTargetFilterCardContainer from '../set-target-filter-card-container';

export default function TargetFiltersLayoutContainer() {
  const tableType = useTargetFiltersPageStore((state) => state.tableType);

  return (
    <>
      {tableType === 'target-filters' && <TargetFiltersCardContainer />}
      {tableType === 'set-target-filter' && <SetTargetFilterCardContainer />}
    </>
  );
}
