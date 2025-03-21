'use client';

import ListWithTitle from '@/app/components/list-with-title';

export default function TargetDetails({
    controllerId,
    lastPoll,
    address,
    securityToken,
    description,
}: {
    controllerId?: string;
    lastPoll?: Date;
    address?: string;
    securityToken?: string;
    description?: string;
}) {
    const items = [
        { title: 'Controller ID', value: controllerId },
        { title: 'Last Poll', value: lastPoll?.toString() },
        { title: 'Address', value: address },
        { title: 'Security Token', value: securityToken },
        { title: 'Description', value: description },
    ];
    return <ListWithTitle title={'Details'} items={items} />;
}
