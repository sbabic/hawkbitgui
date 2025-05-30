import { ReactNode } from 'react';
import TabbedPanel from '@/app/components/tabbed-panel';
import TagFilterManager from '@/app/x/deployment/components/distribution-filters/components/tag-filter-manager';

export default function DistributionFilters() {
  const content: {
    title: string;
    component: ReactNode;
  }[] = [
    {
      title: 'By Tags',
      component: <TagFilterManager />,
    },
  ];

  return <TabbedPanel items={content} />;
}
