'use client';

import { useSoftwareModuleFiltersStore } from '@/stores/software-module-filters-store';
import SoftwareModuleFormContainer from '../../components/software-module-type-form';
import { useUpdateSoftwareModuleType } from '../../hooks/use-update-software-type-module';
import { SoftwareModuleTypeFormData } from '../../components/software-module-type-form/types';
import { useGetSoftwareModuleTypes } from '../../hooks/use-get-software-module-types';

export interface EditSoftwareModuleTypeFormContainerProps {
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

export default function EditSoftwareModuleTypeFormContainer({ onSubmitSuccess, onCancel }: EditSoftwareModuleTypeFormContainerProps) {
  const { refetch } = useGetSoftwareModuleTypes({ queryOptions: { enabled: false } });
  const { updateSoftwareModuleType } = useUpdateSoftwareModuleType();

  const selectedType = useSoftwareModuleFiltersStore((state) => state.selectedType);
  if (!selectedType) {
    return null;
  }

  const handleSubmit = async (data: SoftwareModuleTypeFormData) => {
    await updateSoftwareModuleType({ ...data, softwareModuleTypeId: selectedType.id });
    refetch();
    onSubmitSuccess();
  };

  return <SoftwareModuleFormContainer defaultValues={selectedType} onSubmit={handleSubmit} onCancel={onCancel} />;
}
