import { SoftwareModulesService } from '@/services/software-modules-service';
import { useMutation } from '@tanstack/react-query';

export const useDeleteSoftwareModuleMetadata = () => {
  const { mutateAsync: deleteSoftwareModuleMetadata, isPending } = useMutation({
    mutationFn: async (data: { softwareModuleId: number; metadataKey: string }) => {
      return SoftwareModulesService.deleteMetadata(data.softwareModuleId, data.metadataKey);
    },
  });

  return { deleteSoftwareModuleMetadata, isPending };
};
