'use client';

import Table from '@/app/components/table';
import { Distribution, SoftwareModule } from '@/entities';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import styles from './styles.module.scss';
import IconButton from '@/app/components/icon-button';
import TrashIcon from '@/app/components/icons/trash-icon';

type DistributionSetModulesProps = {
  distributionSet: Distribution;
  onModuleDelete: (module: SoftwareModule) => void;
};

export default function DistributionSetModules({ distributionSet, onModuleDelete }: DistributionSetModulesProps) {
  const { modules } = distributionSet;
  const columnHelper = createColumnHelper<SoftwareModule>();

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('typeName', {
        header: 'Type',
        size: 70,
      }),
      columnHelper.accessor('version', {
        header: 'Software Module',
        cell: (cell) => `${cell.row.original.name}:${cell.row.original.version}`,
      }),
      columnHelper.display({
        id: 'actions',
        size: 30,
        cell: (cell) => {
          if (modules.length > 1) {
            return (
              <IconButton onClick={() => onModuleDelete(cell.row.original)}>
                <TrashIcon />
              </IconButton>
            );
          }
        },
      }),
    ];
  }, [columnHelper, onModuleDelete, modules.length]);

  return (
    <div className={styles.container}>
      <h2>Modules</h2>
      <Table columns={columns} data={modules} />
    </div>
  );
}
