import React, { useEffect } from 'react';
// import { CloseIcon } from '../Icons/CloseIcon';

// globalModalCounter.js
let globalModalCounter = 0;

export const incrementModalCounter = () => {
  globalModalCounter++;
};

export const decrementModalCounter = () => {
  if (globalModalCounter > 0) {
    globalModalCounter--;
  }
};

export const getModalCounter = () => {
  return globalModalCounter;
};

function SuggestedSearch({
  isOpen,
  onClose,
  width = '',
  height = 'h-auto',
  children,
  // titleClassNames = 'pl-[18px]',
  titleParentClassNames = 'm-3',
}) {
  useEffect(() => {
    if (isOpen) {
      incrementModalCounter();
    }

    // Set overflow only once when first modal opens or when the last modal closes.
    if (getModalCounter() === 1 && isOpen) {
      document.body.style.overflow = 'hidden';
    } else if (getModalCounter() === 0 && !isOpen) {
      document.body.style.overflow = 'scroll';
    }

    return () => {
      if (isOpen) {
        decrementModalCounter();
        if (getModalCounter() === 0) {
          document.body.style.overflow = 'auto';
        }
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="cust-modal-fixed items-start fixed  top-0 left-0 w-full h-full mt-14 flex justify-center z-50 bg-[#0000005f] backdrop-blur-[1.5px]"
      onClick={onClose}
    >
      <div
        style={{ marginTop: '0px' }}
        className={`bg-white min-[320px]:w-11/12 pt-4 overflow-x-hidden lg:w-[35%] min-[320px]:ml-0 lg:ml-[22rem] ${width} ${height} rounded-md shadow-lg z-50  ${titleParentClassNames}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <div className="pl-[25px] pr-[26px] pb-[16px] pt-[0px] max-h-96 flex justify-center text-blueprimary cursor-pointer">
          See All
        </div>
      </div>
    </div>
  );
}

export default SuggestedSearch;
