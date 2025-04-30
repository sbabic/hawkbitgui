'use client';

import styles from './styles.module.scss';
import IconButton from '@/app/components/icon-button';
import { Modal } from '@/app/components/modal';
import FilterIcon from '@/app/components/icons/filter-icon';
import TargetFilters from '@/app/components/target-filters';
import TargetTableContainer from '@/app/containers/target-table-container';
import CreateTargetFormContainer from '@/app/containers/create-target-form-container';
import PanelCard from '@/app/components/panel-card';

type DistributionsCardProps = {
    isExpanded: boolean;
    onToggleExpand: () => void;
    isCreateTargetFormOpen: boolean;
    onCloseCreateTargetForm: () => void;
    isTargetFiltersModalOpen: boolean;
    onOpenTargetFiltersModal: () => void;
    onCloseTargetFiltersModal: () => void;
};

export default function DistributionsCard({
    isExpanded,
    onToggleExpand,
    isCreateTargetFormOpen,
    onCloseCreateTargetForm,
    isTargetFiltersModalOpen,
    onOpenTargetFiltersModal,
    onCloseTargetFiltersModal,
}: DistributionsCardProps) {
    return (
        <>
            <PanelCard>
                <PanelCard.Header title='Distributions' onToggleExpand={onToggleExpand} isExpanded={isExpanded} />
                <PanelCard.Actions>
                    <div className={styles.actionButtons}>
                        <IconButton onClick={onOpenTargetFiltersModal} className={styles.filterButton}>
                            <FilterIcon />
                        </IconButton>
                    </div>
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
