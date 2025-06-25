import { SoftwareModuleTypesService } from '@/services/software-module-types-service';
import { useMutation } from '@tanstack/react-query';
import { SoftwareModuleTypeFormData } from '../components/software-module-type-form/types';

export const useCreateSoftwareModuleType = () => {
  const { mutateAsync: createSoftwareModuleType, isPending } = useMutation({
    mutationFn: async (data: SoftwareModuleTypeFormData) => {
      return SoftwareModuleTypesService.createType([data]);
    },
  });

  return { createSoftwareModuleType, isPending };
};
