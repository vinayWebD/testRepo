import React from 'react';

const SeeMoreLessIcon = ({ className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_1924_8642)">
        <path
          d="M14.168 14.168L10.0013 10.0013L5.83464 14.168"
          stroke="#0071BC"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.168 9.16797L10.0013 5.0013L5.83464 9.16797"
          stroke="#0071BC"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1924_8642">
          <rect width="20" height="20" fill="white" transform="matrix(-1 0 0 -1 20 20.001)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SeeMoreLessIcon;
