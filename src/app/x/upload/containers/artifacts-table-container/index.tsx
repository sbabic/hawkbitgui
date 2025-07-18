import { SoftwareModuleArtifact } from '@/entities/software-module-artifact';
import ArtifactsTable from '../../components/artifacts-table';
import { useGetArtifacts } from '../../hooks/use-get-artifacts';
import { useSoftwareModulesStore } from '@/stores/software-modules-store';
import { useDownloadArtifact } from '../../hooks/use-download-artifact';
import { useDeleteArtifact } from '../../hooks/use-delete-artifact';
import { useArtifactsTableStore } from '@/stores/artifacts-table-store';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { useConfirmDialog } from '@/app/hooks';

export default function ArtifactsTableContainer() {
  const selectedSoftwareModule = useSoftwareModulesStore((state) => state.selectedSoftwareModule);
  const visibleColumns = useArtifactsTableStore((state) => state.visibleColumns);

  const {
    data: artifacts,
    refetch: refetchArtifacts,
    isLoading,
  } = useGetArtifacts({
    softwareModuleId: selectedSoftwareModule?.id ?? 0,
    queryOptions: { enabled: !!selectedSoftwareModule },
  });

  const { downloadArtifact } = useDownloadArtifact();
  const { deleteArtifact } = useDeleteArtifact();

  const confirmDialog = useConfirmDialog<SoftwareModuleArtifact>();

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
      confirmDialog.open(artifact, async () => {
        await deleteArtifact({ softwareModuleId: selectedSoftwareModule.id, artifactId: artifact.id });
        await refetchArtifacts();
      });
    }
  };

  return (
    <>
      <ArtifactsTable
        artifacts={artifacts ?? []}
        isLoading={isLoading}
        visibleColumns={visibleColumns}
        onDownloadClick={handleDownloadArtifact}
        onDeleteClick={handleDeleteArtifact}
      />
      {confirmDialog.isOpen && (
        <ConfirmDeleteModal isOpen={confirmDialog.isOpen} onConfirm={confirmDialog.confirm} onClose={confirmDialog.close}>
          <ConfirmDeleteModal.Message>
            Are you sure you want to delete artifact <span style={{ fontWeight: 'bold' }}>{confirmDialog.data?.providedFilename}</span>?
          </ConfirmDeleteModal.Message>
        </ConfirmDeleteModal>
      )}
    </>
  );
}
