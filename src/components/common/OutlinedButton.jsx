const OutlinedButton = ({
  label,
  Icon,
  IconDisabled,
  disabled = false,
  isIcon = true,
  isSkip = false,
  isDelete = false,
  ...props
}) => {
  const renderIcon = () => {
    if (isIcon && disabled) {
      return IconDisabled;
    } else {
      return Icon;
    }
  };
  return (
    <button
      disabled={disabled}
      className={`outlined-btn rounded-full py-2 px-[30px] flex items-center space-x-2 hover: focus:outline-none
      ${disabled ? 'cursor-not-allowed border-2 border-greymedium text-greymedium' : ''}
      ${isSkip || isDelete ? 'border-none' : 'text-blueprimary border-2 border-blueprimary'}
      ${isSkip ? 'text-greydark' : ''}
      ${isDelete ? 'text-deleteRed' : ''}
      `}
      {...props}
    >
      {renderIcon()}
      <span>{label}</span>
    </button>
  );
};

export default OutlinedButton;
