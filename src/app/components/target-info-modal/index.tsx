'use client';
import Modal from '@/app/components/modal';
import CardWithSidebar from '@/app/components/card-with-sidebar';
import TargetDetails from '@/app/components/target-info-modal/components/target-details';
import TargetAttributes from '@/app/components/target-info-modal/components/target-attributes';
import TargetAssigned from '@/app/components/target-info-modal/components/target-assigned';
import TargetInstalled from '@/app/components/target-info-modal/components/target-installed';
import TargetLogs from '@/app/components/target-info-modal/components/target-logs';

export default function TargetInfoModal({
    isOpen,
    onClose,
}: {
    isOpen?: boolean;
    onClose?: () => void;
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <CardWithSidebar
                content={[
                    { title: 'Details', component: <TargetDetails /> },
                    { title: 'Attributes', component: <TargetAttributes /> },
                    { title: 'Assigned', component: <TargetAssigned /> },
                    { title: 'Installed', component: <TargetInstalled /> },
                    { title: 'Tags', component: <div>Tags</div> },
                    { title: 'Logs', component: <TargetLogs /> },
                    { title: 'Metadata', component: <div>Metadata</div> },
                ]}
            />
        </Modal>
    );
}
