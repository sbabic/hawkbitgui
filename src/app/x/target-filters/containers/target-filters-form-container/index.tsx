import { useCreateTargetFilters } from '../../hooks/use-create-target-filter';
import TargetFiltersForm from '../../components/target-filters-form';
import { CreateTargetFilterFormData } from '../../components/target-filters-form/types';
import { TargetFilter } from '@/entities/target-filter';
import { useTargetFiltersPageStore } from '@/stores/target-filters-page-store';
import { useUpdateTargetFilter } from '../../hooks/use-update-target-filter';
import { useGetPaginatedTargetFilters } from '../../hooks/use-get-paginated-target-filters';

export interface TargetFiltersFormContainerProps {
  targetFilter?: TargetFilter;
  onSubmitSuccess: () => void;
}

export default function TargetFiltersFormContainer({ targetFilter, onSubmitSuccess }: TargetFiltersFormContainerProps) {
  const { refetch } = useGetPaginatedTargetFilters({ queryOptions: { enabled: false } });
  const { createTargetFilter } = useCreateTargetFilters();
  const { updateTargetFilter } = useUpdateTargetFilter();

  const selectedTargetFilter = useTargetFiltersPageStore((state) => state.selectedTargetFilter);
  const setCurrentQuery = useTargetFiltersPageStore((state) => state.setCurrentQuery);

  const handleSubmit = async (data: CreateTargetFilterFormData) => {
    if (selectedTargetFilter) {
      await updateTargetFilter({ filterId: selectedTargetFilter.id, data });
    } else {
      await createTargetFilter(data);
    }
    onSubmitSuccess();
    refetch();
  };

  return <TargetFiltersForm defaultValues={targetFilter} onQueryChange={setCurrentQuery} onSubmit={handleSubmit} />;
}
