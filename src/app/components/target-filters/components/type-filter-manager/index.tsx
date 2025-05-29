'use client';

import styles from './styles.module.scss';
import Button from '@/app/components/button';
import { Modal } from '@/app/components/modal';
import { useModal } from '@/app/hooks';
import CreateTargetTypeFormContainer from '@/app/x/deployment/containers/create-target-type-form-container';
import ByTypeFilterContainer from '@/app/components/target-filters/containers/by-type-filter-container';

export default function TypeFilterManager() {
  const createNewTagModal = useModal();
  return (
    <>
      <div className={styles.container}>
        <ByTypeFilterContainer />
        <Button variant='outline' onClick={createNewTagModal.open}>
          + Create new type
        </Button>
      </div>
      <Modal isOpen={createNewTagModal.isOpen} onClose={createNewTagModal.close}>
        <CreateTargetTypeFormContainer onSubmitSuccess={createNewTagModal.close} onCancel={createNewTagModal.close} />
      </Modal>
    </>
  );
}
