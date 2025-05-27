'use client';

import TargetTagForm from '@/app/x/deployment/components/target-tag-form';
import { TargetTagsService } from '@/services/target-tags-service';
import { useTargetTagsStore } from '@/stores/targets-tags-store';

export interface CreateTargetTagFormContainerProps {
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
}

export default function CreateTargetTagFormContainer({ onSubmitSuccess, onCancel }: CreateTargetTagFormContainerProps) {
  const fetchAllTags = useTargetTagsStore((state) => state.fetchAllTags);
  const handleSubmit = async (data: { name: string; description: string; color?: string }) => {
    console.log('Form submitted:', data);
    await TargetTagsService.createTag({ ...data });
    await fetchAllTags();
    onSubmitSuccess?.();
  };

  return <TargetTagForm onSubmit={handleSubmit} mode={'create'} onCancel={onCancel} />;
}
