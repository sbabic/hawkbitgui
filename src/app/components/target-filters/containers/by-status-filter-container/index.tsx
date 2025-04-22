'use client';

import React, { useRef } from 'react';
import ByStatusFilter from '@/app/components/target-filters/components/by-status-filter';
import { useTargetsFiltersStore } from '@/stores/targets-filters-store';
import { FilterFiql, TargetStatus } from '@/entities';
import { useTargetsTableStore } from '@/stores/targets-table-store';

export default function ByStatusFilterContainer() {
    const filter = useRef<FilterFiql>(new FilterFiql('updateStatus', ','));
    const currentFiltersState = useTargetsFiltersStore((state) => state.filters);
    const setFilters = useTargetsFiltersStore((state) => state.setFilters);
    const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);

    const [selectedStatuses, setSelectedStatuses] = React.useState<TargetStatus[]>([]);
    const handleStatusClick = (status: TargetStatus) => {
        setSelectedStatuses((prev) => {
            const newStatuses = prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status];
            updateStatuses(newStatuses); // use the new state here
            return newStatuses;
        });
    };

    const updateStatuses = (statuses: string[]) => {
        filter.current.setValues(statuses.map((status) => ['==', status]));
        const newFilters = { ...currentFiltersState, [filter.current.property]: filter.current };
        setFilters(newFilters);
        fetchTargets().catch((err) => console.error(err));
    };

    return <ByStatusFilter onStatusClick={handleStatusClick} selectedStatuses={selectedStatuses} />;
}
