import { useGetDistributionSets } from '@/app/x/distributions/hooks/use-get-distribution-sets';
import CreateRolloutForm from '../../components/create-rollout-form';
import { useCreateRollout } from '../../hooks/use-create-rollout';
import { useGetRollouts } from '../../hooks/use-get-rollouts';
import { CreateRolloutInput } from '@/services/rollouts-service.types';

export interface RolloutFormContainerProps {
    onSubmitSuccess: () => void;
    onCancel: () => void;
}

export default function RolloutFormContainer({ onSubmitSuccess, onCancel }: RolloutFormContainerProps) {
    const { refetch } = useGetRollouts({ queryOptions: { enabled: false } });
    const { data: distributionSets } = useGetDistributionSets();
    const { createRollout } = useCreateRollout();

    const handleSubmit = async (data: CreateRolloutInput) => {
        await createRollout(data);
        onSubmitSuccess();
        refetch();
    };
    return <CreateRolloutForm distributionSets={distributionSets ?? []} onSubmit={handleSubmit} onCancel={onCancel} />;
}
