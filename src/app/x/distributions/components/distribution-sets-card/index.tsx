'use client';

import Button from '@/app/components/button';
import IconButton from '@/app/components/icon-button';
import { Modal } from '@/app/components/modal';
import { useState, useEffect } from 'react';
import DistributionSetFormContainer from '../../containers/distribution-set-form-container';
import DistributionSetsTableContainer from '../../containers/distribution-sets-table-container';
import PanelCard from '@/app/components/panel-card';
import ExpandableSearchBarContainer from '@/app/x/deployment/containers/expandable-search-bar-container';
import FilterIcon from '@/app/components/icons/filter-icon';
import { useDistributionsSetsTableStore } from '@/stores/distribution-sets-table-store';
import ManageColumnsButton from '@/app/components/manage-columns-button';

export default function DistributionSetsCard() {
  const [isCreateDistributionSetFormOpen, setIsCreateDistributionSetFormOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleColumns = useDistributionsSetsTableStore((state) => state.visibleColumns);
  const setVisibleColumns = useDistributionsSetsTableStore((state) => state.setVisibleColumns);
  const expandColumnsVisibility = useDistributionsSetsTableStore((state) => state.expandColumnsVisibility);
  const resetColumnsVisibility = useDistributionsSetsTableStore((state) => state.resetColumnsVisibility);

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (isExpanded) {
      expandColumnsVisibility();
    } else {
      resetColumnsVisibility();
    }
  }, [isExpanded, expandColumnsVisibility, resetColumnsVisibility]);

  const openForm = () => {
    setIsCreateDistributionSetFormOpen(true);
  };

  const closeForm = () => {
    setIsCreateDistributionSetFormOpen(false);
  };

  return (
    <>
      <PanelCard defaultWidth='100%' expanded={isExpanded}>
        <PanelCard.Header title='Distributions' isExpanded={isExpanded} onToggleExpand={handleExpand}>
          <ExpandableSearchBarContainer />
        </PanelCard.Header>

        <PanelCard.Actions>
          <Button onClick={openForm}>+ New Distribution</Button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconButton onClick={() => {}}>
              <FilterIcon />
            </IconButton>
            {isExpanded && <ManageColumnsButton columns={visibleColumns} setVisibleColumns={setVisibleColumns} />}
          </div>
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
