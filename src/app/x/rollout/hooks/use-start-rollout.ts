import { RolloutStatus } from '@/entities/rollout';
import { RolloutsService } from '@/services/rollouts-service';
import { useMutation } from '@tanstack/react-query';

export const useStartRollout = () => {
  const { mutateAsync: startRollout, isPending } = useMutation({
    mutationFn: async (params: { rolloutId: number; status: RolloutStatus }) => {
      const { rolloutId, status } = params;
      if (status === RolloutStatus.paused) {
        return RolloutsService.resumeRollout(rolloutId);
      }

      return RolloutsService.startRollout(rolloutId);
    },
  });

  return { startRollout, isPending };
};
