import React, { useState, useRef } from 'react';
import DownCaret from '../Icons/DownCaret';

const Dropdown = ({
  options = [{}],
  IconComponent = () => <DownCaret />,
  parentClassName = '',
  optionsClassName = '',
  optionItemClassName = '',
  closeAfterClick = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${parentClassName}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <IconComponent />
      </button>

      {isOpen && (
        <div
          className={`origin-top-right absolute right-0 mt-2 w-48 rounded-sm dropdown bg-white z-10 ${optionsClassName}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {options.map(({ name, action = () => {} }, index) => (
              <button
                key={index}
                className={`border-b-[1px] border-greymedium border-opacity-50 last:border-0 text-left block px-6 py-3 text-sm font-medium text-greydark hover:bg-gray-100 hover:text-gray-900 w-full ${optionItemClassName}`}
                role="menuitem"
                tabIndex="-1"
                onClick={() => {
                  action();
                  if (closeAfterClick) {
                    setIsOpen(false);
                  }
                }}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
