'use client';

import styles from './styles.module.scss';
import Card from '@/app/components/card';
import Button from '@/app/components/button';
import FolderIcon from '@/app/components/icons/folder-icon';
import TargetTable from '@/app/components/target-table';
import IconButton from '@/app/components/icon-button';
import SearchIcon from '@/app/components/icons/search-icon';
import ExpandIcon from '@/app/components/icons/expand-icon';
import { useState } from 'react';
import MinimizeIcon from '@/app/components/icons/minimize-icon';
import TargetInfoModal from '@/app/components/target-info-modal';
import Modal from '@/app/components/modal';
import CreateTargetForm from '@/app/components/create-target-form';
import FilterIcon from '@/app/components/icons/filter-icon';
import TargetFilters from '@/app/components/target-filters';

export default function TargetsCard() {
    const [isExpanded, setIsExpanded] = useState(false);

    const [isTargetInfoModalOpen, setIsTargetInfoModalOpen] = useState(false);
    const [isCreateTargetFormOpen, setIsCreateTargetFormOpen] = useState(false);
    const [isTargetFiltersModalOpen, setIsTargetFiltersModalOpen] =
        useState(false);

    const handleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <>
            <Card expanded={isExpanded}>
                <div className={styles.cardBody}>
                    <div className={`${styles.header}`}>
                        <h2>Targets</h2>
                        <div className={`${styles.headerButtons}`}>
                            <IconButton width={'30px'} height={'30px'}>
                                <SearchIcon />
                            </IconButton>
                            <IconButton
                                width={'30px'}
                                height={'30px'}
                                onClick={handleExpand}
                            >
                                {isExpanded ? <MinimizeIcon /> : <ExpandIcon />}
                            </IconButton>
                        </div>
                    </div>
                    <div className={styles.actionButtons}>
                        <Button onClick={() => setIsCreateTargetFormOpen(true)}>
                            + New target
                        </Button>
                        <Button
                            color={'outline'}
                            className={styles.bulkUploadButton}
                        >
                            <FolderIcon />
                            Bulk Upload Targets
                        </Button>
                        <IconButton
                            className={styles.filterButton}
                            onClick={() => setIsTargetFiltersModalOpen(true)}
                        >
                            <FilterIcon />
                        </IconButton>
                    </div>
                    <div className={styles.table}>
                        <TargetTable
                            expanded={isExpanded}
                            onTargetNameClick={() => {
                                setIsTargetInfoModalOpen(true);
                            }}
                        />
                    </div>
                </div>
            </Card>
            <TargetInfoModal
                isOpen={isTargetInfoModalOpen}
                onClose={() => setIsTargetInfoModalOpen(false)}
            />
            <Modal
                isOpen={isCreateTargetFormOpen}
                onClose={() => setIsCreateTargetFormOpen(false)}
            >
                <CreateTargetForm onSubmit={() => {}} />
            </Modal>
            <Modal
                isOpen={isTargetFiltersModalOpen}
                onClose={() => setIsTargetFiltersModalOpen(false)}
            >
                <TargetFilters />
            </Modal>
        </>
    );
}
