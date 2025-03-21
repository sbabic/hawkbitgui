'use client';
import Modal from '@/app/components/modal';
import CardWithSidebar from '@/app/components/card-with-sidebar';
import TargetDetails from '@/app/components/target-info-modal/components/target-details';

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
                    { title: 'Attributes', component: <div>Attributes</div> },
                    { title: 'Assigned', component: <div>Assigned</div> },
                    { title: 'Installed', component: <div>Installed</div> },
                    { title: 'Tags', component: <div>Tags</div> },
                    { title: 'Logs', component: <div>Logs</div> },
                    { title: 'Metadata', component: <div>Metadata</div> },
                ]}
            />
        </Modal>
    );
}
