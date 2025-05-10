import { SoftwareModulesService } from '@/services/software-modules-service';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

type DeleteSoftwareModuleParams = {
  softwareModuleId: number;
};

type UseDeleteSoftwareModuleParams = {
  mutationOptions?: Omit<UseMutationOptions<void, ApiError, DeleteSoftwareModuleParams>, 'mutationFn'>;
};

export const useDeleteSoftwareModule = (params?: UseDeleteSoftwareModuleParams) => {
  const { mutationOptions } = params ?? {};

  const { mutate: deleteSoftwareModule, isPending } = useMutation<void, ApiError, DeleteSoftwareModuleParams>({
    mutationFn: ({ softwareModuleId }) => SoftwareModulesService.deleteSoftwareModule(softwareModuleId),
    ...mutationOptions,
  });

  return { deleteSoftwareModule, isPending };
};
