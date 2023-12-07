import { ArrowIcon } from '../Icons/ArrowIcon';
import SpinningLoader from './SpinningLoader';

export const Button = ({
  type = 'button',
  label = '',
  isDisabled = false,
  showArrowIcon = true,
  additionalClassNames = '',
  isLoading = false,
  onClick = () => {},
  isDelete,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      className={`group flex justify-center items-center rounded-[40px] h-[40px]  py-[16px] text-white ${
        isDelete
          ? 'bg-[#DE0B0B]  px-[30px]'
          : isDisabled
          ? 'bg-greymedium  px-[50px]'
          : 'bg-gradient-button  px-[50px]'
      } ${additionalClassNames}`}
    >
      {isLoading && <SpinningLoader />}
      <span className="font-semibold">{label}</span>

      {!isDisabled && showArrowIcon && (
        <span className="ml-2 arrow-icon transform -translate-x-2 w-0 opacity-0 group-hover:translate-x-0 group-hover:block group-hover:opacity-100 transition-transform duration-300">
          <ArrowIcon />
        </span>
      )}
    </button>
  );
};
