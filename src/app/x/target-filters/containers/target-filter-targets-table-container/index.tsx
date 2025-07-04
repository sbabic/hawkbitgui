import { useTargetFiltersPageStore } from '@/stores/target-filters-page-store';
import TargetFilterTargetsTable from '../../components/target-filter-targets-table';
import { useGetPaginatedTargets } from '@/app/x/deployment/hooks/use-get-paginated-targets';
import { useTargetsTableStore } from '@/stores/targets-table-store';

export default function TargetFilterTargetsTableContainer() {
  const currentQuery = useTargetFiltersPageStore((state) => state.currentQuery);

  const { data: selectedTargetsData, isLoading } = useGetPaginatedTargets({
    queryParams: { q: currentQuery },
    queryOptions: { enabled: !!currentQuery },
  });
  const { targets, totalTargets } = selectedTargetsData ?? { targets: [], totalTargets: 0 };

  const page = useTargetsTableStore((state) => state.page);
  const size = useTargetsTableStore((state) => state.size);
  const setPage = useTargetsTableStore((state) => state.setPage);

  return (
    <TargetFilterTargetsTable
      targets={targets}
      isLoading={isLoading}
      pagination={{
        page,
        size,
        totalItems: totalTargets,
      }}
      onControllerIdClick={() => {}}
      onPageChange={setPage}
    />
  );
}
