'use client';

import Text from '@/app/components/text';
import styles from './styles.module.scss';
import MultipleTargetTagSelectContainer from '@/app/components/target-info-modal/containers/multiple-target-tag-select-container';

export default function TargetTags() {
  return (
    <div className={styles.container}>
      <Text variant='heading-2'>Tags</Text>
      <div className={styles.tagContainer}>
        <MultipleTargetTagSelectContainer />
      </div>
    </div>
  );
}
