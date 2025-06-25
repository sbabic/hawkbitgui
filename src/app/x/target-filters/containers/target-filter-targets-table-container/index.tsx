import { useGetTargets } from '@/app/x/deployment/hooks/use-get-targets';
import { useTargetFiltersPageStore } from '@/stores/target-filters-page-store';
import TargetFilterTargetsTable from '../../components/target-filter-targets-table';

export default function TargetFilterTargetsTableContainer() {
  const currentQuery = useTargetFiltersPageStore((state) => state.currentQuery);

  const { data: selectedTargets, isLoading } = useGetTargets({
    queryParams: { q: currentQuery },
    queryOptions: { enabled: !!currentQuery },
  });

  return <TargetFilterTargetsTable targets={selectedTargets ?? []} isLoading={isLoading} onControllerIdClick={() => {}} />;
}
