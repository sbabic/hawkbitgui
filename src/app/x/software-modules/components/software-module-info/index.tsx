'use client';
import CardWithSidebar from '@/app/components/card-with-sidebar';
import SoftwareModuleDetailsContainer from '../../containers/software-module-details-container';
import SoftwareModuleLogsContainer from '../../containers/software-module-logs-container';
import SoftwareModuleMetadataContainer from '../../containers/software-module-metadata-container';

export default function SoftwareModuleInfo() {
  return (
    <CardWithSidebar
      content={[
        { title: 'Details', component: <SoftwareModuleDetailsContainer /> },
        {
          title: 'Logs',
          component: <SoftwareModuleLogsContainer />,
        },
        { title: 'Metadata', component: <SoftwareModuleMetadataContainer /> },
      ]}
    />
  );
}
