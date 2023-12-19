import React from 'react';

function CrossIcon({ fill = '#333' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
      <g
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        clipPath="url(#clip0_2313_44497)"
      >
        <path d="M15 5L5 15"></path>
        <path d="M5 5l10 10"></path>
      </g>
      <defs>
        <clipPath id="clip0_2313_44497">
          <path fill="#fff" d="M0 0H20V20H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default CrossIcon;
