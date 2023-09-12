export const Button = ({ type = 'button', label = '', isDisabled = false }) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`flex justify-center items-center rounded-[40px] h-[50px] px-[50px] py-[16px] text-white ${
        isDisabled ? 'bg-greymedium' : 'bg-gradient-button'
      }`}
    >
      {label}
    </button>
  );
};
