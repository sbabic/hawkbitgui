'use client';

import React from 'react';

type ExpandIconProps = React.SVGProps<SVGSVGElement>;

export default function ExpandIcon({
    width = 24,
    height = 24,
    ...props
}: ExpandIconProps) {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 20 21'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <rect
                width='20'
                height='20'
                transform='translate(0 0.723633)'
                fill='transparent'
            />
            <path
                d='M12.5 1.97363V3.22363H16.6163L11.25 8.58738L12.1337 9.47363L17.5 4.10738V8.22363H18.75V1.97363H12.5Z'
                fill='currentColor'
            />
            <path
                d='M8.75 12.8586L7.87 11.9736L2.5 17.3399V13.2236H1.25V19.4736H7.5V18.2236H3.38375L8.75 12.8586Z'
                fill='currentColor'
            />
        </svg>
    );
}
