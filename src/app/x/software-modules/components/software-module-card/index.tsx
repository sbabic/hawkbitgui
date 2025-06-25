import Button from '@/app/components/button';
import IconButton from '@/app/components/icon-button';
import { Modal } from '@/app/components/modal';
import { useState } from 'react';
import SoftwareModuleTableContainer from '../../containers/software-module-table-container';
import SoftwareModuleFormContainer from '../../containers/software-module-form-container';
import PanelCard from '@/app/components/panel-card';
import ExpandableSearchBarContainer from '@/app/x/deployment/containers/expandable-search-bar-container';
import FilterIcon from '@/app/components/icons/filter-icon';
import { useModal } from '@/app/hooks';
import SoftwareModuleFilters from '../software-module-filters';

export default function SoftwareModulesCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const formModal = useModal();
  const filtersModal = useModal();

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <PanelCard defaultWidth='100%' expanded={isExpanded}>
        <PanelCard.Header title='Software Modules' isExpanded={isExpanded} onToggleExpand={handleExpand}>
          <ExpandableSearchBarContainer />
        </PanelCard.Header>

        <PanelCard.Actions>
          <Button onClick={formModal.open}>+ New Software Module</Button>
          <IconButton onClick={filtersModal.open} style={{ padding: '4px' }}>
            <FilterIcon />
          </IconButton>
        </PanelCard.Actions>

        <PanelCard.Content>
          <SoftwareModuleTableContainer />
        </PanelCard.Content>
      </PanelCard>
      {formModal.isOpen && (
        <Modal isOpen={formModal.isOpen} onClose={formModal.close}>
          <Modal.Header>Create new software module</Modal.Header>
          <Modal.Content>
            <SoftwareModuleFormContainer onSubmitSuccess={formModal.close} onCancel={formModal.close} />
          </Modal.Content>
        </Modal>
      )}
      {filtersModal.isOpen && (
        <Modal isOpen={filtersModal.isOpen} onClose={filtersModal.close} size={'fitContent'}>
          <SoftwareModuleFilters />
        </Modal>
      )}
    </>
  );
}
