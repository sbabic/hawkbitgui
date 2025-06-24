'use client';

import React from 'react';

type SpinnerIconProps = React.SVGProps<SVGSVGElement>;

export default function SpinnerIcon({ width = 24, height = 24, ...props }: SpinnerIconProps) {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z' fill='currentColor'>
        <animateTransform attributeName='transform' type='rotate' from='0 12 12' to='360 12 12' dur='1s' repeatCount='indefinite' />
      </path>
    </svg>
  );
}
