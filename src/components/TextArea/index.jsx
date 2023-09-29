import React from 'react';

const TextArea = ({
  width = 'w-full',
  height = 'h-[50px]',
  helperText = false,
  className = '',
  label = '',
  labelFontColor = '#333',
  ...props
}) => {
  return (
    <>
      {label && <label style={{ color: labelFontColor }}>{label}</label>}
      <textarea
        {...props}
        className={`${className} border border-customGray px-[15px] py-[12px] text-area-input resize-none ${width} ${height} focus:border-blue-500 focus:outline-none${
          helperText ? 'haserror' : ''
        }`}
      ></textarea>
      {helperText && <p className={'mt-1 error'}>{helperText}</p>}
    </>
  );
};

export default TextArea;
