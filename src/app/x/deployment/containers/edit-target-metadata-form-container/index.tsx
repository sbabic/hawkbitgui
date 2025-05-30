'use client';

import MetadataForm from '@/app/components/metadata-form';
import { useTargetsMetadataTableStore } from '@/stores/targets-metadata-table-store';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { TargetsService } from '@/services/targets-service';

export interface EditTargetMetadataFormContainerProps {
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
}

export default function EditTargetMetadataFormContainer({ onSubmitSuccess, onCancel }: EditTargetMetadataFormContainerProps) {
  const fetchMetadata = useTargetsMetadataTableStore((state) => state.fetchMetadata);
  const selectedMetadata = useTargetsMetadataTableStore((state) => state.selectedMetadata);
  const selectedTarget = useTargetsTableStore((state) => state.selectedTarget);
  const handleSubmit = async (data: { key: string; value: string }) => {
    console.log('Form submitted:', data);
    if (!selectedTarget) return;
    await TargetsService.updateMetadata(selectedTarget.controllerId, { ...data });
    await fetchMetadata(selectedTarget.controllerId);
    onSubmitSuccess?.();
  };

  return <MetadataForm mode={'edit'} onSubmit={handleSubmit} onCancel={onCancel} defaultValues={{ ...selectedMetadata }} />;
}
