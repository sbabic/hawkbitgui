'use client';

import MultipleSelect from '@/app/components/multiple-select';
import { useTargetsFiltersStore } from '@/stores/targets-filters-store';
import { useTargetTagsStore } from '@/stores/targets-tags-store';
import { DistributionTag } from '@/entities';
import { useFilterMultipleSelect } from '@/app/hooks';
import { useDistributionsFiltersStore } from '@/stores/distributions-filters-store';
import { useDistributionsTableStore } from '@/stores/distributions-table-store';
import { DistributionSetTagsService } from '@/services/distribution-set-tags-service';

export default function ByDistributionsFilterContainer() {
    const selectedTags = useTargetTagsStore((state) => state.selectedTags);
    const setSelectedTags = useTargetTagsStore((state) => state.setSelectedTags);

    const filters = useTargetsFiltersStore((state) => state.filters);
    const setFilters = useDistributionsFiltersStore((state) => state.setFilters);

    const fetchDistributions = useDistributionsTableStore((state) => state.fetchDistributions);

    const { allOptions, isLoading, handleOnChange } = useFilterMultipleSelect<DistributionTag>({
        filterField: 'tag.name',
        fetchOptions: DistributionSetTagsService.getTags,
        selectedOptions: selectedTags,
        setSelectedOptions: setSelectedTags,
        getOptionId: (tag) => tag.id,
        getOptionLabel: (tag) => tag.name,
        fetchEntities: fetchDistributions,
        setFilters,
        filters,
    });

    return <MultipleSelect selectedOptions={selectedTags} options={allOptions} isLoading={isLoading} onChange={handleOnChange} />;
}
