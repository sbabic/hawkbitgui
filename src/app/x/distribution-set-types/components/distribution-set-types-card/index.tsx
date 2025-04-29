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
import DistributionSetTypesTableContainer from '../../containers/distribution-set-type-table-container';
import DistributionSetTypeFormContainer from '../../containers/distribution-set-type-form-container';

export default function DistributionSetTypesCard() {
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

    const openForm = () => {
        setIsCreateFormOpen(true);
    };

    const closeForm = () => {
        setIsCreateFormOpen(false);
    };

    return (
        <div>
            <Card expanded={true}>
                <div className={styles.cardBody}>
                    <div className={styles.header}>
                        <h2>Distribution Set Types</h2>
                        <div className={styles.headerButtons}>
                            <IconButton width='30px' height='30px'>
                                <SearchIcon />
                            </IconButton>
                            <Button leftIcon={<PlusIcon width={18} height={18} />} onClick={openForm}>
                                Create new type
                            </Button>
                            <Button variant='ghost' rightIcon={<ChevronDownIcon width={18} height={18} />}>
                                Manage columns
                            </Button>
                        </div>
                    </div>
                    <div className={styles.table}>
                        <DistributionSetTypesTableContainer />
                    </div>
                </div>
            </Card>
            <Modal isOpen={isCreateFormOpen} onClose={closeForm}>
                <Modal.Header>Create new distribution set type</Modal.Header>
                <Modal.Content>
                    <DistributionSetTypeFormContainer onSubmitSuccess={closeForm} onCancel={closeForm} />
                </Modal.Content>
            </Modal>
        </div>
    );
}
