import { RolloutsService } from '@/services/rollouts-service';
import { useMutation } from '@tanstack/react-query';

export const useDeleteRollout = () => {
  const { mutateAsync: deleteRollout, isPending } = useMutation({
    mutationFn: async (rolloutId: number) => {
      return RolloutsService.deleteRollout(rolloutId);
    },
  });

  return { deleteRollout, isPending };
};
