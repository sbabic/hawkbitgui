import { Metadata } from '@/entities';
import { SoftwareModulesService } from '@/services/software-modules-service';
import { useMutation } from '@tanstack/react-query';

export const useCreateSoftwareModuleMetadata = () => {
  const { mutateAsync: createSoftwareModuleMetadata, isPending } = useMutation({
    mutationFn: async (data: { softwareModuleId: number; metadata: Metadata }) => {
      return SoftwareModulesService.createMetadata(data.softwareModuleId, data.metadata);
    },
  });

  return { createSoftwareModuleMetadata, isPending };
};
