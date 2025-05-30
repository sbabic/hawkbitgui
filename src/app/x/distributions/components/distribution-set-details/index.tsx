'use client';

import DescriptionSection from '@/app/components/description-section';
import Divider from '@/app/components/divider';
import ListWithTitle from '@/app/components/list-with-title';
import { Distribution } from '@/entities';

export default function DistributionSetDetails({ distributionSet }: { distributionSet: Distribution }) {
  const items = [
    { title: 'Name', value: distributionSet.name },
    { title: 'Type Name', value: distributionSet.typeName },
    {
      title: 'Required Migration Steps',
      value: distributionSet.requiredMigrationStep ? 'Yes' : 'No',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <ListWithTitle title={'Details'} items={items} />
      {distributionSet.description && distributionSet.description !== '' && (
        <>
          <Divider orientation='horizontal' />
          <DescriptionSection description={distributionSet.description} />
        </>
      )}
    </div>
  );
}
