import SoftwareModuleForm from '../../components/software-module-form';
import { useGetSoftwareModules } from '../../hooks/use-get-software-modules';
import { useCreateSoftwareModule } from '../../hooks/use-create-software-module';
import { useGetSoftwareModuleTypes } from '@/app/x/software-module-types/hooks/use-get-software-module-types';
import { CreateSoftwareModuleFormData } from '../../components/software-module-form/types';

export interface SoftwareModuleFormContainerProps {
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

export default function SoftwareModuleFormContainer({ onSubmitSuccess, onCancel }: SoftwareModuleFormContainerProps) {
  const { refetch } = useGetSoftwareModules({ queryOptions: { enabled: false } });
  const { createSoftwareModule } = useCreateSoftwareModule();

  const { data: softwareModuleTypes } = useGetSoftwareModuleTypes();

  const handleSubmit = async (data: CreateSoftwareModuleFormData) => {
    await createSoftwareModule([data]);
    onSubmitSuccess();
    refetch();
  };
  return <SoftwareModuleForm softwareModuleTypes={softwareModuleTypes ?? []} onSubmit={handleSubmit} onCancel={onCancel} />;
}
