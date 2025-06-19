import SoftwareModuleTable from '../../components/software-module-table';
import { useGetSoftwareModules } from '../../hooks/use-get-software-modules';
import { SoftwareModule } from '@/entities';
import { useDeleteSoftwareModule } from '../../hooks/use-delete-software-module';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { useConfirmDialog } from '@/app/hooks';
import { useSoftwareModulesStore } from '@/stores/software-modules-store';
import { Modal } from '@/app/components/modal';
import { useState } from 'react';
import SoftwareModuleInfo from '../../components/software-module-info';

export default function SoftwareModuleTableContainer() {
  const { data: softwareModules, refetch } = useGetSoftwareModules();
  const setSelectedSoftwareModule = useSoftwareModulesStore((state) => state.setSelectedSoftwareModule);
  const [isSoftwareModuleInfoModalOpen, setIsSoftwareModuleInfoModalOpen] = useState(false);

  const { deleteSoftwareModule } = useDeleteSoftwareModule();

  const confirmDialog = useConfirmDialog<SoftwareModule>();

  const handleRowClick = (softwareModule: SoftwareModule) => {
    setSelectedSoftwareModule(softwareModule);
  };

  const handleNameClick = (softwareModule: SoftwareModule) => {
    setSelectedSoftwareModule(softwareModule);
    setIsSoftwareModuleInfoModalOpen(true);
  };

  const handleDeleteSoftwareModule = (softwareModule: SoftwareModule) => {
    confirmDialog.open(softwareModule, async () => {
      if (!softwareModule) return;
      deleteSoftwareModule(
        { softwareModuleId: softwareModule.id },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    });
  };

  const closeInfoModal = () => {
    setIsSoftwareModuleInfoModalOpen(false);
    setSelectedSoftwareModule(undefined);
  };

  return (
    <>
      <SoftwareModuleTable
        modules={softwareModules ?? []}
        onNameClick={handleNameClick}
        onDeleteClick={handleDeleteSoftwareModule}
        onRowClick={handleRowClick}
      />
      <Modal isOpen={isSoftwareModuleInfoModalOpen} variant='unstyled' onClose={closeInfoModal} size={'fitContent'}>
        <SoftwareModuleInfo />
      </Modal>
      <ConfirmDeleteModal isOpen={confirmDialog.isOpen} onConfirm={confirmDialog.confirm} onClose={confirmDialog.close}>
        <ConfirmDeleteModal.Message>
          Are you sure you want to delete the software module <span style={{ fontWeight: 'bold' }}>{confirmDialog.data?.name}</span>?
        </ConfirmDeleteModal.Message>
      </ConfirmDeleteModal>
    </>
  );
}
