import React from 'react';
import MailIconV2 from '../Icons/MailIconV2';

const EmailInputWithIcon = ({
  label,
  placeholder,
  value = '',
  className = '',
  handleInputChange = () => {},
  isDisabled = false,
  isRequired = false,
  error = '',
}) => {
  return (
    <div className="flex flex-col relative w-full">
      <div className="flex gap-[2px] mb-1">
        <label>{label}</label>
        {isRequired ? <span className="text-red relative top-[-4px]">*</span> : ''}
      </div>
      <div className="flex w-full">
        <div className="px-4 mr-[-1px] border-customGray border flex items-center bg-gray rounded-l-[8px]">
          <MailIconV2 />
        </div>
        <input
          type={'email'}
          value={value}
          placeholder={placeholder}
          className={`${className} border-customGray border border-l-0 rounded-l-none w-full`}
          onChange={(e) => handleInputChange(e?.target?.value)}
          disabled={isDisabled}
        />
      </div>
      {error && <p className={'mt-1 error'}>{error}</p>}
    </div>
  );
};

export default EmailInputWithIcon;
