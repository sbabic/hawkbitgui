'use client';
import CardWithSidebar from '@/app/components/card-with-sidebar';
import DistributionDetailsContainer from '@/app/x/deployment/components/distribution-info/containers/distribution-details-container';
import DistributionTags from '@/app/x/deployment/components/distribution-info/components/distribution-tags';

export default function DistributionInfo() {
    return (
        <CardWithSidebar
            content={[
                { title: 'Details', component: <DistributionDetailsContainer /> },
                { title: 'Tags', component: <DistributionTags /> },
            ]}
        />
    );
}
