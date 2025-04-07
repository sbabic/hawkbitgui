'use client';
import CardWithSidebar from '@/app/components/card-with-sidebar';
import TargetAssigned from '@/app/components/target-info-modal/components/target-assigned';
import TargetInstalled from '@/app/components/target-info-modal/components/target-installed';
import TargetLogs from '@/app/components/target-info-modal/components/target-logs';
import TargetDetailsContainer from '@/app/components/target-info-modal/containers/target-details-container';
import TargetAttributesContainer from '@/app/components/target-info-modal/containers/target-attributes-container';

export default function TargetInfo() {
    return (
        <CardWithSidebar
            content={[
                { title: 'Details', component: <TargetDetailsContainer /> },
                {
                    title: 'Attributes',
                    component: <TargetAttributesContainer />,
                },
                { title: 'Assigned', component: <TargetAssigned /> },
                { title: 'Installed', component: <TargetInstalled /> },
                { title: 'Tags', component: <div>Tags</div> },
                { title: 'Logs', component: <TargetLogs /> },
                { title: 'Metadata', component: <div>Metadata</div> },
            ]}
        />
    );
}
