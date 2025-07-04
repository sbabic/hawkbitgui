'use client';

import Card from '@/app/components/card';
import Button from '@/app/components/button';
import IconButton from '@/app/components/icon-button';
import SearchIcon from '@/app/components/icons/search-icon';
import RolloutsTableContainer from '../../containers/rollouts-table-container';
import PlusIcon from '@/app/components/icons/plus-icon';
import { Modal } from '@/app/components/modal';
import { useState } from 'react';
import { useRolloutsPageStore } from '@/stores/rollouts-page-store';
import RolloutDetailsTableContainer from '../../containers/rollout-details-table-container';
import { RolloutsDetailsCardHeader } from '../rollouts-details-card-header';
import RolloutDeployGroupDetailsContainer from '../../containers/rollout-deploy-group-details-container';
import { RolloutsDeployGroupTargetDetailsCardHeader } from '../rollout-deploy-group-target-details-header';
import CreateRolloutFormContainer from '../../containers/create-rollout-form-container';
import StaticCard from '@/app/components/static-card';
import ManageColumnsButton from '@/app/components/manage-columns-button';
import { useRolloutsTableStore } from '@/stores/rollouts-table-store';

export default function RolloutsCard() {
  const [isCreateRolloutFormOpen, setIsCreateRolloutFormOpen] = useState(false);
  const selectedRollout = useRolloutsPageStore((state) => state.selectedRollout);
  const selectedDeployGroup = useRolloutsPageStore((state) => state.selectedDeployGroup);
  const tableType = useRolloutsPageStore((state) => state.tableType);
  const visibleColumns = useRolloutsTableStore((state) => state.visibleColumns);
  const setVisibleColumns = useRolloutsTableStore((state) => state.setVisibleColumns);
  const setTableType = useRolloutsPageStore((state) => state.setTableType);

  const openForm = () => {
    setIsCreateRolloutFormOpen(true);
  };

  const closeForm = () => {
    setIsCreateRolloutFormOpen(false);
  };

  return (
    <>
      <StaticCard>
        <StaticCard.Header>
          <StaticCard.Title>
            {tableType === 'rollouts' && 'Rollouts'}
            {tableType === 'deploy-groups' && selectedRollout && (
              <RolloutsDetailsCardHeader rolloutName={selectedRollout.name} onRolloutsClick={() => setTableType({ tableType: 'rollouts' })} />
            )}
            {tableType === 'deploy-group-targets' && selectedRollout && selectedDeployGroup && (
              <RolloutsDeployGroupTargetDetailsCardHeader
                rolloutName={selectedRollout.name}
                deployGroupName={selectedDeployGroup.name}
                onRolloutsClick={() => setTableType({ tableType: 'rollouts' })}
                onDeployGroupNameClick={() => setTableType({ tableType: 'deploy-groups', selectedRollout: selectedRollout })}
              />
            )}
          </StaticCard.Title>
          <StaticCard.Actions>
            <IconButton width='30px' height='30px'>
              <SearchIcon />
            </IconButton>
            <Button leftIcon={<PlusIcon width={18} height={18} />} onClick={openForm}>
              Create new rollout
            </Button>
            <ManageColumnsButton columns={visibleColumns} setVisibleColumns={setVisibleColumns} />
          </StaticCard.Actions>
        </StaticCard.Header>
        <Card.Body>
          {tableType === 'rollouts' && <RolloutsTableContainer />}
          {tableType === 'deploy-groups' && selectedRollout && <RolloutDetailsTableContainer />}
          {tableType === 'deploy-group-targets' && selectedRollout && selectedDeployGroup && <RolloutDeployGroupDetailsContainer />}
        </Card.Body>
      </StaticCard>
      <Modal size='xl' isOpen={isCreateRolloutFormOpen} onClose={closeForm}>
        <Modal.Header>Create new rollout</Modal.Header>
        <Modal.Content>
          <div style={{ maxHeight: '82vh', overflow: 'auto' }}>
            <CreateRolloutFormContainer onSubmitSuccess={closeForm} onCancel={closeForm} />
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}
