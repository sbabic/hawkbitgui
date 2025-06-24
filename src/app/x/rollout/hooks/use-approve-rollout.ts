import { RolloutsService } from '@/services/rollouts-service';
import { useMutation } from '@tanstack/react-query';
import { handleErrorWithToast } from '@/utils/handle-error-with-toast';

export const useApproveRollout = () => {
  const { mutateAsync: approveRollout, isPending } = useMutation({
    mutationFn: async (rolloutId: number) => {
      return RolloutsService.approveRollout(rolloutId);
    },
    onError: (error) => {
      handleErrorWithToast(error, 'Failed to approve rollout');
    },
  });

  return { approveRollout, isPending };
};
