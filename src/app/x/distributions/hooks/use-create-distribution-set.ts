import { DistributionSetsService } from '@/services/distribution-sets-service';
import { CreateDistributionSetInput } from '@/services/distribution-sets-services.types';
import { useMutation } from '@tanstack/react-query';

export const useCreateDistributionSet = () => {
    const { mutateAsync: createDistributionSet, isPending } = useMutation({
        mutationFn: async (data: CreateDistributionSetInput[]) => {
            return DistributionSetsService.createDistributionSet(data);
        },
    });

    return { createDistributionSet, isPending };
};
