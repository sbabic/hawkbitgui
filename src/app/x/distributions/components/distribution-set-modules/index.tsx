'use client';

import Table from '@/app/components/table';
import { Distribution, SoftwareModule } from '@/entities';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import TrashIcon from '@/app/components/icons/trash-icon';
import TooltipIconButton from '@/app/components/tooltip-icon-button';
import Text from '@/app/components/text';

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
        size: 100,
      }),
      columnHelper.accessor('version', {
        header: 'Software Module',
        size: 220,
        cell: (cell) => `${cell.row.original.name}:${cell.row.original.version}`,
      }),
      columnHelper.display({
        id: 'actions',
        size: 60,
        cell: (cell) => (
          <TooltipIconButton icon={<TrashIcon />} tooltipContent='Unassign' iconButtonProps={{ onClick: () => onModuleDelete(cell.row.original) }} />
        ),
      }),
    ];
  }, [columnHelper, onModuleDelete]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <Text variant='heading-2'>Modules</Text>
      <Table columns={columns} data={modules} />
    </div>
  );
}
