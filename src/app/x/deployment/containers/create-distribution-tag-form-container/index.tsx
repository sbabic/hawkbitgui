'use client';

import DistributionTagForm from '@/app/x/deployment/components/distribution-tag-form';
import { DistributionSetTagsService } from '@/services/distribution-set-tags-service';
import { useDistributionTagsStore } from '@/stores/distributions-tags-store';

export interface CreateTargetTagFormContainerProps {
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
}

export default function CreateDistributionTagFormContainer({ onSubmitSuccess, onCancel }: CreateTargetTagFormContainerProps) {
  const fetchAllTags = useDistributionTagsStore((state) => state.fetchAllTags);
  const handleSubmit = async (data: { name: string; description: string; color?: string }) => {
    console.log('Form submitted:', data);
    await DistributionSetTagsService.createTag({ ...data });
    await fetchAllTags();
    onSubmitSuccess?.();
  };

  return <DistributionTagForm onSubmit={handleSubmit} mode={'create'} onCancel={onCancel} />;
}
