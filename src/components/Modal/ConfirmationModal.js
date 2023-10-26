import React, { useEffect } from 'react';
import { CloseIcon } from '../Icons/CloseIcon';
import OutlinedButton from '../common/OutlinedButton';
import { Button } from '../common/Button';

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

function ConfirmationModal({
  isOpen,
  onClose,
  children,
  title,
  isTitle = true,
  width = 'max-w-[95vw] md:max-w-[470px]',
  height = 'h-auto',
  padding = 'px-6',
  childrenClassNames = 'md:max-h-5/6 max-h-[500px]',
  titleClassNames = 'pl-[18px]',
  titleParentClassNames = 'm-3',
  primaryButtonTitle = 'Save',
  secondaryButtonTitle = 'Cancel',
  primaryButtonAction = () => {},
  secondaryButtonAction = () => {},
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
      className="cust-modal-fixed fixed overflow-y-scroll md:overflow-y-auto top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-[#0000005f] backdrop-blur-[1.5px]"
      onClick={onClose}
    >
      <div
        className={`bg-white md:w-11/12 ${width} ${height} rounded-md shadow-lg z-50 overflow-y-auto ${titleParentClassNames}`}
        onClick={(e) => e.stopPropagation()}
      >
        {isTitle && (
          <div className="flex items-center justify-between p-[18px] bg-[#E9F6FF] sticky top-0 z-10">
            <div className={`modal-title text-center w-full ${titleClassNames}`}>{title}</div>
            <div onClick={onClose} className="cursor-pointer">
              <CloseIcon />
            </div>
          </div>
        )}

        <div className="pt-6 pb-5">
          <div
            className={`pb-6 overflow-y-auto text-greydark text-center ${padding} ${childrenClassNames}`}
          >
            {children}
          </div>

          <div className="flex justify-around items-center">
            <OutlinedButton
              label={secondaryButtonTitle}
              onClick={secondaryButtonAction}
              isIcon={false}
              additionalClassNames="!h-[40px] !text16 !w-[33%] !text-center justify-center"
            />
            <Button
              label={primaryButtonTitle}
              onClick={primaryButtonAction}
              showArrowIcon={false}
              additionalClassNames="!h-[40px] !w-[33%] !px-[30px] !py-2 !text16"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
