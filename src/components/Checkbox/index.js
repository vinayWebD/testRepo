import React, { useEffect, useState } from 'react';

function Checkbox({ checked = false, setChecked = () => {} }) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <label className="flex items-center space-x-3">
      <input
        type="checkbox"
        className={`w-5 h-5 border rounded ${
          isChecked ? 'bg-customColor border-customColor' : 'bg-white border-gray-400'
        }`}
        checked={isChecked}
        onChange={() => {
          setChecked(!isChecked);
          setIsChecked(!isChecked);
        }}
      />
    </label>
  );
}

export default Checkbox;
