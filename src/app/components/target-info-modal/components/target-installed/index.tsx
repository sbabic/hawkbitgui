'use client';

import ListWithTitle from '@/app/components/list-with-title';

export default function TargetInstalled({
    name,
    version,
    os,
}: {
    name?: string;
    version?: string;
    os?: string;
}) {
    const items = [
        { title: 'Name', value: name },
        { title: 'Version', value: version },
        { title: 'Os', value: os },
    ];
    return <ListWithTitle title={'Installed'} items={items} />;
}
