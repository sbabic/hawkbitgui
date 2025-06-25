import SoftwareModuleTable from '../../components/software-module-table';
import { useGetSoftwareModules } from '../../hooks/use-get-software-modules';
import { FilterFiql, SoftwareModule } from '@/entities';
import { useDeleteSoftwareModule } from '../../hooks/use-delete-software-module';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import { useConfirmDialog } from '@/app/hooks';
import { useSoftwareModulesStore } from '@/stores/software-modules-store';
import { Modal } from '@/app/components/modal';
import { useState } from 'react';
import SoftwareModuleInfo from '../../components/software-module-info';
import EditSoftwareModuleFormContainer from '../edit-software-module-form-container';
import { useSoftwareModuleFiltersStore } from '@/stores/software-module-filters-store';

export default function SoftwareModuleTableContainer() {
  const filters = useSoftwareModuleFiltersStore((state) => state.filters);
  const fiqlQueryParam = FilterFiql.parseFiltersToFeedItemQueryLanguage(Object.values(filters) ?? []);
  const query = fiqlQueryParam !== '' ? fiqlQueryParam : undefined;
  const { data: softwareModules, refetch, isLoading } = useGetSoftwareModules({ queryParams: { q: query } });

  const setSelectedSoftwareModule = useSoftwareModulesStore((state) => state.setSelectedSoftwareModule);
  const selectedSoftwareModule = useSoftwareModulesStore((state) => state.selectedSoftwareModule);
  const [isSoftwareModuleInfoModalOpen, setIsSoftwareModuleInfoModalOpen] = useState(false);
  const [isEditSoftwareModuleFormOpen, setIsEditSoftwareModuleFormOpen] = useState(false);

  const { deleteSoftwareModule } = useDeleteSoftwareModule();

  const confirmDialog = useConfirmDialog<SoftwareModule>();

  const handleRowClick = (softwareModule: SoftwareModule) => {
    setSelectedSoftwareModule(softwareModule);
  };

  const handleNameClick = (softwareModule: SoftwareModule) => {
    setSelectedSoftwareModule(softwareModule);
    setIsSoftwareModuleInfoModalOpen(true);
  };

  const handleEditSoftwareModule = (softwareModule: SoftwareModule) => {
    setSelectedSoftwareModule(softwareModule);
    setIsEditSoftwareModuleFormOpen(true);
  };

  const handleDeleteSoftwareModule = (softwareModule: SoftwareModule) => {
    confirmDialog.open(softwareModule, async () => {
      if (!softwareModule) return;
      await deleteSoftwareModule({ softwareModuleId: softwareModule.id });
      refetch();
    });
  };

  const closeInfoModal = () => {
    setIsSoftwareModuleInfoModalOpen(false);
    setSelectedSoftwareModule(undefined);
  };

  const closeEditForm = () => {
    setIsEditSoftwareModuleFormOpen(false);
    setSelectedSoftwareModule(undefined);
  };

  return (
    <>
      <SoftwareModuleTable
        modules={softwareModules ?? []}
        isLoading={isLoading}
        onNameClick={handleNameClick}
        onEditClick={handleEditSoftwareModule}
        onDeleteClick={handleDeleteSoftwareModule}
        onRowClick={handleRowClick}
      />
      <Modal isOpen={isSoftwareModuleInfoModalOpen} variant='unstyled' size='lg' onClose={closeInfoModal}>
        <SoftwareModuleInfo />
      </Modal>
      {isEditSoftwareModuleFormOpen && selectedSoftwareModule && (
        <Modal isOpen={isEditSoftwareModuleFormOpen} onClose={closeEditForm}>
          <Modal.Header>Edit software module</Modal.Header>
          <Modal.Content>
            <EditSoftwareModuleFormContainer softwareModule={selectedSoftwareModule} onSubmitSuccess={closeEditForm} onCancel={closeEditForm} />
          </Modal.Content>
        </Modal>
      )}
      <ConfirmDeleteModal isOpen={confirmDialog.isOpen} onConfirm={confirmDialog.confirm} onClose={confirmDialog.close}>
        <ConfirmDeleteModal.Message>
          Are you sure you want to delete the software module <span style={{ fontWeight: 'bold' }}>{confirmDialog.data?.name}</span>?
        </ConfirmDeleteModal.Message>
      </ConfirmDeleteModal>
    </>
  );
}
