'use client';

import DescriptionSection from '@/app/components/description-section';
import Divider from '@/app/components/divider';
import ListWithTitle from '@/app/components/list-with-title';
import { SoftwareModule } from '@/entities';

export default function SoftwareModuleDetails({ softwareModule }: { softwareModule: SoftwareModule }) {
  console.log(softwareModule);

  const items = [
    { title: 'Name', value: softwareModule.name },
    { title: 'Vendor', value: softwareModule.vendor },
    { title: 'Type', value: softwareModule.type },
    { title: 'Assignment type', value: softwareModule.typeName },
    { title: 'Artifact encryption', value: softwareModule.encrypted ? 'Enabled' : 'Disabled' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <ListWithTitle title={'Details'} items={items} />
      {softwareModule.description && softwareModule.description !== '' && (
        <>
          <Divider orientation='horizontal' />
          <DescriptionSection description={softwareModule.description} />
        </>
      )}
    </div>
  );
}
