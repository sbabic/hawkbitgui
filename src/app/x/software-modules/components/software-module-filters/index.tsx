import { ReactNode } from 'react';
import TabbedPanel from '@/app/components/tabbed-panel';
import SoftwareModuleTypeFilter from '../software-module-type-filter';

export default function SoftwareModuleFilters() {
  const content: {
    title: string;
    component: ReactNode;
  }[] = [
    {
      title: 'By Type',
      component: <SoftwareModuleTypeFilter />,
    },
  ];

  return <TabbedPanel items={content} />;
}
