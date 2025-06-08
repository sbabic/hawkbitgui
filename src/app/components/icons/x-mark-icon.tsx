import React from 'react';

type XMarkIconProps = React.SVGProps<SVGSVGElement>;

export default function XMarkIcon({ width = 24, height = 24, ...props }: XMarkIconProps) {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <rect width='24' height='24' fill='white' fillOpacity='0.01' style={{ mixBlendMode: 'multiply' }} />
      <path d='M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z' fill='currentColor' />
    </svg>
  );
}
