'use client';

import styles from './styles.module.scss';
import Button from '@/app/components/button';
import PlusIcon from '@/app/components/icons/plus-icon';
import DistributionSetMetadataTableContainer from '../../containers/distribution-set-metadata-table-container';

export interface DistributionSetMetadataProps {
  onAddClick: () => void;
}

export default function DistributionSetMetadata({ onAddClick }: DistributionSetMetadataProps) {
  return (
    <div className={styles.container}>
      <h2>Metadata</h2>
      <Button variant='text' onClick={onAddClick} className={styles.addButton}>
        <PlusIcon width={'24px'} height={'24px'} /> Add Metadata
      </Button>
      <DistributionSetMetadataTableContainer />
    </div>
  );
}
