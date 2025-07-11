'use client';

import styles from './styles.module.scss';
import Button from '@/app/components/button';
import PlusIcon from '@/app/components/icons/plus-icon';
import SoftwareModuleMetadataTableContainer from '../../containers/software-module-metadata-table-container';
import Text from '@/app/components/text';

export interface SoftwareModuleMetadataProps {
  onAddClick: () => void;
}

export default function SoftwareModuleMetadata({ onAddClick }: SoftwareModuleMetadataProps) {
  return (
    <div className={styles.container}>
      <Text variant='heading-2'>Metadata</Text>
      <Button variant='text' onClick={onAddClick} className={styles.addButton}>
        <PlusIcon width={'24px'} height={'24px'} /> Add Metadata
      </Button>
      <SoftwareModuleMetadataTableContainer />
    </div>
  );
}
