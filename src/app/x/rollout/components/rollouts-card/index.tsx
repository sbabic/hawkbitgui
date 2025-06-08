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
import { useRolloutsPageStore } from '@/stores/rollouts-page-store';
import RolloutDetailsTableContainer from '../../containers/rollout-details-table-container';
import { RolloutsDetailsCardHeader } from '../rollouts-details-card-header';
import RolloutDeployGroupDetailsContainer from '../../containers/rollout-deploy-group-details-container';
import { RolloutsDeployGroupTargetDetailsCardHeader } from '../rollout-deploy-group-target-details-header';

export default function RolloutsCard() {
  const [isCreateRolloutFormOpen, setIsCreateRolloutFormOpen] = useState(false);
  const selectedRollout = useRolloutsPageStore((state) => state.selectedRollout);
  const selectedDeployGroup = useRolloutsPageStore((state) => state.selectedDeployGroup);
  const tableType = useRolloutsPageStore((state) => state.tableType);
  const setTableType = useRolloutsPageStore((state) => state.setTableType);

  const openForm = () => {
    setIsCreateRolloutFormOpen(true);
  };

  const closeForm = () => {
    setIsCreateRolloutFormOpen(false);
  };

  return (
    <div>
      <Card expanded={true}>
        <Card.Header>
          <Card.Title>
            {tableType === 'rollouts' && 'Rollouts'}
            {tableType === 'deploy-groups' && selectedRollout && (
              <RolloutsDetailsCardHeader rolloutName={selectedRollout.name} onRolloutsClick={() => setTableType('rollouts')} />
            )}
            {tableType === 'deploy-group-targets' && selectedRollout && selectedDeployGroup && (
              <RolloutsDeployGroupTargetDetailsCardHeader
                rolloutName={selectedRollout.name}
                deployGroupName={selectedDeployGroup.name}
                onRolloutsClick={() => setTableType('rollouts')}
                onDeployGroupNameClick={() => setTableType('deploy-groups')}
              />
            )}
          </Card.Title>
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
          {tableType === 'rollouts' && <RolloutsTableContainer />}
          {tableType === 'deploy-groups' && selectedRollout && <RolloutDetailsTableContainer />}
          {tableType === 'deploy-group-targets' && selectedRollout && selectedDeployGroup && <RolloutDeployGroupDetailsContainer />}
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
    </div>
  );
}
