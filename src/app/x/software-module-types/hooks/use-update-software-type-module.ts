import { useMutation } from '@tanstack/react-query';
import { SoftwareModuleTypeFormData } from '../components/software-module-type-form/types';
import { SoftwareModuleTypesService } from '@/services/software-module-types-service';

export const useUpdateSoftwareModuleType = () => {
  const { mutateAsync: updateSoftwareModuleType, isPending } = useMutation({
    mutationFn: async (data: Partial<SoftwareModuleTypeFormData> & { softwareModuleTypeId: number }) => {
      return SoftwareModuleTypesService.updateType(data.softwareModuleTypeId, data);
    },
  });

  return { updateSoftwareModuleType, isPending };
};
