'use client';

import styles from './styles.module.scss';
import Card from '@/app/components/card';
import Button from '@/app/components/button';
import IconButton from '@/app/components/icon-button';
import SearchIcon from '@/app/components/icons/search-icon';
import ChevronDownIcon from '@/app/components/icons/chevron-down-icon';
import RolloutsTableContainer from '../../containers/rollouts-table-container';
import PlusIcon from '@/app/components/icons/plus-icon';
import Modal from '@/app/components/modal';
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
        <div>
            <Card expanded={true}>
                <div className={styles.cardBody}>
                    <div className={styles.header}>
                        <h2>Rollouts</h2>
                        <div className={styles.headerButtons}>
                            <IconButton width='30px' height='30px'>
                                <SearchIcon />
                            </IconButton>
                            <Button leftIcon={<PlusIcon width={18} height={18} />} onClick={openForm}>
                                Create new rollout
                            </Button>
                            <Button variant='ghost' rightIcon={<ChevronDownIcon width={18} height={18} />}>
                                Manage columns
                            </Button>
                        </div>
                    </div>
                    <div className={styles.table}>
                        <RolloutsTableContainer />
                    </div>
                </div>
            </Card>
            <Modal isOpen={isCreateRolloutFormOpen} onClose={closeForm}>
                <RolloutFormContainer onSubmitSuccess={closeForm} onCancel={closeForm} />
            </Modal>
        </div>
    );
}
