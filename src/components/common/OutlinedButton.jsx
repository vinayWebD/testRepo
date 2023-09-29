const OutlinedButton = ({ label, Icon, IconDisabled, disabled = false, ...props }) => {
  return (
    <button
      disabled={disabled}
      className={`outlined-btn text-blueprimary border-2 border-blueprimary rounded-full py-2 px-[30px] flex items-center space-x-2 hover: focus:outline-none     ${
        disabled ? 'cursor-not-allowed border-2 border-greymedium text-greymedium opacity-70' : ''
      }`}
      {...props}
    >
      {IconDisabled && disabled ? IconDisabled : Icon}
      <span>{label}</span>
    </button>
  );
};

export default OutlinedButton;
