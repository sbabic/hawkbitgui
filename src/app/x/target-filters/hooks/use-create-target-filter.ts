import { TargetFiltersService } from '@/services/target-filters-service';
import { useMutation } from '@tanstack/react-query';
import { CreateTargetFilterFormData } from '../components/target-filters-form/types';

export const useCreateTargetFilters = () => {
  const { mutateAsync: createTargetFilter, isPending } = useMutation({
    mutationFn: async (data: CreateTargetFilterFormData) => {
      return TargetFiltersService.createTargetFilter(data);
    },
  });

  return { createTargetFilter, isPending };
};
