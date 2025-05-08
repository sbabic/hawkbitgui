import { SoftwareModuleArtifactsService } from '@/services/software-module-artifacts-service';
import { useMutation } from '@tanstack/react-query';

export const useUploadArtifact = () => {
    const { mutateAsync: uploadArtifact, isPending } = useMutation({
        mutationFn: async (params: { softwareModuleId: number; files: File[] }) => {
            const { softwareModuleId, files } = params;
            return SoftwareModuleArtifactsService.uploadArtifact({
                softwareModuleId,
                file: files[0],
                filename: files[0].name,
            });
        },
    });

    return { uploadArtifact, isPending };
};
