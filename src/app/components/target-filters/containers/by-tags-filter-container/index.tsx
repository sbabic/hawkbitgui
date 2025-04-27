'use client';

import MultipleSelect from '@/app/components/multiple-select';
import { useTargetsFiltersStore } from '@/stores/targets-filters-store';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { useTargetTagsStore } from '@/stores/targets-tags-store';
import { TargetTagsService } from '@/services/target-tags-service';
import { Tag } from '@/entities';
import { useFilterMultipleSelect } from '@/app/hooks'; // Assuming your reusable hook is exported here

export default function ByTagsFilterContainer() {
    const selectedTags = useTargetTagsStore((state) => state.selectedTags);
    const setSelectedTags = useTargetTagsStore((state) => state.setSelectedTags);

    const filters = useTargetsFiltersStore((state) => state.filters);
    const setFilters = useTargetsFiltersStore((state) => state.setFilters);

    const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);

    const { allOptions, isLoading, handleOnChange } = useFilterMultipleSelect<Tag>({
        filterField: 'tag.name',
        fetchOptions: TargetTagsService.getTags,
        selectedOptions: selectedTags,
        setSelectedOptions: setSelectedTags,
        getOptionId: (tag) => tag.id,
        getOptionLabel: (tag) => tag.name,
        fetchTargets,
        setFilters,
        filters,
    });

    return <MultipleSelect selectedOptions={selectedTags} options={allOptions} isLoading={isLoading} onChange={handleOnChange} />;
}
