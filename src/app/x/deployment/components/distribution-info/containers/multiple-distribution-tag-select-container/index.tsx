'use client';

import { useEffect, useState, useCallback } from 'react';
import { Tag } from '@/entities';
import MultipleSelect from '@/app/components/multiple-select';
import { BaseOption } from '@/app/components/multiple-select/react-select-config';
import { DistributionSetTagsService } from '@/services/distribution-set-tags-service';
import { useDistributionsTableStore } from '@/stores/distributions-table-store';

export default function MultipleDistributionTagSelectContainer() {
    const selectedDistribution = useDistributionsTableStore((state) => state.selectedDistribution);
    const [isLoading, setIsLoading] = useState(false);
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const handleOnChange = useCallback(
        async (changedTags: BaseOption[]) => {
            if (!selectedDistribution) return;

            const changedTagIds = new Set(changedTags.map((tag) => tag.id));
            const selectedTagIds = new Set(selectedTags.map((tag) => tag.id));

            const tagsToDelete = selectedTags.filter((tag) => !changedTagIds.has(tag.id));
            const tagsToAdd = changedTags.filter((tag) => !selectedTagIds.has(tag.id as number));

            await Promise.all([
                ...tagsToDelete.map((tag) => DistributionSetTagsService.unassignTagFromDistribution(selectedDistribution.id, tag.id)),
                ...tagsToAdd.map((tag) => DistributionSetTagsService.assignTagToDistribution(selectedDistribution.id, [tag.id as number])),
            ]);

            const tagMap = new Map(allTags.map((t) => [t.id, t]));
            const mappedTags: Tag[] = changedTags.map((tag) => tagMap.get(tag.id as number)).filter((tag): tag is Tag => !!tag);

            setSelectedTags(mappedTags);
        },
        [allTags, selectedTags, selectedDistribution]
    );

    useEffect(() => {
        const fetchTags = async () => {
            if (!selectedDistribution) return;
            setIsLoading(true);
            try {
                const [allTags, selectedTags] = await Promise.all([
                    DistributionSetTagsService.getTags(),
                    DistributionSetTagsService.getTagsByDistributionId(selectedDistribution.id),
                ]);
                setAllTags(allTags);
                setSelectedTags(selectedTags);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTags();
    }, [selectedDistribution]);

    return <MultipleSelect options={allTags} selectedOptions={selectedTags} onChange={handleOnChange} isLoading={isLoading} />;
}
