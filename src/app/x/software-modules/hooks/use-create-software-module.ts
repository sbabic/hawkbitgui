import { SoftwareModulesService } from '@/services/software-modules-service';
import { CreateSoftwareModuleInput } from '@/services/software-modules-service.types';
import { useMutation } from '@tanstack/react-query';

export const useCreateSoftwareModule = () => {
  const { mutateAsync: createSoftwareModule, isPending } = useMutation({
    mutationFn: async (data: CreateSoftwareModuleInput[]) => {
      return SoftwareModulesService.createSoftwareModule(data);
    },
  });

  return { createSoftwareModule, isPending };
};
