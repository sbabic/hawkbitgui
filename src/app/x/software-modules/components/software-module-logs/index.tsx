'use client';

import ListWithTitle from '@/app/components/list-with-title';
import { SoftwareModule } from '@/entities';

export default function SoftwareModuleLogs({ softwareModule }: { softwareModule: SoftwareModule }) {
  const items = [
    { title: 'Created at', value: softwareModule.createdAt },
    { title: 'Created by', value: softwareModule.createdBy },
    { title: 'Last modified at', value: softwareModule.lastModifiedAt },
    { title: 'Last modified by', value: softwareModule.lastModifiedBy },
  ];

  return <ListWithTitle title={'Logs'} items={items} />;
}
