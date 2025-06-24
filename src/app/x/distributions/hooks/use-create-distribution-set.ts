import { DistributionSetsService } from '@/services/distribution-sets-service';
import { useMutation } from '@tanstack/react-query';
import { CreateDistributionSetFormData } from '../components/distribution-set-form/types';

export const useCreateDistributionSet = () => {
  const { mutateAsync: createDistributionSet, isPending } = useMutation({
    mutationFn: async (data: CreateDistributionSetFormData[]) => {
      return DistributionSetsService.createDistributionSet(data);
    },
  });

  return { createDistributionSet, isPending };
};
