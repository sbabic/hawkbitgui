'use client';

import styles from './styles.module.scss';
import Card from '@/app/components/card';
import Button from '@/app/components/button';
import IconButton from '@/app/components/icon-button';
import SearchIcon from '@/app/components/icons/search-icon';
import ChevronDownIcon from '@/app/components/icons/chevron-down-icon';
import PlusIcon from '@/app/components/icons/plus-icon';
import { Modal } from '@/app/components/modal';
import { useState } from 'react';
import DistributionSetFormContainer from '../../containers/distribution-set-form-container';
import DistributionSetsTableContainer from '../../containers/distribution-sets-table-container';

export default function DistributionSetsCard() {
    const [isCreateDistributionSetFormOpen, setIsCreateDistributionSetFormOpen] = useState(false);

    const openForm = () => {
        setIsCreateDistributionSetFormOpen(true);
    };

    const closeForm = () => {
        setIsCreateDistributionSetFormOpen(false);
    };

    return (
        <div>
            <Card expanded={true}>
                <div className={styles.cardBody}>
                    <div className={styles.header}>
                        <h2>Distribution Sets</h2>
                        <div className={styles.headerButtons}>
                            <IconButton width='30px' height='30px'>
                                <SearchIcon />
                            </IconButton>
                            <Button leftIcon={<PlusIcon width={18} height={18} />} onClick={openForm}>
                                Create new distribution
                            </Button>
                            <Button variant='ghost' rightIcon={<ChevronDownIcon width={18} height={18} />}>
                                Manage columns
                            </Button>
                        </div>
                    </div>
                    <div className={styles.table}>
                        <DistributionSetsTableContainer />
                    </div>
                </div>
            </Card>
            <Modal isOpen={isCreateDistributionSetFormOpen} onClose={closeForm}>
                <Modal.Header>Create new distribution set</Modal.Header>
                <Modal.Content>
                    <DistributionSetFormContainer onSubmitSuccess={closeForm} onCancel={closeForm} />
                </Modal.Content>
            </Modal>
        </div>
    );
}
