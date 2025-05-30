'use client';

import ListWithTitle from '@/app/components/list-with-title';
import { Distribution } from '@/entities';
import dayjs from 'dayjs';

type DistributionSetLogsProps = {
  distributionSet: Distribution;
};

export default function DistributionSetLogs({ distributionSet }: DistributionSetLogsProps) {
  const items = [
    { title: 'Created At', value: dayjs(distributionSet.createdAt).format('YYYY-MM-DD HH:mm:ss') },
    { title: 'Created By', value: distributionSet.createdBy },
    { title: 'Last Modified At', value: dayjs(distributionSet.lastModifiedAt).format('YYYY-MM-DD HH:mm:ss') },
    { title: 'Last Modified By', value: distributionSet.lastModifiedBy },
  ];

  return <ListWithTitle title={'Logs'} items={items} />;
}
