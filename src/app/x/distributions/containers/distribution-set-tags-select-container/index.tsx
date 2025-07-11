'use client';

import { useCallback } from 'react';
import MultipleSelect from '@/app/components/multiple-select';
import { BaseOption } from '@/app/components/multiple-select/react-select-config';
import { DistributionSetTagsService } from '@/services/distribution-set-tags-service';
import { useDistributionsSetsTableStore } from '@/stores/distribution-sets-table-store';
import { useGetDistributionSetTags } from '../../hooks/use-get-distribution-set-tags';
import { useGetDistributionSetTagsById } from '../../hooks/use-get-distribution-set-tags-by-id';
import { isDefined } from '@/utils/is-defined';
import styles from './styles.module.scss';

export default function DistributionSetTagsSelectContainer() {
  const selectedDistribution = useDistributionsSetsTableStore((state) => state.selectedDistribution);
  const { data: allTags, isLoading: isLoadingDistributionSetTags } = useGetDistributionSetTags();
  const {
    data: selectedTags,
    isLoading: isLoadingSelectedDistributionTags,
    refetch: refetchSelectedDistributionTags,
  } = useGetDistributionSetTagsById({
    distributionSetId: selectedDistribution?.id ?? 0,
    queryOptions: { enabled: isDefined(selectedDistribution) },
  });

  const handleOnChange = useCallback(
    async (changedTags: BaseOption[]) => {
      if (!selectedDistribution || !allTags || !selectedTags) {
        return;
      }

      const changedTagIds = new Set(changedTags.map((tag) => tag.id));
      const selectedTagIds = new Set(selectedTags.map((tag) => tag.id));

      const tagsToDelete = selectedTags.filter((tag) => !changedTagIds.has(tag.id));
      const tagsToAdd = changedTags.filter((tag) => !selectedTagIds.has(tag.id as number));

      await Promise.all([
        ...tagsToDelete.map((tag) => DistributionSetTagsService.unassignTagFromDistribution(selectedDistribution.id, tag.id)),
        ...tagsToAdd.map((tag) => DistributionSetTagsService.assignTagToDistribution(selectedDistribution.id, tag.id)),
      ]);

      refetchSelectedDistributionTags();
    },
    [allTags, selectedTags, selectedDistribution, refetchSelectedDistributionTags]
  );

  return (
    <div className={styles.container}>
      <h2>Tags</h2>
      <MultipleSelect
        options={allTags ?? []}
        selectedOptions={selectedTags}
        onChange={handleOnChange}
        isLoading={isLoadingDistributionSetTags || isLoadingSelectedDistributionTags}
      />
    </div>
  );
}
