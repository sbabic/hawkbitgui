'use client';
import CardWithSidebar from '@/app/components/card-with-sidebar';
import DistributionDetailsContainer from '@/app/x/deployment/components/distribution-info/containers/distribution-details-container';
import DistributionTags from '@/app/x/deployment/components/distribution-info/components/distribution-tags';
import DistributionMetadataContainer from '@/app/x/deployment/components/distribution-info/containers/distribution-metadata-container';

export default function DistributionInfo() {
  return (
    <CardWithSidebar
      content={[
        { title: 'Details', component: <DistributionDetailsContainer /> },
        { title: 'Tags', component: <DistributionTags /> },
        { title: 'Metadata', component: <DistributionMetadataContainer /> },
      ]}
    />
  );
}
