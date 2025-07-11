'use client';

import DistributionSetTagForm from '../../components/distribution-set-tag-form';
import { DistributionSetTagFormData } from '../../components/distribution-set-tag-form/types';
import { useCreateDistributionSetTag } from '../../hooks/use-create-distribution-set-tag';
import { useGetDistributionSetTags } from '../../hooks/use-get-distribution-set-tags';

export interface CreateDistributionTagFormContainerProps {
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

export default function CreateDistributionTagFormContainer({ onSubmitSuccess, onCancel }: CreateDistributionTagFormContainerProps) {
  const { refetch } = useGetDistributionSetTags({ queryOptions: { enabled: false } });
  const { createDistributionSetTag } = useCreateDistributionSetTag();

  const handleSubmit = async (data: DistributionSetTagFormData) => {
    await createDistributionSetTag(data);
    refetch();
    onSubmitSuccess();
  };

  return <DistributionSetTagForm onSubmit={handleSubmit} onCancel={onCancel} />;
}
