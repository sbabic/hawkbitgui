'use client';

import Button from '@/app/components/button';
import { Modal } from '@/app/components/modal';
import { useModal } from '@/app/hooks';
import SoftwareModuleTypeFilterContainer from '../../containers/software-module-type-filter-container';
import CreateSoftwareModuleTypeFormContainer from '@/app/x/software-module-types/containers/create-software-module-type-form-container';

export default function SoftwareModuleTypeFilter() {
  const createNewTypeModal = useModal();

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <SoftwareModuleTypeFilterContainer />
        <Button variant='outline' onClick={createNewTypeModal.open}>
          + Create new type
        </Button>
      </div>
      {createNewTypeModal.isOpen && (
        <Modal isOpen={createNewTypeModal.isOpen} onClose={createNewTypeModal.close}>
          <Modal.Header>Create new type</Modal.Header>
          <Modal.Content>
            <CreateSoftwareModuleTypeFormContainer onSubmitSuccess={createNewTypeModal.close} onCancel={createNewTypeModal.close} />
          </Modal.Content>
        </Modal>
      )}
    </>
  );
}
