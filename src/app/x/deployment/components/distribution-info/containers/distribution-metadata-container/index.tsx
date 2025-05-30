'use client';

import { Modal } from '@/app/components/modal';
import { useState } from 'react';
import DistributionMetadata from '@/app/x/deployment/components/distribution-info/components/distribution-metadata';
import { useDistributionsTableStore } from '@/stores/distributions-table-store';
import { useDistributionMetadataTableStore } from '@/stores/distribution-metadata-table-store';
import { DistributionSetsService } from '@/services/distribution-sets-service';
import CreateMetadataForm from '@/app/components/metadata-form';

export default function DistributionMetadataContainer() {
  const selectedDistribution = useDistributionsTableStore((state) => state.selectedDistribution);
  const fetchMetadata = useDistributionMetadataTableStore((state) => state.fetchMetadata);
  const [isCreateMetadataModalOpen, setIsCreateMetadataModalOpen] = useState<boolean>(false);

  const handleOnAddClick = () => {
    setIsCreateMetadataModalOpen(true);
  };

  const handleOnSubmit = async (data: { key: string; value: string }) => {
    if (!selectedDistribution) return;
    await DistributionSetsService.createMetadata(selectedDistribution.id, data);
    await fetchMetadata(selectedDistribution.id);
    setIsCreateMetadataModalOpen(false);
  };

  return (
    <>
      <DistributionMetadata onAddClick={handleOnAddClick} />
      <Modal isOpen={isCreateMetadataModalOpen} onClose={() => setIsCreateMetadataModalOpen(false)} size={'fitContent'}>
        <CreateMetadataForm onSubmit={handleOnSubmit} />
      </Modal>
    </>
  );
}
