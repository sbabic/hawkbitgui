'use client';

import Button from '@/app/components/button';
import { Modal } from '@/app/components/modal';
import { useModal } from '@/app/hooks';
import CreateDistributionTagFormContainer from '../../containers/create-distribution-tag-form-container';
import DistributionSetTagFilterContainer from '../../containers/distribution-set-tag-filter-container';

export default function DistributionSetTagFilter() {
  const createNewTagModal = useModal();

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <DistributionSetTagFilterContainer />
        <Button variant='outline' onClick={createNewTagModal.open}>
          + Create new tag
        </Button>
      </div>
      {createNewTagModal.isOpen && (
        <Modal isOpen={createNewTagModal.isOpen} onClose={createNewTagModal.close}>
          <Modal.Header>Create new tag</Modal.Header>
          <Modal.Content>
            <CreateDistributionTagFormContainer onSubmitSuccess={createNewTagModal.close} onCancel={createNewTagModal.close} />
          </Modal.Content>
        </Modal>
      )}
    </>
  );
}
