import React from 'react';

type PlayIconProps = React.SVGProps<SVGSVGElement>;

export default function PlayIcon({ width = 24, height = 24, ...props }: PlayIconProps) {
    return (
        <svg width={width} height={height} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
            <rect width='20' height='20' fill='white' fillOpacity='0.01' style={{ mixBlendMode: 'multiply' }} />
            <path
                d='M4.375 17.4999C4.20924 17.4999 4.05027 17.4341 3.93306 17.3169C3.81585 17.1997 3.75 17.0407 3.75 16.8749V3.12492C3.74999 3.01631 3.77829 2.90957 3.8321 2.81522C3.88591 2.72088 3.96338 2.64218 4.05687 2.5869C4.15037 2.53162 4.25665 2.50165 4.36525 2.49995C4.47385 2.49826 4.58102 2.5249 4.67619 2.57724L17.1762 9.45224C17.2743 9.50617 17.356 9.58544 17.413 9.68177C17.47 9.77811 17.5 9.88798 17.5 9.99989C17.5 10.1118 17.47 10.2217 17.413 10.318C17.356 10.4143 17.2743 10.4936 17.1762 10.5475L4.67619 17.4225C4.58391 17.4733 4.48031 17.4999 4.375 17.4999ZM5 4.18174V15.8179L15.578 9.99992L5 4.18174Z'
                fill='currentColor'
            />
        </svg>
    );
}
