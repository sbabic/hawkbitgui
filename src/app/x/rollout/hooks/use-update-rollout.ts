import { RolloutsService } from '@/services/rollouts-service';
import { CreateRolloutInput } from '@/services/rollouts-service.types';
import { useMutation } from '@tanstack/react-query';

export const useUpdateRollout = () => {
  const { mutateAsync: updateRollout, isPending } = useMutation({
    mutationFn: async (data: Pick<CreateRolloutInput, 'name' | 'description'> & { rolloutId: number }) => {
      return RolloutsService.updateRollout(data.rolloutId, data);
    },
  });

  return { updateRollout, isPending };
};
