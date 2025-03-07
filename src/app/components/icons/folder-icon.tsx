'use client';

import React from 'react';

type FolderIconProps = React.SVGProps<SVGSVGElement>;

export default function FolderIcon({
    width = 24,
    height = 24,
    ...props
}: FolderIconProps) {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 18 19'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M5.25 12.8429H3C2.80109 12.8429 2.61032 12.7639 2.46967 12.6232C2.32902 12.4826 2.25 12.2918 2.25 12.0929V3.09291C2.25 2.894 2.32902 2.70323 2.46967 2.56258C2.61032 2.42193 2.80109 2.34291 3 2.34291H6C6.0987 2.34234 6.19655 2.36126 6.28793 2.39858C6.37931 2.4359 6.46242 2.4909 6.5325 2.56041L8.34 4.37541C8.41008 4.44492 8.49319 4.49991 8.58457 4.53724C8.67595 4.57456 8.77379 4.59348 8.8725 4.59291H12.75C12.9489 4.59291 13.1397 4.67193 13.2803 4.81258C13.421 4.95323 13.5 5.144 13.5 5.34291V7.59291'
                stroke='#562563'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
            />
            <path
                d='M15 7.5929H6C5.58579 7.5929 5.25 7.92868 5.25 8.3429V15.0929C5.25 15.5071 5.58579 15.8429 6 15.8429H15C15.4142 15.8429 15.75 15.5071 15.75 15.0929V8.3429C15.75 7.92868 15.4142 7.5929 15 7.5929Z'
                stroke='#562563'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
            />
        </svg>
    );
}
