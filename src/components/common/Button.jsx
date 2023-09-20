import { ArrowIcon } from '../Icons/ArrowIcon';

export const Button = ({
  type = 'button',
  label = '',
  isDisabled = false,
  showArrowIcon = true,
  additionalClassNames = '',
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      className={`${additionalClassNames} group flex justify-center items-center rounded-[40px] h-[50px] px-[50px] py-[16px] text-white ${
        isDisabled ? 'bg-greymedium' : 'bg-gradient-button'
      }`}
    >
      <span className="">{label}</span>

      {!isDisabled && showArrowIcon && (
        <span className="ml-2 arrow-icon transform -translate-x-2 w-0 opacity-0 group-hover:translate-x-0 group-hover:block group-hover:opacity-100 transition-transform transition-opacity duration-300">
          <ArrowIcon />
        </span>
      )}
    </button>
  );
};
