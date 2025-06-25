'use client';

import {} from '@/stores/software-module-filters-store';
import SoftwareModuleTypeForm from '../../components/software-module-type-form';
import { useCreateSoftwareModuleType } from '../../hooks/use-create-software-module-type';
import { SoftwareModuleTypeFormData } from '../../components/software-module-type-form/types';
import { useGetSoftwareModuleTypes } from '../../hooks/use-get-software-module-types';

export interface CreateSoftwareModuleTypeFormContainerProps {
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

export default function CreateSoftwareModuleTypeFormContainer({ onSubmitSuccess, onCancel }: CreateSoftwareModuleTypeFormContainerProps) {
  const { refetch } = useGetSoftwareModuleTypes({ queryOptions: { enabled: false } });
  const { createSoftwareModuleType } = useCreateSoftwareModuleType();

  const handleSubmit = async (data: SoftwareModuleTypeFormData) => {
    await createSoftwareModuleType(data);
    refetch();
    onSubmitSuccess();
  };

  return <SoftwareModuleTypeForm onSubmit={handleSubmit} onCancel={onCancel} />;
}
