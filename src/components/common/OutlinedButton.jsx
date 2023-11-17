import addIcon from '../../assets/images/addIcon.svg';
import SpinningLoader from './SpinningLoader';
const OutlinedButton = ({
  label,
  Icon,
  IconDisabled,
  disabled = false,
  isIcon = true,
  isSkip = false,
  isDelete = false,
  add = false,
  additionalClassNames = '',
  isLoading = false,
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
      className={`outlined-btn rounded-full py-2 px-[20px] flex items-center space-x-2 hover:focus:outline-none
      ${disabled ? 'cursor-not-allowed border-2 border-greymedium text-greymedium' : ''}
      ${isSkip || isDelete ? 'border-none' : 'text-blueprimary border-2 border-blueprimary'}
      ${isSkip ? 'text-greydark' : ''}
      ${isDelete ? 'text-deleteRed' : ''}
      ${additionalClassNames}
      `}
      {...props}
    >
      {renderIcon()}
      {add ? (
        <span>
          <img src={addIcon} alt="add" />{' '}
        </span>
      ) : (
        ''
      )}

      {isLoading ? (
        <SpinningLoader height="h-[14px]" width="w-[14px]" marginLeft="ml-0" marginRight="mr-0" />
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
};
export default OutlinedButton;
