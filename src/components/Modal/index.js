import React, { useEffect } from 'react';
import { CloseIcon } from '../Icons/CloseIcon';

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

function Modal({
  isOpen,
  onClose,
  children,
  title,
  isTitle = true,
  width = 'max-w-[540px]',
  padding = 'px-6',
  childrenClassNames = 'md:max-h-5/6 max-h-[500px]',
  titleClassNames = 'pl-[18px]',
}) {
  useEffect(() => {
    if (isOpen) {
      incrementModalCounter();
    }

    // Set overflow only once when first modal opens or when the last modal closes.
    if (getModalCounter() === 1 && isOpen) {
      document.body.style.overflow = 'hidden';
    } else if (getModalCounter() === 0 && !isOpen) {
      document.body.style.overflow = 'auto';
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
      className="cust-modal-fixed fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-[#0000005f] backdrop-blur-[1.5px]"
      onClick={onClose}
    >
      <div
        className={`bg-white md:w-11/12 ${width} rounded-md shadow-lg z-50 overflow-y-auto m-3`}
        onClick={(e) => e.stopPropagation()}
      >
        {isTitle && (
          <div className="flex items-center justify-between p-[18px] bg-[#E9F6FF] sticky top-0 z-10">
            <div className={`modal-title ${titleClassNames}`}>{title}</div>
            <div onClick={onClose} className="cursor-pointer">
              <CloseIcon />
            </div>
          </div>
        )}
        <div className={`py-4 overflow-y-auto text-left ${padding} ${childrenClassNames}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
