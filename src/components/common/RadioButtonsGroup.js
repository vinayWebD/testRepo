import React, { useEffect, useState } from 'react';
import RadioButton from './RadioButton';

const RadioButtonsGroup = ({ options, name, defaultValue, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onSelect(name, event.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          name={name}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default RadioButtonsGroup;
