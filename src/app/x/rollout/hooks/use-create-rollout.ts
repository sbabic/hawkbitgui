import { RolloutsService } from '@/services/rollouts-service';
import { CreateRolloutInput } from '@/services/rollouts-service.types';
import { useMutation } from '@tanstack/react-query';

export const useCreateRollout = () => {
    const { mutateAsync: createRollout, isPending } = useMutation({
        mutationFn: async (data: CreateRolloutInput) => {
            return RolloutsService.createRollout(data);
        },
    });

    return { createRollout, isPending };
};
