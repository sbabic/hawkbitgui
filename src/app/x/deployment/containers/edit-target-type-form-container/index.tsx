'use client';

import { useTargetTypesStore } from '@/stores/targets-types-store';
import TargetTypeForm from '@/app/x/deployment/components/target-type-form';
import { TargetsTypesService } from '@/services/targets-types-service';

export interface EditTargetTagFormContainerProps {
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
}

export default function EditTargetTypeFormContainer({ onSubmitSuccess, onCancel }: EditTargetTagFormContainerProps) {
  const fetchAllTypes = useTargetTypesStore((state) => state.fetchAllTypes);
  const selectedType = useTargetTypesStore((state) => state.selectedType);

  const handleSubmit = async (data: { name: string; description: string; color?: string }) => {
    if (!selectedType) return;
    await TargetsTypesService.updateType({ ...data, id: selectedType.id });
    await fetchAllTypes();
    onSubmitSuccess?.();
  };

  return <TargetTypeForm onSubmit={handleSubmit} mode={'edit'} onCancel={onCancel} defaultValues={{ ...selectedType, color: selectedType?.colour }} />;
}
