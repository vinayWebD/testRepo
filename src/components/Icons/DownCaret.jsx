const DownCaret = ({ fill = 'white' }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Frame" clipPath="url(#clip0_1950_3150)">
        <path
          id="Vector"
          d="M6 9L12 15L18 9"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1950_3150">
          <rect width="24" height="24" fill={fill} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DownCaret;
