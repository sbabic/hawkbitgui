import { TargetFiltersService } from '@/services/target-filters-service';
import { useMutation } from '@tanstack/react-query';

export const useDeleteTargetFilter = () => {
  const { mutateAsync: deleteTargetFilter, isPending } = useMutation({
    mutationFn: async (filterId: number) => {
      return TargetFiltersService.deleteTargetFilter(filterId);
    },
  });

  return { deleteTargetFilter, isPending };
};
