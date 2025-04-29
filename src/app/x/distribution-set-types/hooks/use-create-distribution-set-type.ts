import { DistributionSetTypesService } from '@/services/distribution-set-types-service';
import { CreateDistributionSetTypeInput } from '@/services/distribution-set-types-service.types';
import { useMutation } from '@tanstack/react-query';

export const useCreateDistributionSetType = () => {
    const { mutateAsync: createDistributionSetType, isPending } = useMutation({
        mutationFn: async (data: CreateDistributionSetTypeInput[]) => {
            return DistributionSetTypesService.createDistributionSetType(data);
        },
    });

    return { createDistributionSetType, isPending };
};
