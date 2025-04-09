'use client';

import styles from './styles.module.scss';
import TargetMetadataTableContainer from '@/app/containers/target-metadata-table-container';

export default function TargetMetadata() {
    return (
        <div className={styles.container}>
            <TargetMetadataTableContainer />
        </div>
    );
}
