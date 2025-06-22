import { RolloutsService } from '@/services/rollouts-service';
import { useMutation } from '@tanstack/react-query';

export const useTriggerNextGroup = () => {
  const { mutateAsync: triggerNextGroup, isPending } = useMutation({
    mutationFn: async (rolloutId: number) => {
      return RolloutsService.forceTriggerNextGroup(rolloutId);
    },
  });

  return { triggerNextGroup, isPending };
};
