import { SoftwareModuleArtifactsService } from '@/services/software-module-artifacts-service';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

type DeleteArtifactParams = {
  softwareModuleId: number;
  artifactId: number;
};

type UseDeleteArtifactParams = {
  mutationOptions?: Omit<UseMutationOptions<void, ApiError, DeleteArtifactParams>, 'mutationFn'>;
};

export const useDeleteArtifact = (params?: UseDeleteArtifactParams) => {
  const { mutationOptions } = params ?? {};

  const { mutateAsync: deleteArtifact, isPending } = useMutation<void, ApiError, DeleteArtifactParams>({
    mutationFn: (params) => SoftwareModuleArtifactsService.deleteArtifact(params),
    ...mutationOptions,
  });

  return { deleteArtifact, isPending };
};
