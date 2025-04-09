'use client';

import React from 'react';

type ClickIconProps = React.SVGProps<SVGSVGElement>;

export default function PlusIcon({
    width = 24,
    height = 24,
    ...props
}: ClickIconProps) {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 12 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M4.75 9.75H0.25V8.25H4.75V3.75H6.25V8.25H10.75V9.75H6.25V14.25H4.75V9.75Z'
                fill='currentColor'
            />
        </svg>
    );
}
