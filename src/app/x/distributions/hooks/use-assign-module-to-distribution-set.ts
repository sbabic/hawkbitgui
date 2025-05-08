import { DistributionSetsService } from '@/services/distribution-sets-service';
import { AssignModulesToDistributionSetInput } from '@/services/distribution-sets-services.types';
import { useMutation } from '@tanstack/react-query';

export const useAssignModuleToDistributionSet = () => {
    const { mutateAsync: assignModuleToDistributionSet, isPending } = useMutation({
        mutationFn: async (data: AssignModulesToDistributionSetInput) => {
            return DistributionSetsService.assignModulesToDistributionSet(data);
        },
    });

    return { assignModuleToDistributionSet, isPending };
};
