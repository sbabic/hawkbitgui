'use client';

import TargetTypeForm from '@/app/x/deployment/components/target-type-form';
import { useTargetTypesStore } from '@/stores/targets-types-store';
import { TargetsTypesService } from '@/services/targets-types-service';

export interface CreateTargetTagFormContainerProps {
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
}

export default function CreateTargetTypeFormContainer({ onSubmitSuccess, onCancel }: CreateTargetTagFormContainerProps) {
  const fetchAllTypes = useTargetTypesStore((state) => state.fetchAllTypes);
  const handleSubmit = async (data: { name: string; description: string; color?: string }) => {
    console.log('Form submitted:', data);
    await TargetsTypesService.createType({ ...data });
    await fetchAllTypes();
    onSubmitSuccess?.();
  };

  return <TargetTypeForm onSubmit={handleSubmit} mode={'create'} onCancel={onCancel} />;
}
