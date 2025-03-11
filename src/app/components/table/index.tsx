'use client';

import React from 'react';
import {
    useReactTable,
    createColumnHelper,
    getCoreRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table';
import styles from './styles.module.scss';

type Device = {
    name: string;
    status: 'Delivered' | 'Error' | 'Pending' | 'Overdue' | 'Unknown';
};

const columnHelper = createColumnHelper<Device>();

const columns: ColumnDef<Device, any>[] = [
    columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
            const status = info.getValue();
            let statusClass = '';

            // Map each status to a specific SCSS class
            switch (status) {
                case 'Delivered':
                    statusClass = styles.statusDelivered;
                    break;
                case 'Error':
                    statusClass = styles.statusError;
                    break;
                case 'Pending':
                    statusClass = styles.statusPending;
                    break;
                case 'Overdue':
                    statusClass = styles.statusOverdue;
                    break;
                default:
                    statusClass = styles.statusUnknown;
            }

            return (
                <div>
                    <span
                        className={`${styles.statusIndicator} ${statusClass}`}
                    />
                    {status}
                </div>
            );
        },
    }),
    columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: () => (
            <div>
                <button>View</button> <button>Edit</button>{' '}
                <button>Delete</button>
            </div>
        ),
    }),
];

// Sample data array
const data: Device[] = [
    { name: 'controlhaus-64:CF:da1', status: 'Delivered' },
    { name: 'controlhaus-64:CF:da2', status: 'Error' },
    { name: 'controlhaus-64:CF:da3', status: 'Pending' },
    { name: 'controlhaus-64:CF:da4', status: 'Overdue' },
    { name: 'controlhaus-64:CF:da5', status: 'Unknown' },
    { name: 'controlhaus-64:CF:da6', status: 'Delivered' },
    { name: 'controlhaus-64:CF:da1', status: 'Delivered' },
    { name: 'controlhaus-64:CF:da2', status: 'Error' },
    { name: 'controlhaus-64:CF:da3', status: 'Pending' },
    { name: 'controlhaus-64:CF:da4', status: 'Overdue' },
    { name: 'controlhaus-64:CF:da5', status: 'Unknown' },
    { name: 'controlhaus-64:CF:da6', status: 'Delivered' },
    { name: 'controlhaus-64:CF:da1', status: 'Delivered' },
    { name: 'controlhaus-64:CF:da2', status: 'Error' },
    { name: 'controlhaus-64:CF:da3', status: 'Pending' },
    { name: 'controlhaus-64:CF:da4', status: 'Overdue' },
    { name: 'controlhaus-64:CF:da5', status: 'Unknown' },
    { name: 'controlhaus-64:CF:da6', status: 'Delivered' },
    { name: 'controlhaus-64:CF:da1', status: 'Delivered' },
    { name: 'controlhaus-64:CF:da2', status: 'Error' },
    { name: 'controlhaus-64:CF:da3', status: 'Pending' },
    { name: 'controlhaus-64:CF:da4', status: 'Overdue' },
    { name: 'controlhaus-64:CF:da5', status: 'Unknown' },
    { name: 'controlhaus-64:CF:da6', status: 'Delivered' },
];

export default function Table() {
    // Create the table instance
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // Render the table
    return (
        <div className={styles.tableContainer}>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
