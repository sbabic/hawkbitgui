import { ReactNode } from 'react';
import TabbedPanel from '@/app/components/tabbed-panel';
import DistributionSetTagFilter from '../distribution-set-tag-filter';

export default function DistributionSetsFilters() {
  const content: {
    title: string;
    component: ReactNode;
  }[] = [
    {
      title: 'By Tags',
      component: <DistributionSetTagFilter />,
    },
  ];

  return <TabbedPanel items={content} />;
}
