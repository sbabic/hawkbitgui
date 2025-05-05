'use client';
import CardWithSidebar from '@/app/components/card-with-sidebar';
import DistributionDetailsContainer from '@/app/x/deployment/components/distribution-info/containers/distribution-details-container';

export default function DistributionInfo() {
    return <CardWithSidebar content={[{ title: 'Details', component: <DistributionDetailsContainer /> }]} />;
}
