'use client';

import React from 'react';

type CalendarIconProps = React.SVGProps<SVGSVGElement>;

export default function CalendarIcon({ width = 24, height = 24, ...props }: CalendarIconProps) {
    return (
        <svg width={width} height={height} viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
            <rect width='20' height='20' transform='translate(0 0.5)' fill='white' fillOpacity='0.01' style={{ mixBlendMode: 'multiply' }} />
            <path
                d='M16.25 3H13.75V1.75H12.5V3H7.5V1.75H6.25V3H3.75C3.0625 3 2.5 3.5625 2.5 4.25V16.75C2.5 17.4375 3.0625 18 3.75 18H16.25C16.9375 18 17.5 17.4375 17.5 16.75V4.25C17.5 3.5625 16.9375 3 16.25 3ZM16.25 16.75H3.75V8H16.25V16.75ZM16.25 6.75H3.75V4.25H6.25V5.5H7.5V4.25H12.5V5.5H13.75V4.25H16.25V6.75Z'
                fill='currentColor'
            />
        </svg>
    );
}
