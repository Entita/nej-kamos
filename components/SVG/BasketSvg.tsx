import React from 'react';

export default function BasketSvg({
  color = 'black',
  size = 'normal',
}: {
  color?: string;
  size?: 'normal' | 'small';
}) {
  if (size === 'normal')
    return (
      <svg
        width='43'
        height='38'
        viewBox='0 0 43 38'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill={color}
          stroke='white'
          strokeWidth='.5'
          d='M12.8179 14.1831H30.1821L24.0905 2.60278C23.6351 1.72996 23.9785 0.654608 24.8519 0.20076C25.7328 -0.253088 26.8153 0.0865375 27.2707 0.959573L34.2208 14.1831H40.6111C41.9325 14.1831 43 15.3113 43 16.5581C43 17.9386 41.9325 18.9331 40.6111 18.9331L36.7366 34.4003C36.1394 36.5155 34.2955 37.9999 32.1007 37.9999H10.8321C8.70451 37.9999 6.7934 36.5155 6.26187 34.4003L2.38889 18.9331C1.06977 18.9331 0 17.9386 0 16.5581C0 15.3113 1.06977 14.1831 2.38889 14.1831H8.77917L15.7293 0.959573C16.1847 0.0865375 17.2672 -0.253088 18.1481 0.20076C19.0215 0.654608 19.3649 1.72996 18.9095 2.60278L12.8179 14.1831ZM14.2661 22.4956C14.2661 21.9019 13.7958 21.3081 13.0717 21.3081C12.4819 21.3081 11.8773 21.9019 11.8773 22.4956V29.6206C11.8773 30.3405 12.4819 30.8081 13.0717 30.8081C13.7958 30.8081 14.2661 30.3405 14.2661 29.6206V22.4956ZM20.2384 22.4956V29.6206C20.2384 30.3405 20.8431 30.8081 21.4328 30.8081C22.1569 30.8081 22.6944 30.3405 22.6944 29.6206V22.4956C22.6944 21.9019 22.1569 21.3081 21.4328 21.3081C20.8431 21.3081 20.2384 21.9019 20.2384 22.4956ZM31.0556 22.4956C31.0556 21.9019 30.5181 21.3081 29.8611 21.3081C29.2042 21.3081 28.6667 21.9019 28.6667 22.4956V29.6206C28.6667 30.3405 29.2042 30.8081 29.8611 30.8081C30.5181 30.8081 31.0556 30.3405 31.0556 29.6206V22.4956Z'
        />
      </svg>
    );
  return (
    <svg
      width='18'
      height='16'
      viewBox='0 0 18 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.36562 5.97198H12.6344L10.0844 1.0961C9.89375 0.728603 10.0375 0.275827 10.4031 0.0847352C10.7719 -0.106356 11.225 0.036642 11.4156 0.404232L14.325 5.97198H17C17.5531 5.97198 18 6.44698 18 6.97197C18 7.55322 17.5531 7.97196 17 7.97196L15.3781 14.4844C15.1281 15.375 14.3562 16 13.4375 16H4.53438C3.64375 16 2.84375 15.375 2.62125 14.4844L1 7.97196C0.447812 7.97196 0 7.55322 0 6.97197C0 6.44698 0.447812 5.97198 1 5.97198H3.675L6.58437 0.404232C6.775 0.036642 7.22813 -0.106356 7.59688 0.0847352C7.9625 0.275827 8.10625 0.728603 7.91563 1.0961L5.36562 5.97198ZM5.97188 9.47195C5.97188 9.22195 5.775 8.97195 5.47188 8.97195C5.225 8.97195 4.97188 9.22195 4.97188 9.47195V12.4719C4.97188 12.775 5.225 12.9719 5.47188 12.9719C5.775 12.9719 5.97188 12.775 5.97188 12.4719V9.47195ZM8.47188 9.47195V12.4719C8.47188 12.775 8.725 12.9719 8.97188 12.9719C9.275 12.9719 9.5 12.775 9.5 12.4719V9.47195C9.5 9.22195 9.275 8.97195 8.97188 8.97195C8.725 8.97195 8.47188 9.22195 8.47188 9.47195ZM13 9.47195C13 9.22195 12.775 8.97195 12.5 8.97195C12.225 8.97195 12 9.22195 12 9.47195V12.4719C12 12.775 12.225 12.9719 12.5 12.9719C12.775 12.9719 13 12.775 13 12.4719V9.47195Z'
        fill={color}
      />
    </svg>
  );
}