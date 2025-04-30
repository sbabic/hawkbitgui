'use client';

import styles from './styles.module.scss';
import Button from '@/app/components/button';
import FolderIcon from '@/app/components/icons/folder-icon';
import IconButton from '@/app/components/icon-button';
import { Modal } from '@/app/components/modal';
import FilterIcon from '@/app/components/icons/filter-icon';
import TargetFilters from '@/app/components/target-filters';
import TargetTableContainer from '@/app/containers/target-table-container';
import CreateTargetFormContainer from '@/app/containers/create-target-form-container';
import ExpandableSearchBarContainer from '@/app/containers/expandable-search-bar-container';
import PanelCard from '@/app/components/panel-card';

type TargetsCardProps = {
    isExpanded: boolean;
    onToggleExpand: () => void;
    isCreateTargetFormOpen: boolean;
    onOpenCreateTargetForm: () => void;
    onCloseCreateTargetForm: () => void;
    isTargetFiltersModalOpen: boolean;
    onOpenTargetFiltersModal: () => void;
    onCloseTargetFiltersModal: () => void;
};

export default function TargetsCard({
    isExpanded,
    onToggleExpand,
    isCreateTargetFormOpen,
    onOpenCreateTargetForm,
    onCloseCreateTargetForm,
    isTargetFiltersModalOpen,
    onOpenTargetFiltersModal,
    onCloseTargetFiltersModal,
}: TargetsCardProps) {
    return (
        <>
            <PanelCard expanded={isExpanded}>
                <PanelCard.Header title='Targets' isExpanded={isExpanded} onToggleExpand={onToggleExpand}>
                    <ExpandableSearchBarContainer />
                </PanelCard.Header>

                <PanelCard.Actions>
                    <Button onClick={onOpenCreateTargetForm}>+ New target</Button>
                    <Button variant='outline' className={styles.bulkUploadButton}>
                        <FolderIcon />
                        Bulk Upload Targets
                    </Button>
                    <IconButton className={styles.filterButton} onClick={onOpenTargetFiltersModal}>
                        <FilterIcon />
                    </IconButton>
                </PanelCard.Actions>

                <PanelCard.Content>
                    <TargetTableContainer />
                </PanelCard.Content>
            </PanelCard>

            <Modal isOpen={isCreateTargetFormOpen} onClose={onCloseCreateTargetForm} size={'md'}>
                <CreateTargetFormContainer onSubmitSuccess={onCloseCreateTargetForm} onCancel={onCloseCreateTargetForm} />
            </Modal>
            <Modal isOpen={isTargetFiltersModalOpen} onClose={onCloseTargetFiltersModal} size={'fitContent'}>
                <TargetFilters />
            </Modal>
        </>
    );
}
