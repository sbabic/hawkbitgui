import React, { useMemo, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/app/components/table';
import Button from '@/app/components/button';
import { SoftwareModule } from '@/entities/software-module';
import { Modal } from '@/app/components/modal';
import FileUploader from '@/app/components/upload-field';

interface SoftwareModuleTableProps {
    modules: SoftwareModule[];
    onFileSelect: (softwareModuleId: number, files: File[]) => void;
}

export default function SoftwareModuleTable({ modules, onFileSelect }: SoftwareModuleTableProps) {
    const columnHelper = createColumnHelper<SoftwareModule>();

    const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
    const [selectedSoftwareModuleId, setSelectedSoftwareModuleId] = useState<number>();

    const openUploadForm = (softwareModuleId: number) => {
        setSelectedSoftwareModuleId(softwareModuleId);
        setIsUploadFormOpen(true);
    };

    const closeUploadForm = () => {
        setSelectedSoftwareModuleId(undefined);
        setIsUploadFormOpen(false);
    };

    const handleFileSelect = (files: File[]) => {
        if (selectedSoftwareModuleId) {
            onFileSelect(selectedSoftwareModuleId, files);
        }
        closeUploadForm();
    };

    const fullColumns = useMemo(
        () => [
            columnHelper.accessor('name', {
                header: 'Name',
                cell: (cell) => (
                    <Button variant='text' onClick={() => openUploadForm(cell.row.original.id)}>
                        {cell.getValue()}
                    </Button>
                ),
            }),
            columnHelper.accessor('version', {
                header: 'Version',
                cell: (cell) => cell.getValue(),
            }),
            columnHelper.accessor('type', {
                header: 'Type',
                cell: (cell) => cell.getValue(),
            }),
            columnHelper.accessor('description', {
                header: 'Description',
                cell: (cell) => cell.getValue(),
            }),
            columnHelper.accessor('vendor', {
                header: 'Vendor',
                cell: (cell) => cell.getValue(),
            }),
            columnHelper.accessor('encrypted', {
                header: 'Encrypted',
                cell: (cell) => (cell.getValue() ? 'Yes' : 'No'),
            }),
        ],
        [columnHelper]
    );

    return (
        <>
            <Table columns={fullColumns} data={modules} />
            <Modal isOpen={isUploadFormOpen} onClose={closeUploadForm}>
                <Modal.Header>Upload files</Modal.Header>
                <Modal.Content>
                    <FileUploader onFileSelect={handleFileSelect} />
                </Modal.Content>
            </Modal>
        </>
    );
}
