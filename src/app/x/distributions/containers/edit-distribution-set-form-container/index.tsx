import { CreateDistributionSetInput } from '@/services/distribution-sets-services.types';
import DistributionSetForm from '../../components/distribution-set-form';
import { useGetDistributionSetTypes } from '@/app/x/distribution-set-types/hooks/use-get-distribution-set-types';
import { Distribution } from '@/entities';
import { useUpdateDistributionSet } from '../../hooks/use-update-distribution-set';
import { useGetPaginatedDistributionSets } from '../../hooks/use-get-paginated-distribution-sets';

export interface EditDistributionSetFormContainerProps {
  distributionSet: Distribution;
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

export default function EditDistributionSetFormContainer({ distributionSet, onSubmitSuccess, onCancel }: EditDistributionSetFormContainerProps) {
  const { refetch } = useGetPaginatedDistributionSets({ queryOptions: { enabled: false } });
  const { data: distributionSetTypes } = useGetDistributionSetTypes();
  const { updateDistributionSet } = useUpdateDistributionSet();

  const handleSubmit = async (data: CreateDistributionSetInput) => {
    await updateDistributionSet({ distributionSetId: distributionSet.id, ...data });
    onSubmitSuccess();
    refetch();
  };
  return <DistributionSetForm defaultValues={distributionSet} distributionSetTypes={distributionSetTypes ?? []} onSubmit={handleSubmit} onCancel={onCancel} />;
}
