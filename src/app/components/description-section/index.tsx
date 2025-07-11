'use client';

import Text from '../text';

export default function DescriptionSection({ description }: { description: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        width: '100%',
        paddingRight: '100px',
        gap: '32px',
      }}
    >
      <Text variant='heading-2'>Description</Text>
      <Text>{description}</Text>
    </div>
  );
}
