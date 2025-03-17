'use client';

import React from 'react';

type ClickIconProps = React.SVGProps<SVGSVGElement>;

export default function PinIcon({
    width = 24,
    height = 24,
    ...props
}: ClickIconProps) {
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
                transform='translate(0 0.723694)'
                fill='transparent'
            />
            <path
                d='M17.8687 9.04244L18.75 8.16119L12.5 1.97369L11.6813 2.86119L12.4188 3.59869L5.2375 9.67369L4.1625 8.60494L3.28125 9.47369L6.81875 13.0237L1.25 18.5862L2.13125 19.4737L7.7 13.9049L11.25 17.4424L12.1187 16.5549L11.05 15.4862L17.125 8.30494L17.8687 9.04244ZM10.1625 14.5987L6.125 10.5612L13.3063 4.47369L16.25 7.41744L10.1625 14.5987Z'
                fill='currentColor'
            />
        </svg>
    );
}
