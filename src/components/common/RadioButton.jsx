import React, { useState } from 'react';

const RadioButton = ({ label, name, value }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={selectedValue === value}
        onChange={handleChange}
        className="w-[20px] h-[20px] checked:bg-blueprimary"
      />
      <label
        className="text-[14px] font-normal"
        htmlFor={value}
        onClick={() => setSelectedValue(value)}
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
