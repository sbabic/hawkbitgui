'use client';

import React from 'react';

type ClickIconProps = React.SVGProps<SVGSVGElement>;

export default function TrashIcon({ width = 24, height = 24, ...props }: ClickIconProps) {
    return (
        <svg width={width} height={height} viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
            <rect width='20' height='20' transform='translate(0 0.723694)' fill='transparent' />
            <path d='M8.75 8.22369H7.5V15.7237H8.75V8.22369Z' fill='currentColor' />
            <path d='M12.5 8.22369H11.25V15.7237H12.5V8.22369Z' fill='currentColor' />
            <path
                d='M2.5 4.47369V5.72369H3.75V18.2237C3.75 18.5552 3.8817 18.8732 4.11612 19.1076C4.35054 19.342 4.66848 19.4737 5 19.4737H15C15.3315 19.4737 15.6495 19.342 15.8839 19.1076C16.1183 18.8732 16.25 18.5552 16.25 18.2237V5.72369H17.5V4.47369H2.5ZM5 18.2237V5.72369H15V18.2237H5Z'
                fill='currentColor'
            />
            <path d='M12.5 1.97369H7.5V3.22369H12.5V1.97369Z' fill='currentColor' />
        </svg>
    );
}
