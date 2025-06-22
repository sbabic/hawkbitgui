import { RolloutsService } from '@/services/rollouts-service';
import { useMutation } from '@tanstack/react-query';

export const useApproveRollout = () => {
  const { mutateAsync: approveRollout, isPending } = useMutation({
    mutationFn: async (rolloutId: number) => {
      return RolloutsService.approveRollout(rolloutId);
    },
  });

  return { approveRollout, isPending };
};
