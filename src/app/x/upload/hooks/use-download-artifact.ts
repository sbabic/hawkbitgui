import { SoftwareModuleArtifactsService } from '@/services/software-module-artifacts-service';
import { ApiError } from '@/types/hawkbit-api/error';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

type DownloadArtifactParams = {
  softwareModuleId: number;
  artifactId: number;
};

type UseDownloadArtifactParams = {
  mutationOptions?: Omit<UseMutationOptions<Blob, ApiError, DownloadArtifactParams>, 'mutationFn'>;
};

export const useDownloadArtifact = (params?: UseDownloadArtifactParams) => {
  const { mutationOptions } = params ?? {};

  const { mutate: downloadArtifact, isPending } = useMutation<Blob, ApiError, DownloadArtifactParams>({
    mutationFn: (params) => SoftwareModuleArtifactsService.downloadArtifact(params),
    ...mutationOptions,
  });

  return { downloadArtifact, isPending };
};
