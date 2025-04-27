import React from 'react';

type CopyIconProps = React.SVGProps<SVGSVGElement>;

export default function CopyIcon({ width = 24, height = 24, ...props }: CopyIconProps) {
    return (
        <svg width={width} height={height} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
            <rect width='20' height='20' fill='white' fillOpacity='0.01' style={{ mixBlendMode: 'multiply' }} />
            <path
                d='M17.125 9.1875L13.3125 5.375C13.125 5.125 12.8125 5 12.5 5H7.5C6.8125 5 6.25 5.5625 6.25 6.25V17.5C6.25 18.1875 6.8125 18.75 7.5 18.75H16.25C16.9375 18.75 17.5 18.1875 17.5 17.5V10.0625C17.5 9.75 17.375 9.4375 17.125 9.1875ZM12.5 6.25L16.1875 10H12.5V6.25ZM7.5 17.5V6.25H11.25V10C11.25 10.6875 11.8125 11.25 12.5 11.25H16.25V17.5H7.5Z'
                fill='currentColor'
            />
            <path d='M3.75 11.25H2.5V2.5C2.5 1.8125 3.0625 1.25 3.75 1.25H12.5V2.5H3.75V11.25Z' fill='currentColor' />
        </svg>
    );
}
