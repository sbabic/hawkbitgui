import { ReactNode } from 'react';
import ByStatusFilterContainer from '@/app/components/target-filters/containers/by-status-filter-container';
import TagFilterManager from '@/app/components/target-filters/components/tag-filter-manager';
import TypeFilterManager from '@/app/components/target-filters/components/type-filter-manager';
import TabbedPanel from '@/app/components/tabbed-panel';

export default function TargetFilters() {
  const content: {
    title: string;
    component: ReactNode;
  }[] = [
    {
      title: 'By Status',
      component: <ByStatusFilterContainer />,
    },
    {
      title: 'By Tags',
      component: <TagFilterManager />,
    },
    {
      title: 'By Type',
      component: <TypeFilterManager />,
    },
    {
      title: 'Custom Filter',
      component: <div></div>,
    },
  ];

  return <TabbedPanel items={content} />;
}
