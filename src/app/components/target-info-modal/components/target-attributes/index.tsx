'use client';

import ListWithTitle from '@/app/components/list-with-title';

export default function TargetAttributes({
    hw,
    macAddress,
    serialNumber,
    vendor,
}: {
    hw?: string;
    macAddress?: string;
    serialNumber?: string;
    vendor?: string;
}) {
    const items = [
        { title: 'Hw', value: hw },
        { title: 'Mac-address', value: macAddress },
        { title: 'Serial-number', value: serialNumber },
        { title: 'Vendor', value: vendor },
    ];
    return <ListWithTitle title={'Attributes'} items={items} />;
}
