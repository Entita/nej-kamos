import React from 'react';

export default function MainPolySvg({ color = 'black' }) {
  return (
    <svg
      width='778'
      height='432'
      viewBox='0 0 778 432'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_d_111_953)'>
        <path
          d='M151.731 308.8C261.9 355.656 287.273 396.808 344.867 415.042C421.605 439.337 561.046 417.111 596.283 310.384C648.758 151.441 839.522 224.671 742.77 17.6208C657.549 -164.751 724.586 -285.337 531.623 -314.024C462.889 -313.026 121.803 -354.25 100.136 -249.28C81.2148 -157.611 202.87 -149.511 29.8377 34.0699C-54.8692 123.941 62.1817 270.713 151.731 308.8Z'
          fill={color}
        />
      </g>
      <defs>
        <filter
          id='filter0_d_111_953'
          x='0.537109'
          y='-321.181'
          width='777.194'
          height='753.152'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'
            result='hardAlpha'
          />
          <feOffset dx='4' dy='4' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_111_953'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_111_953'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
}
