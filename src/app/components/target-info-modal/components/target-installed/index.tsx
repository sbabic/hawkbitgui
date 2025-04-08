'use client';

import ListWithTitle from '@/app/components/list-with-title';

export default function TargetInstalled({
    name,
    version,
    type,
}: {
    name?: string;
    version?: string;
    type?: string;
}) {
    const items = [
        { title: 'Name', value: name },
        { title: 'Version', value: version },
        { title: 'Type', value: type },
    ];
    return <ListWithTitle title={'Installed'} items={items} />;
}
