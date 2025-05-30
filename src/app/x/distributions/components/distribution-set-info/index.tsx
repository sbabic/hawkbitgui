'use client';
import CardWithSidebar from '@/app/components/card-with-sidebar';
import DistributionSetDetailsContainer from '../../containers/distribution-set-details-container';
import DistributionSetModulesContainer from '../../containers/distribution-set-modules-container';
import DistributionSetLogsContainer from '../../containers/distribution-set-logs-container';
import DistributionSetMetadataContainer from '../../containers/distribution-set-metadata-container';

export default function DistributionSetInfo() {
  return (
    <CardWithSidebar
      content={[
        { title: 'Details', component: <DistributionSetDetailsContainer /> },
        {
          title: 'Modules',
          component: <DistributionSetModulesContainer />,
        },
        {
          title: 'Tags',
          component: <></>,
        },
        {
          title: 'Logs',
          component: <DistributionSetLogsContainer />,
        },
        { title: 'Metadata', component: <DistributionSetMetadataContainer /> },
      ]}
    />
  );
}
