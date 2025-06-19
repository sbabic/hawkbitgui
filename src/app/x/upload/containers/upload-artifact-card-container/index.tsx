import { useSoftwareModulesStore } from '@/stores/software-modules-store';
import UploadArtifactCard from '../../components/upload-artifact-card';
import { useUploadArtifact } from '../../hooks/use-upload-artifact';
import { useGetArtifacts } from '../../hooks/use-get-artifacts';

export default function UploadArtifactCardContainer() {
  const selectedSoftwareModule = useSoftwareModulesStore((state) => state.selectedSoftwareModule);

  const { refetch: refetchArtifacts } = useGetArtifacts({
    softwareModuleId: selectedSoftwareModule?.id ?? 0,
    queryOptions: { enabled: false },
  });

  const { uploadArtifact, isPending: isUploading } = useUploadArtifact();

  const handleFileSelect = async (files: File[]) => {
    if (selectedSoftwareModule) {
      await uploadArtifact({ softwareModuleId: selectedSoftwareModule.id, files });
      refetchArtifacts();
    }
  };

  return <UploadArtifactCard onFileSelect={handleFileSelect} isDisabled={!selectedSoftwareModule} isUploading={isUploading} />;
}
