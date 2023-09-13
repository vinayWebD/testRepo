import { useState } from 'react';
import { PasswordClosedIcon, PasswordOpenedIcon } from '../Icons/PasswordToggleIcon';

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
  helperText = false, // This indicates if there is an error
  maxLength = 100,
}) {
  const [value, setValue] = useState(initialValue);
  const [showPassword, setShowPassword] = useState(false);
  const typeOfInput = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  const handleInputChange = (event) => {
    setValue(event.target.value);
    if (onChange) onChange(event);
  };

  const showPasswordToggleIcon = () => {
    if (type === 'password') {
      return (
        <div
          className={`px-3 ml-[-1px] flex items-center cursor-pointer bg-white rounded-r-[8px] ${
            helperText ? 'border-solid border-[1px] border-red border-l-0' : ''
          }`}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <PasswordOpenedIcon /> : <PasswordClosedIcon />}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col relative">
      <div className="flex gap-[2px]">
        <label style={{ color: labelFontColor }}>{label}</label>
        {isRequired ? <span className="text-red relative top-[-4px]">*</span> : ''}
      </div>
      <div className="flex">
        <input
          type={typeOfInput}
          name={name}
          value={value}
          placeholder={placeholder}
          className={`${className} ${type === 'password' ? 'border-r-0 rounded-r-none' : ''} ${
            helperText ? 'haserror' : ''
          }`}
          onChange={handleInputChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyPress={onKeyPress}
          disabled={disabled}
          autoComplete={'true'}
          maxLength={maxLength}
        />
        {showPasswordToggleIcon()}
      </div>
      {helperText && <p className={'mt-1 error'}>{helperText}</p>}
    </div>
  );
}

export default Input;
