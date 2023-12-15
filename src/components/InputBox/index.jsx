import { useEffect, useState } from 'react';

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
  parentClassName = '',
  type = 'text',
  ...props
}) {
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    setValue(props?.value || '');
  }, [props?.value]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleInputChange = (event) => {
    setValue(event.target.value);
    if (onChange) onChange(event);
  };

  return (
    <div className={parentClassName}>
      <div className="flex gap-[2px]">
        <label style={{ color: labelFontColor }}>{label}</label>
        {isRequired ? <span className="text-red relative top-[-4px]">*</span> : ''}
      </div>
      <input
        {...props}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`${className} ${
          helperText ? 'haserror' : ''
        } border border-large border-customGray w-full ${disabled ? 'cursor-not-allowed' : ''}
        ${type === 'date' && !value ? 'text-greylight font-thin' : ''}`}
        onChange={handleInputChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
        disabled={disabled}
        autoComplete={'true'}
        maxLength={maxLength}
      />
      <p className={'mt-1 error min-h-[18px]'}>{helperText}</p>
    </div>
  );
}

export default InputBox;
