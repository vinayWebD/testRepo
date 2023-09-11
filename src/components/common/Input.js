import { useState } from 'react';

function Input({
  name = '',
  type = 'text',
  initialValue = '',
  placeholder = '',
  className = '',
  onChange,
  onBlur,
  onFocus,
  onKeyPress,
  disabled = false,
  label = '',
  isRequired = false,
  labelFontColor = '#ffffff',
  Icon = <></>,
  helperText= false
}) {
  const [value, setValue] = useState(initialValue);

  const handleInputChange = (event) => {
    setValue(event.target.value);
    if (onChange) onChange(event);
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-[2px]">
        <label style={{ color: labelFontColor }}>{label}</label>
        {isRequired ? <span className="text-red relative top-[-4px]">*</span> : ''}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={className}
        onChange={handleInputChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
        disabled={disabled}
        autoComplete={'true'}
      />
      {helperText && <p className={`text-sm mt-1 text-red`}>{helperText}</p>}
    </div>
  );
}

export default Input;
