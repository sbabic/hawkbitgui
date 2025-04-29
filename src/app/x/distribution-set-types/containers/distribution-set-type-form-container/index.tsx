import { CreateDistributionSetTypeInput } from '@/services/distribution-set-types-service.types';
import { useCreateDistributionSetType } from '../../hooks/use-create-distribution-set-type';
import { useGetDistributionSetTypes } from '../../hooks/use-get-distribution-set-types';
import DistributionSetTypeForm from '../../components/distribution-set-type-form';

export interface DistributionSetTypeFormContainerProps {
    onSubmitSuccess: () => void;
    onCancel: () => void;
}

export default function DistributionSetTypeFormContainer({ onSubmitSuccess, onCancel }: DistributionSetTypeFormContainerProps) {
    const { refetch } = useGetDistributionSetTypes({ queryOptions: { enabled: false } });
    const { createDistributionSetType } = useCreateDistributionSetType();

    const handleSubmit = async (data: CreateDistributionSetTypeInput) => {
        await createDistributionSetType([data]);
        onSubmitSuccess();
        refetch();
    };
    return <DistributionSetTypeForm onSubmit={handleSubmit} onCancel={onCancel} />;
}
