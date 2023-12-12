import React from 'react';

const TextArea = ({
  width = 'w-full',
  height = 'h-[50px]',
  helperText = false,
  className = '',
  label = '',
  handleChange = () => {},
  labelFontColor = '#333',
  ...props
}) => {
  return (
    <>
      {label && <label style={{ color: labelFontColor }}>{label}</label>}
      <textarea
        onChange={(e) => handleChange(e.target.value)}
        {...props}
        className={`${className} outline-none border border-customGray rounded-[8px] px-[15px] py-[12px] text-area-input resize-none ${width} ${height} focus:border-blue-500 focus:outline-none${
          helperText ? 'haserror' : ''
        }`}
      />
      {helperText && <p className={'mt-1 error'}>{helperText}</p>}
    </>
  );
};

export default TextArea;
