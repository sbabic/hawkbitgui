'use client';

import { useDistributionsSetsTableStore } from '@/stores/distribution-sets-table-store';
import DistributionSetModules from '../../components/distribution-set-modules';
import { SoftwareModule } from '@/entities';
import { useDeleteSoftwareModule } from '@/app/x/software-modules/hooks/use-delete-software-module';
import { useConfirmDialog } from '@/app/hooks';
import { useGetSoftwareModules } from '@/app/x/software-modules/hooks/use-get-software-modules';
import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';

export default function DistributionSetModulesContainer() {
  const selectedDistribution = useDistributionsSetsTableStore((state) => state.selectedDistribution);

  const { refetch } = useGetSoftwareModules({ queryOptions: { enabled: false } });
  const { deleteSoftwareModule } = useDeleteSoftwareModule();

  const confirmDialog = useConfirmDialog<SoftwareModule>();

  if (!selectedDistribution) {
    return null;
  }

  const handleModuleDelete = async (module: SoftwareModule) => {
    confirmDialog.open(module, async () => {
      await deleteSoftwareModule({ softwareModuleId: module.id });
      refetch();
    });
  };

  return (
    <>
      <DistributionSetModules distributionSet={selectedDistribution} onModuleDelete={handleModuleDelete} />
      <ConfirmDeleteModal isOpen={confirmDialog.isOpen} onConfirm={confirmDialog.confirm} onClose={confirmDialog.close}>
        <ConfirmDeleteModal.Message>
          Are you sure you want to delete module <span style={{ fontWeight: 'bold' }}>{confirmDialog.data?.name}</span>?
        </ConfirmDeleteModal.Message>
      </ConfirmDeleteModal>
    </>
  );
}
