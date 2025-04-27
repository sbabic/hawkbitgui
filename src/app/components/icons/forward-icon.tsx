import React from 'react';

type ForwardIconProps = React.SVGProps<SVGSVGElement>;

export default function ForwardIcon({ width = 24, height = 24, ...props }: ForwardIconProps) {
    return (
        <svg width={width} height={height} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
            <rect width='20' height='20' fill='white' fillOpacity='0.01' style={{ mixBlendMode: 'multiply' }} />
            <path
                d='M3.125 17.5C2.95924 17.5 2.80027 17.4341 2.68306 17.3169C2.56585 17.1997 2.5 17.0407 2.5 16.875V3.12498C2.49957 3.01485 2.52824 2.90656 2.58312 2.81107C2.63799 2.71559 2.71713 2.6363 2.8125 2.58123C2.90752 2.52638 3.01529 2.4975 3.125 2.4975C3.23472 2.4975 3.34249 2.52638 3.4375 2.58123L15.3125 9.45623C15.4087 9.51074 15.4887 9.58979 15.5444 9.68532C15.6 9.78084 15.6293 9.88942 15.6293 9.99998C15.6293 10.1105 15.6 10.2191 15.5444 10.3146C15.4887 10.4102 15.4087 10.4892 15.3125 10.5437L3.4375 17.4187C3.34225 17.4727 3.23449 17.5007 3.125 17.5ZM3.75 4.20623V15.7937L13.75 9.99998L3.75 4.20623Z'
                fill='currentColor'
            />
            <path d='M18.75 2.49998H17.5V17.5H18.75V2.49998Z' fill='currentColor' />
        </svg>
    );
}
