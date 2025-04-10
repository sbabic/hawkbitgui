'use client';

import React from 'react';

type ClickIconProps = React.SVGProps<SVGSVGElement>;

export default function EditIcon({ width = 24, height = 24, ...props }: ClickIconProps) {
    return (
        <svg width={width} height={height} viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
            <rect width='20' height='20' transform='translate(0 0.723694)' fill='transparent' />
            <path d='M18.75 16.9737H1.25V18.2237H18.75V16.9737Z' fill='currentColor' />
            <path
                d='M15.875 6.34869C16.375 5.84869 16.375 5.09869 15.875 4.59869L13.625 2.34869C13.125 1.84869 12.375 1.84869 11.875 2.34869L2.5 11.7237V15.7237H6.5L15.875 6.34869ZM12.75 3.22369L15 5.47369L13.125 7.34869L10.875 5.09869L12.75 3.22369ZM3.75 14.4737V12.2237L10 5.97369L12.25 8.22369L6 14.4737H3.75Z'
                fill='currentColor'
            />
        </svg>
    );
}
