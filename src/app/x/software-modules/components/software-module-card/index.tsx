import Button from '@/app/components/button';
import IconButton from '@/app/components/icon-button';
import { Modal } from '@/app/components/modal';
import { useState } from 'react';
import SoftwareModuleTableContainer from '../../containers/software-module-table-container';
import SoftwareModuleFormContainer from '../../containers/software-module-form-container';
import PanelCard from '@/app/components/panel-card';
import ExpandableSearchBarContainer from '@/app/x/deployment/containers/expandable-search-bar-container';
import FilterIcon from '@/app/components/icons/filter-icon';

export default function SoftwareModulesCard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      <PanelCard defaultWidth='100%' expanded={isExpanded}>
        <PanelCard.Header title='Software Modules' isExpanded={isExpanded} onToggleExpand={handleExpand}>
          <ExpandableSearchBarContainer />
        </PanelCard.Header>

        <PanelCard.Actions>
          <Button onClick={openForm}>+ New Software Module</Button>
          <IconButton onClick={() => {}}>
            <FilterIcon />
          </IconButton>
        </PanelCard.Actions>

        <PanelCard.Content>
          <SoftwareModuleTableContainer />
        </PanelCard.Content>
      </PanelCard>
      <Modal isOpen={isFormOpen} onClose={closeForm}>
        <Modal.Header>Create new software module</Modal.Header>
        <Modal.Content>
          <SoftwareModuleFormContainer onSubmitSuccess={closeForm} onCancel={closeForm} />
        </Modal.Content>
      </Modal>
    </div>
  );
}
