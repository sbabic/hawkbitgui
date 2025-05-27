'use client';

import TargetTagForm from '@/app/x/deployment/components/target-tag-form';
import { TargetTagsService } from '@/services/target-tags-service';

export interface CreateTargetTagFormContainerProps {
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
}

export default function CreateTargetTagFormContainer({ onSubmitSuccess, onCancel }: CreateTargetTagFormContainerProps) {
  const handleSubmit = async (data: { name: string; description: string; color?: string }) => {
    await TargetTagsService.createTag({ ...data });
    onSubmitSuccess?.();
  };

  return <TargetTagForm onSubmit={handleSubmit} mode={'create'} onCancel={onCancel} />;
}
