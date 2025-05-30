'use client';

import Button from '@/app/components/button';
import IconButton from '@/app/components/icon-button';
import { Modal } from '@/app/components/modal';
import { useState } from 'react';
import DistributionSetFormContainer from '../../containers/distribution-set-form-container';
import DistributionSetsTableContainer from '../../containers/distribution-sets-table-container';
import PanelCard from '@/app/components/panel-card';
import ExpandableSearchBarContainer from '@/app/x/deployment/containers/expandable-search-bar-container';
import FilterIcon from '@/app/components/icons/filter-icon';

export default function DistributionSetsCard() {
  const [isCreateDistributionSetFormOpen, setIsCreateDistributionSetFormOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const openForm = () => {
    setIsCreateDistributionSetFormOpen(true);
  };

  const closeForm = () => {
    setIsCreateDistributionSetFormOpen(false);
  };

  return (
    <>
      <PanelCard expanded={isExpanded}>
        <PanelCard.Header title='Distributions' isExpanded={isExpanded} onToggleExpand={handleExpand}>
          <ExpandableSearchBarContainer />
        </PanelCard.Header>

        <PanelCard.Actions>
          <Button onClick={openForm}>+ New Distribution</Button>
          <IconButton onClick={() => {}}>
            <FilterIcon />
          </IconButton>
        </PanelCard.Actions>

        <PanelCard.Content>
          <DistributionSetsTableContainer />
        </PanelCard.Content>
      </PanelCard>
      <Modal isOpen={isCreateDistributionSetFormOpen} onClose={closeForm}>
        <Modal.Header>Create new distribution set</Modal.Header>
        <Modal.Content>
          <DistributionSetFormContainer onSubmitSuccess={closeForm} onCancel={closeForm} />
        </Modal.Content>
      </Modal>
    </>
  );
}
