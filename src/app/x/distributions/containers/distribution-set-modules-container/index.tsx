'use client';

import { useDistributionsSetsTableStore } from '@/stores/distribution-sets-table-store';
import DistributionSetModules from '../../components/distribution-set-modules';
import { SoftwareModule } from '@/entities';
import { useConfirmDialog } from '@/app/hooks';
import { useUnassignModuleToDistributionSet } from '../../hooks/use-unassign-module-to-distribution-set';
import { useGetDistributionSets } from '../../hooks/use-get-distribution-sets';
import ConfirmationModal from '@/app/components/confirmation-modal';

export default function DistributionSetModulesContainer() {
  const selectedDistribution = useDistributionsSetsTableStore((state) => state.selectedDistribution);

  const { refetch: refetchDistributionSets } = useGetDistributionSets({ queryOptions: { enabled: false } });
  const { unassignModuleToDistributionSet } = useUnassignModuleToDistributionSet();

  const confirmDialog = useConfirmDialog<SoftwareModule>();

  if (!selectedDistribution) {
    return null;
  }

  const handleModuleDelete = async (module: SoftwareModule) => {
    confirmDialog.open(module, async () => {
      await unassignModuleToDistributionSet({ distributionSetId: selectedDistribution.id, softwareModuleId: module.id });
      refetchDistributionSets();
    });
  };

  return (
    <>
      <DistributionSetModules distributionSet={selectedDistribution} onModuleDelete={handleModuleDelete} />
      {confirmDialog.isOpen && (
        <ConfirmationModal title='Confirm Unassignment' onClose={confirmDialog.close} onConfirm={confirmDialog.confirm} isOpen={confirmDialog.isOpen}>
          Are you sure you want to unassign module{' '}
          <span style={{ fontWeight: 'bold' }}>
            {confirmDialog.data?.name}
            {confirmDialog.data?.version}
          </span>
        </ConfirmationModal>
      )}
    </>
  );
}
