'use client';

import Card from '@/app/components/card';
import Button from '@/app/components/button';
import IconButton from '@/app/components/icon-button';
import SearchIcon from '@/app/components/icons/search-icon';
import ChevronDownIcon from '@/app/components/icons/chevron-down-icon';
import RolloutsTableContainer from '../../containers/rollouts-table-container';
import PlusIcon from '@/app/components/icons/plus-icon';
import { Modal } from '@/app/components/modal';
import { useState } from 'react';
import RolloutFormContainer from '../../containers/rollout-form-container';

export default function RolloutsCard() {
  const [isCreateRolloutFormOpen, setIsCreateRolloutFormOpen] = useState(false);

  const openForm = () => {
    setIsCreateRolloutFormOpen(true);
  };

  const closeForm = () => {
    setIsCreateRolloutFormOpen(false);
  };

  return (
    <>
      <Card expanded={true}>
        <Card.Header>
          <Card.Title>Rollouts</Card.Title>
          <Card.Actions>
            <IconButton width='30px' height='30px'>
              <SearchIcon />
            </IconButton>
            <Button leftIcon={<PlusIcon width={18} height={18} />} onClick={openForm}>
              Create new rollout
            </Button>
            <Button variant='ghost' rightIcon={<ChevronDownIcon width={18} height={18} />}>
              Manage columns
            </Button>
          </Card.Actions>
        </Card.Header>
        <Card.Body>
          <RolloutsTableContainer />
        </Card.Body>
      </Card>
      <Modal size='xl' isOpen={isCreateRolloutFormOpen} onClose={closeForm}>
        <Modal.Header>Create new rollout</Modal.Header>
        <Modal.Content>
          <div style={{ maxHeight: '82vh', overflow: 'auto' }}>
            <RolloutFormContainer onSubmitSuccess={closeForm} onCancel={closeForm} />
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}
