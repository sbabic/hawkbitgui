import { RolloutsService } from '@/services/rollouts-service';
import { useMutation } from '@tanstack/react-query';

export const usePauseRollout = () => {
  const { mutateAsync: pauseRollout, isPending } = useMutation({
    mutationFn: async (rolloutId: number) => {
      return RolloutsService.pauseRollout(rolloutId);
    },
  });
  return { pauseRollout, isPending };
};
