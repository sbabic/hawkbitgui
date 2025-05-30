'use client';

import { Modal } from '@/app/components/modal';
import { useState } from 'react';
import CreateMetadataForm from '@/app/components/metadata-form';
import { useDistributionsSetsTableStore } from '@/stores/distribution-sets-table-store';
import { Metadata } from '@/entities';
import DistributionSetMetadata from '../../components/distribution-set-metadata';
import { useCreateDistributionSetMetadata } from '../../hooks/use-create-distribution-set-metadata';
import { useGetDistributionSetMetadata } from '../../hooks/use-get-distribution-set-metadata';

export default function DistributionSetMetadataContainer() {
  const selectedDistribution = useDistributionsSetsTableStore((state) => state.selectedDistribution);
  const [isCreateMetadataModalOpen, setIsCreateMetadataModalOpen] = useState<boolean>(false);

  const { refetch: refetchDistributionSetMetadata } = useGetDistributionSetMetadata(selectedDistribution?.id ?? 0, {
    queryOptions: { enabled: false },
  });
  const { createDistributionSetMetadata } = useCreateDistributionSetMetadata();

  const handleAddClick = () => {
    setIsCreateMetadataModalOpen(true);
  };

  const handleSubmit = async (data: Metadata) => {
    if (!selectedDistribution) {
      return;
    }

    await createDistributionSetMetadata({ distributionSetId: selectedDistribution.id, metadata: data });
    refetchDistributionSetMetadata();
    setIsCreateMetadataModalOpen(false);
  };

  return (
    <>
      <DistributionSetMetadata onAddClick={handleAddClick} />
      <Modal isOpen={isCreateMetadataModalOpen} onClose={() => setIsCreateMetadataModalOpen(false)} size={'fitContent'}>
        <CreateMetadataForm onSubmit={handleSubmit} mode={'create'} />
      </Modal>
    </>
  );
}
