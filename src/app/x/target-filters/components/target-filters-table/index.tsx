import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import Button from '@/app/components/button';
import { TargetFilter } from '@/entities/target-filter';
import TrashIcon from '@/app/components/icons/trash-icon';
import dayjs from 'dayjs';
import { RolloutType, RolloutTypes } from '@/entities/rollout';
import CloudIcon from '@/app/components/icons/cloud-icon';
import ThunderCloudIcon from '@/app/components/icons/thunder-cloud-icon';
import DownloadIcon from '@/app/components/icons/download-icon';
import ClockCloudIcon from '@/app/components/icons/clock-cloud-icon';
import ActionIconButtons from '@/app/components/action-icon-buttons';
import TooltipIconButton from '@/app/components/tooltip-icon-button';

interface TargetFiltersTableProps {
  modules: TargetFilter[];
  isLoading?: boolean;
  onNameClick: (targetFilter: TargetFilter) => void;
  onDelete: (targetFilter: TargetFilter) => void;
  onAutoAssignDistributionClick: (targetFilter: TargetFilter) => void;
}

export default function TargetFiltersTable({ modules, isLoading = false, onNameClick, onDelete, onAutoAssignDistributionClick }: TargetFiltersTableProps) {
  const columnHelper = createColumnHelper<TargetFilter>();

  const fullColumns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (cell) => (
          <Button variant='text' onClick={() => onNameClick(cell.row.original)}>
            {cell.getValue()}
          </Button>
        ),
      }),
      columnHelper.accessor('createdBy', {
        header: 'Created by',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created date',
        size: 230,
        cell: (cell) => dayjs(cell.getValue()).format('ddd MMM DD HH:mm:ss YYYY'),
      }),
      columnHelper.accessor('lastModifiedBy', {
        header: 'Modified by',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('lastModifiedAt', {
        header: 'Modified date',
        size: 230,
        cell: (cell) => dayjs(cell.getValue()).format('ddd MMM DD HH:mm:ss YYYY'),
      }),
      columnHelper.accessor('autoAssignDistributionSetName', {
        header: 'Auto assignment',
        size: 250,
        cell: (cell) => {
          const { autoAssignDistributionSet, autoAssignActionType, autoAssignDistributionSetName } = cell.row.original;
          if (!autoAssignDistributionSet || !autoAssignActionType || !autoAssignDistributionSetName) {
            return (
              <Button variant='text' onClick={() => onAutoAssignDistributionClick(cell.row.original)}>
                none
              </Button>
            );
          }

          const iconsMapper: Record<RolloutType, React.ReactNode> = {
            [RolloutTypes.SOFT]: <CloudIcon />,
            [RolloutTypes.FORCED]: <ThunderCloudIcon />,
            [RolloutTypes.DOWNLOAD_ONLY]: <DownloadIcon />,
            [RolloutTypes.TIME_FORCED]: <ClockCloudIcon />,
          };

          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {iconsMapper[autoAssignActionType]}
              <Button variant='text' onClick={() => onAutoAssignDistributionClick(cell.row.original)}>
                {autoAssignDistributionSetName}
              </Button>
            </div>
          );
        },
      }),
      columnHelper.display({
        header: 'Actions',
        size: 100,
        cell: (cell) => (
          <ActionIconButtons>
            <TooltipIconButton icon={<TrashIcon />} tooltipContent='Delete' iconButtonProps={{ onClick: () => onDelete(cell.row.original) }} />
          </ActionIconButtons>
        ),
      }),
    ],
    [columnHelper, onDelete, onNameClick, onAutoAssignDistributionClick]
  );

  return <Table columns={fullColumns} data={modules} isLoading={isLoading} />;
}
