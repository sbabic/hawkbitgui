import React from 'react';

type ChevronDownIconProps = React.SVGProps<SVGSVGElement>;

export default function ChevronDownIcon({ width = 24, height = 24, ...props }: ChevronDownIconProps) {
    return (
        <svg width={width} height={height} viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
            <g clipPath='url(#clip0_595_3453)'>
                <path d='M5.5575 6.4425L9 9.8775L12.4425 6.4425L13.5 7.5L9 12L4.5 7.5L5.5575 6.4425Z' fill='currentColor' />
            </g>
            <defs>
                <clipPath id='clip0_595_3453'>
                    <rect width='18' height='18' fill='white' />
                </clipPath>
            </defs>
        </svg>
    );
}
