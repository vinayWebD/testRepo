import React from 'react';
import { MailIcon } from '../Icons/MailIcon';

const EmailInput = ({ label, placeholder }) => {
  return (
    <>
      <label
        htmlFor="email-address-icon"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center h-[50px] w-[50px] mt-[-4px] pointer-events-none ">
          <MailIcon />
        </div>
        <input
          type="text"
          id="email-address-icon"
          className="bg-gray-50 border border-[lightGray] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default EmailInput;
