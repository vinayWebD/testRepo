import React from 'react';

const ThreeDots = ({ className = '' }) => {
  return (
    <svg
      width="5"
      height="24"
      viewBox="0 0 5 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="Group 3240">
        <circle
          id="Ellipse 71"
          cx="2.3998"
          cy="21.6"
          r="2.4"
          transform="rotate(-180 2.3998 21.6)"
          fill="#A1A0A0"
        />
        <ellipse
          id="Ellipse 72"
          cx="2.3998"
          cy="12.0004"
          rx="2.4"
          ry="2.4"
          transform="rotate(-180 2.3998 12.0004)"
          fill="#A1A0A0"
        />
        <ellipse
          id="Ellipse 73"
          cx="2.3998"
          cy="2.40078"
          rx="2.4"
          ry="2.4"
          transform="rotate(-180 2.3998 2.40078)"
          fill="#A1A0A0"
        />
      </g>
    </svg>
  );
};

export default ThreeDots;
