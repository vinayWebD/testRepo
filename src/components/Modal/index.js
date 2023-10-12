import React from 'react';
import { CloseIcon } from '../Icons/CloseIcon';

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
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-[#33333333]"
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
