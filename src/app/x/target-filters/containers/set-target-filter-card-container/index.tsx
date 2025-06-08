import { useTargetFiltersPageStore } from '@/stores/target-filters-page-store';
import SetTargetFilterCard from '../../components/set-target-filter-card';

export default function SetTargetFilterCardContainer() {
  const selectedTargetFilter = useTargetFiltersPageStore((state) => state.selectedTargetFilter);
  const setTableType = useTargetFiltersPageStore((state) => state.setTableType);

  const returnToTargetFilters = () => {
    setTableType('target-filters');
  };

  return (
    <SetTargetFilterCard
      selectedTargetFilter={selectedTargetFilter}
      onReturnToTargetFiltersClick={returnToTargetFilters}
      onSubmitSuccess={returnToTargetFilters}
      onClose={returnToTargetFilters}
    />
  );
}
