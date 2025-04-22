'use client';

import React, { useEffect, useRef } from 'react';
import ByStatusFilter from '@/app/components/target-filters/components/by-status-filter';
import { useTargetsFiltersStore } from '@/stores/targets-filters-store';
import { FilterFiql, TargetStatus } from '@/entities';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { useTargetStatusStore } from '@/stores/targets-status-store';

export default function ByStatusFilterContainer() {
    const filter = useRef<FilterFiql>(new FilterFiql('updateStatus', ','));

    const selectedStatuses = useTargetStatusStore((state) => state.selectedStatuses);
    const toggleStatus = useTargetStatusStore((state) => state.toggleStatus);

    const filtersSnapshot = useTargetsFiltersStore.getState().filters;
    const setFilters = useTargetsFiltersStore((state) => state.setFilters);

    const fetchTargets = useTargetsTableStore.getState().fetchTargets;

    const handleStatusClick = (status: TargetStatus) => {
        toggleStatus(status);
    };

    useEffect(() => {
        filter.current.setValues(selectedStatuses.map((status) => ['==', status]));
        const newFilters = { ...filtersSnapshot, [filter.current.property]: filter.current };
        setFilters(newFilters);
        fetchTargets().catch((err) => console.error(err));
    }, [selectedStatuses]);

    return <ByStatusFilter onStatusClick={handleStatusClick} selectedStatuses={selectedStatuses} />;
}
