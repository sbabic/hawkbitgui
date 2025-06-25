import { SoftwareModuleTypesService } from '@/services/software-module-types-service';
import { useMutation } from '@tanstack/react-query';

export const useDeleteSoftwareModuleType = () => {
  const { mutateAsync: deleteSoftwareModuleType, isPending } = useMutation({
    mutationFn: async (softwareModuleTypeId: number) => {
      return SoftwareModuleTypesService.deleteType(softwareModuleTypeId);
    },
  });

  return { deleteSoftwareModuleType, isPending };
};
