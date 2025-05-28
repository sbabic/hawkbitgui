'use client';

import TargetTagForm from '@/app/x/deployment/components/target-tag-form';
import { TargetTagsService } from '@/services/target-tags-service';
import { useTargetTagsStore } from '@/stores/targets-tags-store';

export interface EditTargetTagFormContainerProps {
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
}

export default function EditTargetTagFormContainer({ onSubmitSuccess, onCancel }: EditTargetTagFormContainerProps) {
  const fetchAllTags = useTargetTagsStore((state) => state.fetchAllTags);
  const selectedTag = useTargetTagsStore((state) => state.selectedTag);

  const handleSubmit = async (data: { name: string; description: string; color?: string }) => {
    if (!selectedTag) return;
    await TargetTagsService.updateTag({ ...data, id: selectedTag.id });
    await fetchAllTags();
    onSubmitSuccess?.();
  };

  return <TargetTagForm onSubmit={handleSubmit} mode={'edit'} onCancel={onCancel} defaultValues={{ ...selectedTag, color: selectedTag?.colour }} />;
}
