import React from 'react';

export default function SupportSvg({ color = '#F1C50E' }) {
  return (
    <svg
      width='43'
      height='43'
      viewBox='0 0 43 43'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16.0494 18.8125C16.0494 17.3243 14.8451 16.1216 13.3619 16.1216L12.0938 16.125C9.12574 16.125 6.71875 18.532 6.71875 21.5067V25.5203C6.71875 28.4959 9.1291 30.9062 12.0938 30.9062H13.4375C14.9207 30.9062 16.125 29.7002 16.125 28.2137L16.0494 18.8125ZM21.5 0C9.48184 0 0.3849 10.0025 0.00174688 21.5L0 24.8594C0 25.9764 0.902832 26.875 1.94004 26.875C2.97725 26.875 4.03125 25.9764 4.03125 24.8594V21.5C4.03125 11.867 11.8704 4.04805 21.5 4.04805C31.133 4.04805 38.9688 11.867 38.9688 21.5V33.5938C38.9688 35.449 37.4646 36.9531 35.6094 36.9531H26.3123C25.6152 35.7521 24.3303 34.9375 22.8438 34.9375H20.3074C18.3581 34.9375 16.5701 36.2552 16.2031 38.1701C15.7051 40.7492 17.6703 43 20.0807 43H22.8438C24.332 43 25.6178 42.1844 26.3157 40.9844H35.6094C39.691 40.9844 43 37.6754 43 33.5938V21.5C42.6137 10.0025 33.5182 0 21.5 0ZM30.9062 30.9062C33.8743 30.9062 36.2812 28.4959 36.2812 25.5203V21.5084C36.2812 18.5354 33.8709 16.125 30.9062 16.125H29.5625C28.0793 16.125 26.875 17.3293 26.875 18.8159V28.2104C26.875 29.7053 28.076 30.9062 29.5625 30.9062H30.9062Z'
        fill={color}
      />
    </svg>
  );
}