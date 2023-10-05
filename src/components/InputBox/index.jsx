import { useState } from 'react';

function InputBox({
  name = '',
  initialValue = '',
  placeholder = '',
  className = '',
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  onKeyPress = () => {},
  disabled = false,
  label = '',
  isRequired = false,
  labelFontColor = '#333',
  helperText = false,
  maxLength = 100,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  const handleInputChange = (event) => {
    setValue(event.target.value);
    if (onChange) onChange(event);
  };

  return (
    <div>
      <div className="flex gap-[2px]">
        <label style={{ color: labelFontColor }}>{label}</label>
        {isRequired ? <span className="relative top-[-4px]">*</span> : ''}
      </div>
      <input
        {...props}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`${className} ${
          helperText ? 'haserror' : ''
        } border border-large border-customGray w-full`}
        onChange={handleInputChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
        disabled={disabled}
        autoComplete={'true'}
        maxLength={maxLength}
      />
      {helperText && <p className={'mt-1 error'}>{helperText}</p>}
    </div>
  );
}

export default InputBox;
