const RadioButton = ({ label, name, value, checked, onChange }) => {
  return (
    <div className="flex gap-4 items-center">
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="w-[20px] h-[20px] checked:bg-blueprimary"
      />
      <label className="text-[14px] font-normal cursor-pointer" htmlFor={value}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
