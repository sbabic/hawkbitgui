'use client';

import MetadataForm from '@/app/components/metadata-form';
import { DistributionSetsService } from '@/services/distribution-sets-service';
import { useDistributionMetadataTableStore } from '@/stores/distribution-metadata-table-store';
import { useDistributionsTableStore } from '@/stores/distributions-table-store';

export interface EditDistributionMetadataFormContainerProps {
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
}

export default function EditDistributionMetadataFormContainer({ onSubmitSuccess, onCancel }: EditDistributionMetadataFormContainerProps) {
  const fetchMetadata = useDistributionMetadataTableStore((state) => state.fetchMetadata);
  const selectedMetadata = useDistributionMetadataTableStore((state) => state.selectedMetadata);
  const selectedDistribution = useDistributionsTableStore((state) => state.selectedDistribution);
  const handleSubmit = async (data: { key: string; value: string }) => {
    console.log('Form submitted:', data);
    if (!selectedDistribution) return;
    await DistributionSetsService.updateMetadata(selectedDistribution.id, { ...data });
    await fetchMetadata(selectedDistribution.id);
    onSubmitSuccess?.();
  };

  return <MetadataForm mode={'edit'} onSubmit={handleSubmit} onCancel={onCancel} defaultValues={{ ...selectedMetadata }} />;
}
