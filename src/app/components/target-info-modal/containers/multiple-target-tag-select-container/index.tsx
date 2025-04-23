'use client';

import MultipleTargetTagSelect, { Tag as ComponentTag } from '@/app/components/target-info-modal/components/multiple-target-tag-select';
import { useEffect, useState, useCallback } from 'react';
import { Tag } from '@/entities';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { TargetTagsService } from '@/services/target-tags-service';

export default function MultipleTargetTagSelectContainer() {
    const selectedTarget = useTargetsTableStore((state) => state.selectedTarget);
    const [isLoading, setIsLoading] = useState(false);
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const handleOnChange = useCallback(
        async (changedTags: ComponentTag[]) => {
            if (!selectedTarget) return;

            const changedTagIds = new Set(changedTags.map((tag) => tag.id));
            const selectedTagIds = new Set(selectedTags.map((tag) => tag.id));

            const tagsToDelete = selectedTags.filter((tag) => !changedTagIds.has(tag.id));
            const tagsToAdd = changedTags.filter((tag) => !selectedTagIds.has(tag.id));

            await Promise.all([
                ...tagsToDelete.map((tag) => TargetTagsService.unassignTagFromTarget(selectedTarget.controllerId, tag.id)),
                ...tagsToAdd.map((tag) => TargetTagsService.assignTagToTarget(selectedTarget.controllerId, tag.id)),
            ]);

            const tagMap = new Map(allTags.map((t) => [t.id, t]));
            const mappedTags: Tag[] = changedTags.map((tag) => tagMap.get(tag.id)).filter((tag): tag is Tag => !!tag);

            setSelectedTags(mappedTags);
        },
        [allTags, selectedTags, selectedTarget]
    );

    useEffect(() => {
        const fetchTags = async () => {
            if (!selectedTarget) return;
            setIsLoading(true);
            try {
                const [allTags, selectedTags] = await Promise.all([
                    TargetTagsService.getTags(),
                    TargetTagsService.getTagsByControllerId(selectedTarget.controllerId),
                ]);
                setAllTags(allTags);
                setSelectedTags(selectedTags);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTags();
    }, [selectedTarget]);

    return <MultipleTargetTagSelect tags={allTags} selectedTags={selectedTags} onChange={handleOnChange} isLoading={isLoading} />;
}
