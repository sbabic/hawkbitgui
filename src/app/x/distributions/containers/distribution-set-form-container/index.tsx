import DistributionSetForm from '../../components/distribution-set-form';
import { useCreateDistributionSet } from '../../hooks/use-create-distribution-set';
import { useGetDistributionSetTypes } from '@/app/x/distribution-set-types/hooks/use-get-distribution-set-types';
import { CreateDistributionSetFormData } from '../../components/distribution-set-form/types';
import { useGetPaginatedDistributionSets } from '../../hooks/use-get-paginated-distribution-sets';

export interface DistributionSetFormContainerProps {
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

export default function DistributionSetFormContainer({ onSubmitSuccess, onCancel }: DistributionSetFormContainerProps) {
  const { refetch } = useGetPaginatedDistributionSets({ queryOptions: { enabled: false } });
  const { data: distributionSetTypes } = useGetDistributionSetTypes();
  const { createDistributionSet } = useCreateDistributionSet();

  const handleSubmit = async (data: CreateDistributionSetFormData) => {
    await createDistributionSet([data]);
    onSubmitSuccess();
    refetch();
  };
  return <DistributionSetForm distributionSetTypes={distributionSetTypes ?? []} onSubmit={handleSubmit} onCancel={onCancel} />;
}
