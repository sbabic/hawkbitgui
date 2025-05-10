import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import { SoftwareModuleArtifact } from '@/entities/software-module-artifact';
import dayjs from 'dayjs';
import IconButton from '@/app/components/icon-button';
import TrashIcon from '@/app/components/icons/trash-icon';
import DownloadIcon from '@/app/components/icons/download-icon';

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
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 8 }}>
            <IconButton onClick={() => onDownloadClick(cell.row.original)}>
              <DownloadIcon />
            </IconButton>
            <IconButton onClick={() => onDeleteClick(cell.row.original)}>
              <TrashIcon />
            </IconButton>
          </div>
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
