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
  helperText = false,
  maxLength = 100,
}) {
  const [value, setValue] = useState(initialValue);
  const [showPassword, setShowPassword] = useState(false);
  const typeOfInput = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  const handleInputChange = (event) => {
    setValue(event.target.value);
    if (onChange) onChange(event);
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
          className={`${className} ${type === 'password' ? 'rounded-r-none' : ''}`}
          onChange={handleInputChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyPress={onKeyPress}
          disabled={disabled}
          autoComplete={'true'}
          maxLength={maxLength}
        />
        {type === 'password' ? (
          <div
            className="pr-3 flex items-center cursor-pointer bg-white rounded-r-[8px]"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {
              showPassword ?
              <PasswordOpenedIcon />
              :
              <PasswordClosedIcon />
            }
            
          </div>
        ) : (
          ''
        )}
      </div>
      {helperText && <p className={'text-sm mt-1 text-red'}>{helperText}</p>}
    </div>
  );
}

export default Input;
