import addIcon from '../../assets/images/addIcon.svg';
const OutlinedButton = ({
  label,
  Icon,
  IconDisabled,
  disabled = false,
  isIcon = true,
  isSkip = false,
  isDelete = false,
  add,
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
      className={`outlined-btn rounded-full py-2 px-[20px] flex items-center space-x-2 hover: focus:outline-none flex
      ${disabled ? 'cursor-not-allowed border-2 border-greymedium text-greymedium' : ''}
      ${isSkip || isDelete ? 'border-none' : 'text-blueprimary border-2 border-blueprimary'}
      ${isSkip ? 'text-greydark' : ''}
      ${isDelete ? 'text-deleteRed' : ''}
      `}
      {...props}
    >
      {renderIcon()}
      <span>{add ? <img src={addIcon} alt="add" /> : ''}</span>
      <span>{label}</span>
    </button>
  );
};

export default OutlinedButton;
