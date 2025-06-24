'use client';
import CardWithSidebar from '@/app/components/card-with-sidebar';
import TargetDetailsContainer from '@/app/components/target-info-modal/containers/target-details-container';
import TargetAttributesContainer from '@/app/components/target-info-modal/containers/target-attributes-container';
import TargetAssignedDistributionContainer from '@/app/components/target-info-modal/containers/target-assigned-distribution-container';
import TargetInstalledDistributionContainer from '@/app/components/target-info-modal/containers/target-installed-distribution-container';
import TargetMetadataContainer from '@/app/components/target-info-modal/containers/target-metadata-container';
import TargetTags from '@/app/components/target-info-modal/components/target-tags';

export default function TargetInfo() {
  return (
    <CardWithSidebar
      content={[
        { title: 'Details', component: <TargetDetailsContainer /> },
        {
          title: 'Attributes',
          component: <TargetAttributesContainer />,
        },
        {
          title: 'Assigned',
          component: <TargetAssignedDistributionContainer />,
        },
        {
          title: 'Installed',
          component: <TargetInstalledDistributionContainer />,
        },
        { title: 'Tags', component: <TargetTags /> },
        { title: 'Metadata', component: <TargetMetadataContainer /> },
      ]}
    />
  );
}
