import React from 'react';
import { CloseIcon } from '../Icons/CloseIcon';

function Modal({ isOpen, onClose, children, title, isTitle = true }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-[#33333333]"
      onClick={onClose}
    >
      <div
        className="overflow-y-visible bg-white w-11/12 md:max-w-[540px] mx-auto rounded-md shadow-lg z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {isTitle && (
          <div className="flex items-center justify-between p-[18px] bg-[#E9F6FF] sticky top-0">
            <div className="pl-[18px] modal-title">{title}</div>
            <div onClick={onClose} className="cursor-pointer">
              <CloseIcon />
            </div>
          </div>
        )}
        <div className="py-4 text-left px-6 md:max-h-5/6 max-h-[500px]">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
