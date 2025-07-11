'use client';

import { useDistributionSetFiltersStore } from '@/stores/distribution-set-filters-store';
import { useGetDistributionSetTags } from '../../hooks/use-get-distribution-set-tags';
import { DistributionSetTagFormData } from '../../components/distribution-set-tag-form/types';
import DistributionSetTagForm from '../../components/distribution-set-tag-form';
import { useUpdateDistributionSetTag } from '../../hooks/use-update-distribution-set-tag';

export interface EditDistributionSetTagFormContainerProps {
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

export default function EditDistributionSetTagFormContainer({ onSubmitSuccess, onCancel }: EditDistributionSetTagFormContainerProps) {
  const { refetch } = useGetDistributionSetTags({ queryOptions: { enabled: false } });
  const { updateDistributionSetTag } = useUpdateDistributionSetTag();

  const selectedTag = useDistributionSetFiltersStore((state) => state.selectedTag);
  if (!selectedTag) {
    return null;
  }

  const handleSubmit = async (data: DistributionSetTagFormData) => {
    await updateDistributionSetTag({ ...data, distributionSetTagId: selectedTag.id });
    refetch();
    onSubmitSuccess();
  };

  return <DistributionSetTagForm defaultValues={selectedTag} onSubmit={handleSubmit} onCancel={onCancel} />;
}
