const RadioButton = ({ label, name, value, checked, onChange = () => {}, onClick = () => {} }) => {
  return (
    <div className="flex gap-4 items-center">
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        onClick={onClick}
        className="w-[20px] h-[20px] checked:bg-blueprimary"
      />
      <label className="text-[14px] font-medium cursor-pointer" htmlFor={value}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
