import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import { SoftwareModuleArtifact } from '@/entities/software-module-artifact';
import dayjs from 'dayjs';
import TrashIcon from '@/app/components/icons/trash-icon';
import DownloadIcon from '@/app/components/icons/download-icon';
import ActionIconButtons from '@/app/components/action-icon-buttons';
import TooltipIconButton from '@/app/components/tooltip-icon-button';

interface ArtifactsTableProps {
  artifacts: SoftwareModuleArtifact[];
  onDownloadClick: (artifact: SoftwareModuleArtifact) => void;
  onDeleteClick: (artifact: SoftwareModuleArtifact) => void;
}

export default function ArtifactsTable({ artifacts, onDownloadClick, onDeleteClick }: ArtifactsTableProps) {
  const columnHelper = createColumnHelper<SoftwareModuleArtifact>();

  const fullColumns = useMemo(
    () => [
      columnHelper.accessor('providedFilename', {
        header: 'File name',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('size', {
        header: 'Size (B)',
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('lastModifiedAt', {
        header: 'Last modified',
        cell: (cell) => dayjs(cell.getValue()).format('ddd MMM DD HH:mm:ss YYYY'),
      }),
      columnHelper.display({
        header: 'Actions',
        cell: (cell) => (
          <ActionIconButtons>
            <TooltipIconButton icon={<DownloadIcon />} tooltipContent='Download' iconButtonProps={{ onClick: () => onDownloadClick(cell.row.original) }} />
            <TooltipIconButton icon={<TrashIcon />} tooltipContent='Delete' iconButtonProps={{ onClick: () => onDeleteClick(cell.row.original) }} />
          </ActionIconButtons>
        ),
      }),
    ],
    [columnHelper, onDownloadClick, onDeleteClick]
  );

  return (
    <>
      <Table columns={fullColumns} data={artifacts} />
    </>
  );
}
