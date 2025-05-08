import { useUploadArtifact } from '@/app/x/upload/hooks/use-upload-artifact';
import SoftwareModuleTable from '../../components/software-module-table';
import { useGetSoftwareModules } from '../../hooks/use-get-software-modules';

export default function SoftwareModuleTableContainer() {
    const { data: softwareModules } = useGetSoftwareModules();

    const { uploadArtifact } = useUploadArtifact();

    return <SoftwareModuleTable modules={softwareModules ?? []} onFileSelect={(softwareModuleId, files) => uploadArtifact({ softwareModuleId, files })} />;
}
