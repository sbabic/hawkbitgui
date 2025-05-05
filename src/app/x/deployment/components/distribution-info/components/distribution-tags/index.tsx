'use client';

import styles from './styles.module.scss';
import MultipleDistributionTagSelectContainer from '@/app/x/deployment/components/distribution-info/containers/multiple-distribution-tag-select-container';

export default function DistributionTags() {
    return (
        <div className={styles.container}>
            <h2>Tags</h2>
            <div className={styles.tagContainer}>
                <MultipleDistributionTagSelectContainer />
            </div>
        </div>
    );
}
