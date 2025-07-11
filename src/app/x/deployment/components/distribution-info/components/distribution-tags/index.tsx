'use client';

import Text from '@/app/components/text';
import styles from './styles.module.scss';
import MultipleDistributionTagSelectContainer from '@/app/x/deployment/components/distribution-info/containers/multiple-distribution-tag-select-container';

export default function DistributionTags() {
  return (
    <div className={styles.container}>
      <Text variant='heading-2'>Tags</Text>
      <div className={styles.tagContainer}>
        <MultipleDistributionTagSelectContainer />
      </div>
    </div>
  );
}
