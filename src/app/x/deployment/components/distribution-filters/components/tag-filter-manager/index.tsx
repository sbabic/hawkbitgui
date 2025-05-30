'use client';

import styles from './styles.module.scss';
import Button from '@/app/components/button';
import { Modal } from '@/app/components/modal';
import { useModal } from '@/app/hooks';
import ByTagsFilterContainer from '@/app/x/deployment/components/distribution-filters/containers/by-tags-filter-container';
import CreateDistributionTagFormContainer from '@/app/x/deployment/containers/create-distribution-tag-form-container';

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
        <CreateDistributionTagFormContainer onSubmitSuccess={createNewTagModal.close} onCancel={createNewTagModal.close} />
      </Modal>
    </>
  );
}
