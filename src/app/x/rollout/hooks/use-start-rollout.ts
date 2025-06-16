import { RolloutsService } from '@/services/rollouts-service';
import { useMutation } from '@tanstack/react-query';

export const useStartRollout = () => {
  const { mutateAsync: startRollout, isPending } = useMutation({
    mutationFn: async (rolloutId: number) => {
      return RolloutsService.startRollout(rolloutId);
    },
  });

  return { startRollout, isPending };
};
