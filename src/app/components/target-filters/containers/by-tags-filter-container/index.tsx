'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTargetsFiltersStore } from '@/stores/targets-filters-store';
import { FilterFiql, Tag } from '@/entities';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import MultipleSelect from '@/app/components/multiple-select';
import { TargetTagsService } from '@/services/target-tags-service';
import { BaseOption } from '@/app/components/multiple-select/react-select-config';
import { useTargetTagsStore } from '@/stores/targets-tags-store';

export default function ByTagsFilterContainer() {
    const filter = useRef<FilterFiql>(new FilterFiql('tag.name', ','));
    const [isLoading, setIsLoading] = useState(false);
    const [allTags, setAllTags] = useState<Tag[]>([]);

    const selectedTags = useTargetTagsStore((state) => state.selectedTags);
    const setSelectedTags = useTargetTagsStore((state) => state.setSelectedTags);

    const filtersSnapshot = useTargetsFiltersStore.getState().filters;
    const setFilters = useTargetsFiltersStore((state) => state.setFilters);

    const fetchTargets = useTargetsTableStore.getState().fetchTargets;

    const handleOnChange = useCallback(
        async (changedTags: BaseOption[]) => {
            const tagMap = new Map(allTags.map((t) => [t.id, t]));
            const mappedTags: Tag[] = changedTags.map((tag) => tagMap.get(tag.id)).filter((tag): tag is Tag => !!tag);

            setSelectedTags(mappedTags);
        },
        [allTags, setSelectedTags]
    );

    useEffect(() => {
        const fetchTags = async () => {
            setIsLoading(true);
            try {
                const [allTags] = await Promise.all([TargetTagsService.getTags()]);
                setAllTags(allTags);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTags();
    }, [setSelectedTags]);

    useEffect(() => {
        filter.current.setValues(selectedTags.map((tag) => ['==', `${tag.name}`]));
        const newFilters = { ...filtersSnapshot, [filter.current.property]: filter.current };
        setFilters(newFilters);
        fetchTargets().catch((err) => console.error(err));
    }, [selectedTags]);

    return <MultipleSelect selectedOptions={selectedTags} options={allTags} isLoading={isLoading} onChange={handleOnChange} />;
}
