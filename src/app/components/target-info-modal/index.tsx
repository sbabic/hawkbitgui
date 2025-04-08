'use client';
import CardWithSidebar from '@/app/components/card-with-sidebar';
import TargetDetailsContainer from '@/app/components/target-info-modal/containers/target-details-container';
import TargetAttributesContainer from '@/app/components/target-info-modal/containers/target-attributes-container';
import TargetInstalledContainer from '@/app/components/target-info-modal/containers/target-installed-container';
import TargetAssignedContainer from '@/app/components/target-info-modal/containers/target-assigned-container';

export default function TargetInfo() {
    return (
        <CardWithSidebar
            content={[
                { title: 'Details', component: <TargetDetailsContainer /> },
                {
                    title: 'Attributes',
                    component: <TargetAttributesContainer />,
                },
                { title: 'Assigned', component: <TargetAssignedContainer /> },
                { title: 'Installed', component: <TargetInstalledContainer /> },
                { title: 'Tags', component: <div>Tags</div> },
                { title: 'Metadata', component: <div>Metadata</div> },
            ]}
        />
    );
}
