import { TargetFiltersService } from '@/services/target-filters-service';
import { useMutation } from '@tanstack/react-query';
import { UpdateTargetFilterInput } from '@/services/target-filters-service.types';

export const useUpdateTargetFilter = () => {
  const { mutateAsync: updateTargetFilter, isPending } = useMutation({
    mutationFn: async (params: { filterId: number; data: UpdateTargetFilterInput }) => {
      return TargetFiltersService.updateTargetFilter(params.filterId, params.data);
    },
  });

  return { updateTargetFilter, isPending };
};
