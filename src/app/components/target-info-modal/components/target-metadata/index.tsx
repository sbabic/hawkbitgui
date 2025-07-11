'use client';

import styles from './styles.module.scss';
import Button from '@/app/components/button';
import PlusIcon from '@/app/components/icons/plus-icon';
import Text from '@/app/components/text';
import TargetMetadataTableContainer from '@/app/x/deployment/containers/target-metadata-table-container';

export interface TargetMetadataProps {
  onAddClick?: () => void;
}

export default function TargetMetadata({ onAddClick }: TargetMetadataProps) {
  return (
    <div className={styles.container}>
      <Text variant='heading-2'>Metadata</Text>
      <Button variant='text' onClick={onAddClick} className={styles.addButton}>
        <PlusIcon width={'24px'} height={'24px'} /> Add Metadata
      </Button>
      <TargetMetadataTableContainer />
    </div>
  );
}
