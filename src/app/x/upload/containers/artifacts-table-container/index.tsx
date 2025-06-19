import { SoftwareModuleArtifact } from '@/entities/software-module-artifact';
import ArtifactsTable from '../../components/artifacts-table';
import { useGetArtifacts } from '../../hooks/use-get-artifacts';
import { useSoftwareModulesStore } from '@/stores/software-modules-store';
import { useDownloadArtifact } from '../../hooks/use-download-artifact';
import { useDeleteArtifact } from '../../hooks/use-delete-artifact';

export default function ArtifactsTableContainer() {
  const selectedSoftwareModule = useSoftwareModulesStore((state) => state.selectedSoftwareModule);

  const { data: artifacts, refetch: refetchArtifacts } = useGetArtifacts({
    softwareModuleId: selectedSoftwareModule?.id ?? 0,
    queryOptions: { enabled: !!selectedSoftwareModule },
  });

  const { downloadArtifact } = useDownloadArtifact();
  const { deleteArtifact } = useDeleteArtifact();

  const handleDownloadArtifact = (artifact: SoftwareModuleArtifact) => {
    if (selectedSoftwareModule) {
      downloadArtifact(
        { softwareModuleId: selectedSoftwareModule.id, artifactId: artifact.id },
        {
          onSuccess: (blob) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = artifact.providedFilename;
            link.click();
            URL.revokeObjectURL(link.href);
          },
        }
      );
    }
  };

  const handleDeleteArtifact = (artifact: SoftwareModuleArtifact) => {
    if (selectedSoftwareModule) {
      deleteArtifact(
        { softwareModuleId: selectedSoftwareModule.id, artifactId: artifact.id },
        {
          onSuccess: () => {
            refetchArtifacts();
          },
        }
      );
    }
  };

  return <ArtifactsTable artifacts={artifacts ?? []} onDownloadClick={handleDownloadArtifact} onDeleteClick={handleDeleteArtifact} />;
}
