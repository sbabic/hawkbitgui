'use client';

import styles from './styles.module.scss';
import Button from '@/app/components/button';
import PlusIcon from '@/app/components/icons/plus-icon';
import DistributionMetadataTableContainer from '@/app/x/deployment/containers/distribution-metadata-table-container';

export interface TargetMetadataProps {
  onAddClick?: () => void;
}

export default function DistributionMetadata({ onAddClick }: TargetMetadataProps) {
  return (
    <div className={styles.container}>
      <h2>Metadata</h2>
      <Button variant='text' onClick={onAddClick} className={styles.addButton}>
        <PlusIcon width={'24px'} height={'24px'} /> Add Metadata
      </Button>
      <DistributionMetadataTableContainer />
    </div>
  );
}
