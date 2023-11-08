import React, { useEffect } from 'react';
import SuggestedUser from './SuggestedUser';

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
  titleParentClassNames = '',
}) {
  useEffect(() => {
    if (isOpen) {
      incrementModalCounter();
    }

    // Set overflow only once when first modal opens or when the last modal closes.
    if (getModalCounter() === 1 && isOpen) {
      document.body.style.overflow = 'hidden';
      document
        ?.querySelector('.add-blur-after-search')
        ?.classList?.add('blur-[1.5px]', 'pointer-events-none');
    } else if (getModalCounter() === 0 && !isOpen) {
      document.body.style.overflow = 'scroll';
      document
        ?.querySelector('.add-blur-after-search')
        ?.classList?.remove('blur-[1.5px]', 'pointer-events-none');
    }

    return () => {
      if (isOpen) {
        decrementModalCounter();
        if (getModalCounter() === 0) {
          document
            ?.querySelector('.add-blur-after-search')
            ?.classList?.remove('blur-[1.5px]', 'pointer-events-none');
          document.body.style.overflow = 'auto';
        }
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="bg-white items-start flex-wrap absolute top-[27px] left-0 w-full h-fit flex justify-center rounded-md z-50 shadow-lg"
      onClick={onClose}
    >
      <div
        className={`overflow-x-hidden overflow-y-auto max-h-[70vh] lg:max-h-[60vh] pt-3 ${width} ${height} ${titleParentClassNames}`}
      >
        <SuggestedUser
          userName="Stev Jobs"
          userBio=" UiUx Designer | Media Composer | Founder of Lumina"
        />
        <SuggestedUser
          userName="Stev Jobs"
          userBio=" UiUx Designer | Media Composer | Founder of Lumina"
        />
        <SuggestedUser
          userName="Stev Jobs"
          userBio=" UiUx Designer | Media Composer | Founder of Lumina"
        />
        <SuggestedUser
          userName="Stev Jobs"
          userBio=" UiUx Designer | Media Composer | Founder of Lumina"
        />
        <SuggestedUser
          userName="Stev Jobs"
          userBio=" UiUx Designer | Media Composer | Founder of Lumina"
        />
        <SuggestedUser
          userName="Stev Jobs"
          userBio=" UiUx Designer | Media Composer | Founder of Lumina"
        />
        <SuggestedUser
          userName="Stev Jobs"
          userBio=" UiUx Designer | Media Composer | Founder of Lumina"
        />
        <SuggestedUser
          userName="Stev Jobs"
          userBio=" UiUx Designer | Media Composer | Founder of Lumina"
        />
        <SuggestedUser
          userName="Stev Jobs"
          userBio=" UiUx Designer | Media Composer | Founder of Lumina"
        />
      </div>
      <div className="border-t w-full font-medium border-[#DFDFDF] p-4 flex justify-center text-blueprimary cursor-pointer">
        See All
      </div>
    </div>
  );
}

export default SuggestedSearch;
