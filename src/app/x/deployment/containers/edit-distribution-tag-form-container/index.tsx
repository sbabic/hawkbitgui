'use client';

import { useDistributionTagsStore } from '@/stores/distributions-tags-store';
import { DistributionSetTagsService } from '@/services/distribution-set-tags-service';
import DistributionTagForm from '@/app/x/deployment/components/distribution-tag-form';

export interface EditDistributionTagFormContainerProps {
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
}

export default function EditDistributionTagFormContainer({ onSubmitSuccess, onCancel }: EditDistributionTagFormContainerProps) {
  const fetchAllTags = useDistributionTagsStore((state) => state.fetchAllTags);
  const selectedTag = useDistributionTagsStore((state) => state.selectedTag);

  const handleSubmit = async (data: { name: string; description: string; color?: string }) => {
    if (!selectedTag) return;
    await DistributionSetTagsService.updateTag({ ...data, id: selectedTag.id });
    await fetchAllTags();
    onSubmitSuccess?.();
  };

  return <DistributionTagForm onSubmit={handleSubmit} mode={'edit'} onCancel={onCancel} defaultValues={{ ...selectedTag, color: selectedTag?.colour }} />;
}
