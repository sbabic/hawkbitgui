'use client';

import styles from './styles.module.scss';
import MultipleTargetTagSelectContainer from '@/app/components/target-info-modal/containers/multiple-target-tag-select-container';

export default function TargetTags() {
    return (
        <div className={styles.container}>
            <h2>Tags</h2>
            <div className={styles.tagContainer}>
                <MultipleTargetTagSelectContainer />
            </div>
        </div>
    );
}
