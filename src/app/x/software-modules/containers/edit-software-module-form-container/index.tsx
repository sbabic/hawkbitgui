import SoftwareModuleForm from '../../components/software-module-form';
import { useGetSoftwareModules } from '../../hooks/use-get-software-modules';
import { useGetSoftwareModuleTypes } from '@/app/x/software-module-types/hooks/use-get-software-module-types';
import { CreateSoftwareModuleFormData } from '../../components/software-module-form/types';
import { SoftwareModule } from '@/entities';
import { useUpdateSoftwareModule } from '../../hooks/use-update-software-module';

export interface EditSoftwareModuleFormContainerProps {
  softwareModule: SoftwareModule;
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

export default function EditSoftwareModuleFormContainer({ softwareModule, onSubmitSuccess, onCancel }: EditSoftwareModuleFormContainerProps) {
  const { refetch } = useGetSoftwareModules({ queryOptions: { enabled: false } });
  const { updateSoftwareModule } = useUpdateSoftwareModule();

  const { data: softwareModuleTypes } = useGetSoftwareModuleTypes();

  const handleSubmit = async (data: CreateSoftwareModuleFormData) => {
    await updateSoftwareModule({ softwareModuleId: softwareModule.id, ...data });
    onSubmitSuccess();
    refetch();
  };
  return <SoftwareModuleForm defaultValues={softwareModule} softwareModuleTypes={softwareModuleTypes ?? []} onSubmit={handleSubmit} onCancel={onCancel} />;
}
