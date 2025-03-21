'use client';

import ListWithTitle from '@/app/components/list-with-title';

export default function TargetLogs({
    createdAt,
    createdBy,
    lastModifiedAt,
    lastModifiedBy,
}: {
    createdAt?: Date;
    createdBy?: string;
    lastModifiedAt?: Date;
    lastModifiedBy?: string;
}) {
    const items = [
        { title: 'Created At', value: createdAt?.toLocaleString() },
        { title: 'Created By', value: createdBy },
        { title: 'Last Modified At', value: lastModifiedAt?.toLocaleString() },
        { title: 'Last Modified By', value: lastModifiedBy },
    ];
    return <ListWithTitle title={'Logs'} items={items} />;
}
