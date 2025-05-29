import { ReactNode, useState } from 'react';
import ByDistributionsFilterContainer from '@/app/x/deployment/components/distribution-filters/containers/by-distributions-filter-container';
import TabbedPanel from '@/app/components/tabbed-panel';

export default function DistributionFilters() {
  const content: {
    title: string;
    component: ReactNode;
  }[] = [
    {
      title: 'By Tags',
      component: <ByDistributionsFilterContainer />,
    },
  ];

  return <TabbedPanel items={content} />;
}
