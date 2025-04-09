'use client';

import styles from './styles.module.scss';
import TargetMetadataTableContainer from '@/app/containers/target-metadata-table-container';
import IconButton from '@/app/components/icon-button';
import PlusIcon from '@/app/components/icons/plus-icon';

export interface TargetMetadataProps {
    onAddClick?: () => void;
}

export default function TargetMetadata({ onAddClick }: TargetMetadataProps) {
    return (
        <div className={styles.container}>
            <h2>Metadata</h2>
            <IconButton onClick={onAddClick}>
                <PlusIcon />
            </IconButton>
            <TargetMetadataTableContainer />
        </div>
    );
}
