import { useUploadArtifact } from '@/app/x/upload/hooks/use-upload-artifact';
import SoftwareModuleTable from '../../components/software-module-table';
import { useGetSoftwareModules } from '../../hooks/use-get-software-modules';
import { useGetArtifacts } from '@/app/x/upload/hooks/use-get-artifacts';
import { Modal } from '@/app/components/modal';
import FileUploader from '@/app/components/upload-field';
import { useModalWithSelectedItem } from '@/app/hooks/use-modal-with-selected-item';
import { SoftwareModule } from '@/entities';
import ArtifactsTable from '@/app/x/upload/components/artifacts-table';
import { SoftwareModuleArtifact } from '@/entities/software-module-artifact';
import { useDownloadArtifact } from '@/app/x/upload/hooks/use-download-artifact';
import { useDeleteArtifact } from '@/app/x/upload/hooks/use-delete-artifact';
import { useDeleteSoftwareModule } from '../../hooks/use-delete-software-module';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { useConfirmDialog } from '@/app/hooks';

export default function SoftwareModuleTableContainer() {
  const { data: softwareModules, refetch } = useGetSoftwareModules();

  const { uploadArtifact } = useUploadArtifact();

  const { isOpen, data: selectedSoftwareModule, open, close } = useModalWithSelectedItem<SoftwareModule>();
  const { data: artifacts, refetch: refetchArtifacts } = useGetArtifacts({
    softwareModuleId: selectedSoftwareModule?.id ?? 0,
    queryOptions: { enabled: !!selectedSoftwareModule },
  });

  const { deleteSoftwareModule } = useDeleteSoftwareModule();

  const confirmDialog = useConfirmDialog<SoftwareModule>();

  const { downloadArtifact } = useDownloadArtifact();
  const { deleteArtifact } = useDeleteArtifact();

  const handleFileSelect = async (files: File[]) => {
    if (selectedSoftwareModule) {
      await uploadArtifact({ softwareModuleId: selectedSoftwareModule.id, files });
      refetchArtifacts();
    }
  };

  const handleDeleteSoftwareModule = (softwareModule: SoftwareModule) => {
    confirmDialog.open(softwareModule, async () => {
      if (!selectedSoftwareModule) return;
      deleteSoftwareModule(
        { softwareModuleId: softwareModule.id },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    });
    if (selectedSoftwareModule) {
    }
  };

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

  return (
    <>
      <SoftwareModuleTable modules={softwareModules ?? []} onNameClick={open} onDeleteClick={handleDeleteSoftwareModule} />
      <Modal size='xl' isOpen={isOpen} onClose={close}>
        <Modal.Header>Upload files</Modal.Header>
        <Modal.Content>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <FileUploader onFileSelect={handleFileSelect} />
            <ArtifactsTable artifacts={artifacts ?? []} onDownloadClick={handleDownloadArtifact} onDeleteClick={handleDeleteArtifact} />
          </div>
        </Modal.Content>
      </Modal>
      <ConfirmDeleteModal isOpen={confirmDialog.isOpen} onConfirm={confirmDialog.confirm} onClose={confirmDialog.close}>
        <ConfirmDeleteModal.Message>
          Are you sure you want to delete the software module <span style={{ fontWeight: 'bold' }}>{confirmDialog.data?.name}</span>?
        </ConfirmDeleteModal.Message>
      </ConfirmDeleteModal>
    </>
  );
}
