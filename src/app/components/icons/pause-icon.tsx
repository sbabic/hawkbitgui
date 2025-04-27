import React from 'react';

type PauseIconProps = React.SVGProps<SVGSVGElement>;

export default function PauseIcon({ width = 24, height = 24, ...props }: PauseIconProps) {
    return (
        <svg width={width} height={height} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
            <rect width='20' height='20' fill='white' fillOpacity='0.01' style={{ mixBlendMode: 'multiply' }} />
            <path
                d='M7.5 5V15H5V5H7.5ZM7.5 3.75H5C4.66848 3.75 4.35054 3.8817 4.11612 4.11612C3.8817 4.35054 3.75 4.66848 3.75 5V15C3.75 15.3315 3.8817 15.6495 4.11612 15.8839C4.35054 16.1183 4.66848 16.25 5 16.25H7.5C7.83152 16.25 8.14946 16.1183 8.38388 15.8839C8.6183 15.6495 8.75 15.3315 8.75 15V5C8.75 4.66848 8.6183 4.35054 8.38388 4.11612C8.14946 3.8817 7.83152 3.75 7.5 3.75Z'
                fill='currentColor'
            />
            <path
                d='M15 5V15H12.5V5H15ZM15 3.75H12.5C12.1685 3.75 11.8505 3.8817 11.6161 4.11612C11.3817 4.35054 11.25 4.66848 11.25 5V15C11.25 15.3315 11.3817 15.6495 11.6161 15.8839C11.8505 16.1183 12.1685 16.25 12.5 16.25H15C15.3315 16.25 15.6495 16.1183 15.8839 15.8839C16.1183 15.6495 16.25 15.3315 16.25 15V5C16.25 4.66848 16.1183 4.35054 15.8839 4.11612C15.6495 3.8817 15.3315 3.75 15 3.75Z'
                fill='currentColor'
            />
        </svg>
    );
}
