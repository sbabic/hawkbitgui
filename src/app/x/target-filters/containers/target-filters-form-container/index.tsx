import { useCreateTargetFilters } from '../../hooks/use-create-target-filter';
import { useGetTargetFilters } from '../../hooks/use-get-target-filters';
import TargetFiltersForm from '../../components/target-filters-form';
import { CreateTargetFilterFormData } from '../../components/target-filters-form/types';

export interface TargetFiltersFormContainerProps {
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

export default function TargetFiltersFormContainer({ onSubmitSuccess, onCancel }: TargetFiltersFormContainerProps) {
  const { refetch } = useGetTargetFilters({ queryOptions: { enabled: false } });
  const { createTargetFilter } = useCreateTargetFilters();

  const handleSubmit = async (data: CreateTargetFilterFormData) => {
    await createTargetFilter(data);
    onSubmitSuccess();
    refetch();
  };
  return <TargetFiltersForm onSubmit={handleSubmit} onCancel={onCancel} />;
}
