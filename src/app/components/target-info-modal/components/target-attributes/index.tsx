'use client';

import ListWithTitle from '@/app/components/list-with-title';

export default function TargetAttributes({ attributes }: { attributes: Record<string, string> }) {
    const items = Object.entries(attributes).map(([key, value]) => ({
        title: key,
        value: value,
    }));

    return <ListWithTitle title={'Attributes'} items={items} />;
}
