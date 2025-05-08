import { CreateSoftwareModuleInput } from '@/services/software-modules-service.types';

import SoftwareModuleForm from '../../components/software-module-form';
import { useGetSoftwareModules } from '../../hooks/use-get-software-modules';
import { useCreateSoftwareModule } from '../../hooks/use-create-software-module';

export interface SoftwareModuleFormContainerProps {
    onSubmitSuccess: () => void;
    onCancel: () => void;
}

export default function SoftwareModuleFormContainer({ onSubmitSuccess, onCancel }: SoftwareModuleFormContainerProps) {
    const { refetch } = useGetSoftwareModules({ queryOptions: { enabled: false } });
    const { createSoftwareModule } = useCreateSoftwareModule();

    const handleSubmit = async (data: CreateSoftwareModuleInput) => {
        await createSoftwareModule([data]);
        onSubmitSuccess();
        refetch();
    };
    return <SoftwareModuleForm onSubmit={handleSubmit} onCancel={onCancel} />;
}
