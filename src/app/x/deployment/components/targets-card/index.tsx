'use client';

import styles from './styles.module.scss';
import Card from '@/app/components/card';
import Button from '@/app/components/button';
import FolderIcon from '@/app/components/icons/folder-icon';
import IconButton from '@/app/components/icon-button';
import SearchIcon from '@/app/components/icons/search-icon';
import ExpandIcon from '@/app/components/icons/expand-icon';
import MinimizeIcon from '@/app/components/icons/minimize-icon';
import Modal from '@/app/components/modal';
import FilterIcon from '@/app/components/icons/filter-icon';

import TargetInfo from '@/app/components/target-info-modal';
import TargetFilters from '@/app/components/target-filters';
import TargetTableContainer from '@/app/containers/target-table-container';
import CreateTargetFormContainer from '@/app/containers/create-target-form-container';
import { Target } from '@/entities';

type TargetsCardProps = {
    isExpanded: boolean;
    onToggleExpand: () => void;
    isTargetInfoModalOpen: boolean;
    onCloseTargetInfoModal: () => void;
    isCreateTargetFormOpen: boolean;
    onOpenCreateTargetForm: () => void;
    onCloseCreateTargetForm: () => void;
    isTargetFiltersModalOpen: boolean;
    onOpenTargetFiltersModal: () => void;
    onCloseTargetFiltersModal: () => void;
    onTargetNameClick?: (target: Target) => void;
    onDeleteClick?: (target: Target) => void;
    onEditClick?: (target: Target) => void;
};

export default function TargetsCard({
    isExpanded,
    onToggleExpand,
    isTargetInfoModalOpen,
    onCloseTargetInfoModal,
    isCreateTargetFormOpen,
    onOpenCreateTargetForm,
    onCloseCreateTargetForm,
    isTargetFiltersModalOpen,
    onOpenTargetFiltersModal,
    onCloseTargetFiltersModal,
    onTargetNameClick,
    onDeleteClick,
    onEditClick,
}: TargetsCardProps) {
    return (
        <>
            <Card expanded={isExpanded}>
                <div className={styles.cardBody}>
                    <div className={styles.header}>
                        <h2>Targets</h2>
                        <div className={styles.headerButtons}>
                            <IconButton width='30px' height='30px'>
                                <SearchIcon />
                            </IconButton>
                            <IconButton
                                width='30px'
                                height='30px'
                                onClick={onToggleExpand}
                            >
                                {isExpanded ? <MinimizeIcon /> : <ExpandIcon />}
                            </IconButton>
                        </div>
                    </div>
                    <div className={styles.actionButtons}>
                        <Button onClick={onOpenCreateTargetForm}>
                            + New target
                        </Button>
                        <Button
                            color='outline'
                            className={styles.bulkUploadButton}
                        >
                            <FolderIcon />
                            Bulk Upload Targets
                        </Button>
                        <IconButton
                            className={styles.filterButton}
                            onClick={onOpenTargetFiltersModal}
                        >
                            <FilterIcon />
                        </IconButton>
                    </div>
                    <div className={styles.table}>
                        <TargetTableContainer
                            onTargetNameClick={onTargetNameClick}
                            onDeleteClick={onDeleteClick}
                            onEditClick={onEditClick}
                        />
                    </div>
                </div>
            </Card>
            <Modal
                isOpen={isTargetInfoModalOpen}
                onClose={onCloseTargetInfoModal}
            >
                <TargetInfo />
            </Modal>
            <Modal
                isOpen={isCreateTargetFormOpen}
                onClose={onCloseCreateTargetForm}
            >
                <CreateTargetFormContainer
                    onSubmitSuccess={onCloseCreateTargetForm}
                    onCancel={onCloseCreateTargetForm}
                />
            </Modal>
            <Modal
                isOpen={isTargetFiltersModalOpen}
                onClose={onCloseTargetFiltersModal}
            >
                <TargetFilters />
            </Modal>
        </>
    );
}
