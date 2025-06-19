import { SoftwareModulesService } from '@/services/software-modules-service';
import { useMutation } from '@tanstack/react-query';
import { CreateSoftwareModuleFormData } from '../components/software-module-form/types';

export const useUpdateSoftwareModule = () => {
  const { mutateAsync: updateSoftwareModule, isPending } = useMutation({
    mutationFn: async (data: Partial<CreateSoftwareModuleFormData> & { softwareModuleId: number }) => {
      return SoftwareModulesService.updateSoftwareModule(data.softwareModuleId, data);
    },
  });

  return { updateSoftwareModule, isPending };
};
