'use client';

import { Modal } from '@/app/components/modal';
import { useState } from 'react';
import CreateMetadataForm from '@/app/components/metadata-form';
import { useSoftwareModulesStore } from '@/stores/software-modules-store';
import { useGetSoftwareModuleMetadata } from '../../hooks/use-get-software-module-metadata';
import SoftwareModuleMetadata from '../../components/software-module-metadata';
import { Metadata } from '@/entities';
import { useCreateSoftwareModuleMetadata } from '../../hooks/use-create-software-module-metadata';

export default function SoftwareModuleMetadataContainer() {
  const selectedSoftwareModule = useSoftwareModulesStore((state) => state.selectedSoftwareModule);
  const [isCreateMetadataModalOpen, setIsCreateMetadataModalOpen] = useState<boolean>(false);

  const { refetch: refetchSoftwareModuleMetadata } = useGetSoftwareModuleMetadata(selectedSoftwareModule?.id ?? 0, {
    queryOptions: { enabled: false },
  });
  const { createSoftwareModuleMetadata } = useCreateSoftwareModuleMetadata();

  const handleAddClick = () => {
    setIsCreateMetadataModalOpen(true);
  };

  const handleSubmit = async (data: Metadata) => {
    if (!selectedSoftwareModule) {
      return;
    }

    await createSoftwareModuleMetadata({ softwareModuleId: selectedSoftwareModule.id, metadata: data });
    refetchSoftwareModuleMetadata();
    setIsCreateMetadataModalOpen(false);
  };

  return (
    <>
      <SoftwareModuleMetadata onAddClick={handleAddClick} />
      <Modal isOpen={isCreateMetadataModalOpen} onClose={() => setIsCreateMetadataModalOpen(false)} size={'fitContent'}>
        <CreateMetadataForm onSubmit={handleSubmit} mode={'create'} />
      </Modal>
    </>
  );
}
