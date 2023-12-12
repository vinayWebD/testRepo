const SpinningLoader = ({
  fill = '#ffffff',
  width = 'w-5',
  height = 'h-5',
  marginLeft = '-ml-1',
  marginRight = 'mr-3',
  color = 'currentColor',
}) => {
  return (
    <svg
      className={`animate-spin ${marginLeft} ${marginRight} text-${fill} ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke={color} strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill={color}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export default SpinningLoader;
