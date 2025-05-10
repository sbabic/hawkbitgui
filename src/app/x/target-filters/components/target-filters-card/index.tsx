import Card from '@/app/components/card';
import Button from '@/app/components/button';
import IconButton from '@/app/components/icon-button';
import SearchIcon from '@/app/components/icons/search-icon';
import PlusIcon from '@/app/components/icons/plus-icon';
import { Modal } from '@/app/components/modal';
import { useState } from 'react';
import TargetFiltersTableContainer from '../../containers/target-filters-table-container';
import TargetFiltersFormContainer from '../../containers/target-filters-form-container';

export default function TargetFiltersCard() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      <Card expanded={true}>
        <Card.Header>
          <Card.Title>Target Filters</Card.Title>
          <Card.Actions>
            <IconButton width='30px' height='30px'>
              <SearchIcon />
            </IconButton>
            <Button leftIcon={<PlusIcon width={18} height={18} />} onClick={openForm}>
              Create new filter
            </Button>
          </Card.Actions>
        </Card.Header>
        <Card.Body>
          <TargetFiltersTableContainer />
        </Card.Body>
      </Card>
      <Modal isOpen={isFormOpen} onClose={closeForm}>
        <Modal.Header>Create new software module</Modal.Header>
        <Modal.Content>
          <TargetFiltersFormContainer onSubmitSuccess={closeForm} onCancel={closeForm} />
        </Modal.Content>
      </Modal>
    </div>
  );
}
