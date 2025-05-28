'use client';

import styles from './styles.module.scss';
import ByTagsFilterContainer from '@/app/components/target-filters/containers/by-tags-filter-container';
import Button from '@/app/components/button';
import { Modal } from '@/app/components/modal';
import { useModal } from '@/app/hooks';
import CreateTargetTagFormContainer from '@/app/x/deployment/containers/create-target-tag-form-container';

export default function TagFilterManager() {
  const createNewTagModal = useModal();
  return (
    <>
      <div className={styles.container}>
        <ByTagsFilterContainer />
        <Button variant='outline' onClick={createNewTagModal.open}>
          + Create new tag
        </Button>
      </div>
      <Modal isOpen={createNewTagModal.isOpen} onClose={createNewTagModal.close}>
        <CreateTargetTagFormContainer onSubmitSuccess={createNewTagModal.close} onCancel={createNewTagModal.close} />
      </Modal>
    </>
  );
}
