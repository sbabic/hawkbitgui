import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import { SoftwareModuleArtifact } from '@/entities/software-module-artifact';
import dayjs from 'dayjs';
import TrashIcon from '@/app/components/icons/trash-icon';
import DownloadIcon from '@/app/components/icons/download-icon';
import ActionIconButtons from '@/app/components/action-icon-buttons';
import TooltipIconButton from '@/app/components/tooltip-icon-button';
import { VisibleColumn } from '@/types/utils/visible-column';
import { transformToColumnVisibility } from '@/utils/columns-visibility';

interface ArtifactsTableProps {
  artifacts: SoftwareModuleArtifact[];
  isLoading?: boolean;
  visibleColumns: Record<string, VisibleColumn>;
  onDownloadClick: (artifact: SoftwareModuleArtifact) => void;
  onDeleteClick: (artifact: SoftwareModuleArtifact) => void;
}

export default function ArtifactsTable({ artifacts, isLoading = false, visibleColumns, onDownloadClick, onDeleteClick }: ArtifactsTableProps) {
  const columnHelper = createColumnHelper<SoftwareModuleArtifact>();

  const fullColumns = useMemo(
    () => [
      columnHelper.accessor('providedFilename', {
        header: 'File name',
        size: 200,
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('size', {
        header: 'Size (B)',
        size: 150,
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('hashes.sha1', {
        id: 'hashes.sha1',
        header: 'SHA1 checksum',
        size: 200,
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('hashes.md5', {
        id: 'hashes.md5',
        header: 'MD5 checksum',
        size: 200,
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('hashes.sha256', {
        id: 'hashes.sha256',
        header: 'SHA256 checksum',
        size: 200,
        cell: (cell) => cell.getValue(),
      }),
      columnHelper.accessor('lastModifiedAt', {
        header: 'Last modified',
        size: 200,
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

  const columnVisibility = useMemo(() => {
    return transformToColumnVisibility(visibleColumns);
  }, [visibleColumns]);

  return <Table columns={fullColumns} data={artifacts} isLoading={isLoading} columnVisibility={columnVisibility} />;
}
