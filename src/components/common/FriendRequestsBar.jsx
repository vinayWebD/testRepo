import React, { useEffect, useState } from 'react';
// import { CloseIcon } from '../Icons/CloseIcon';
import UserCard from '../MyNetworkLayout/UserCard';
import SearchInput from './SearchInput';
import { Colors } from '../../constants/colors';

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

function FriendRequestsBar({
  isOpen,
  onClose,
  title,
  width = '',
  height = 'h-auto',
  titleClassNames = 'pl-[18px]',
  titleParentClassNames = 'm-3',
}) {
  const [focusOnSearch, setFocusOnSearch] = useState(false);
  const [friendRequestSearch, setFriendRequestSearch] = useState('');

  const searchInputChangeHandler = (value) => {
    setFriendRequestSearch(value);
  };

  useEffect(() => {
    if (isOpen) {
      incrementModalCounter();
    }

    // Set overflow only once when first modal opens or when the last modal closes.
    if (getModalCounter() === 1 && isOpen) {
      document.body.style.overflow = 'hidden';
    } else if (getModalCounter() === 0 && !isOpen) {
      document.body.style.overflow = 'hidden';
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
        className={`bg-white min-[320px]:w-11/12 overflow-x-hidden lg:w-[65%] min-[320px]:ml-0 lg:ml-[22rem] ${width} ${height} rounded-md shadow-lg z-50  ${titleParentClassNames}`}
        onClick={(e) => e.stopPropagation()}
      >
        {
          <div className="flex items-start items-center justify-between p-[18px] bg-white  sticky top-0 z-10">
            <div className={`modal-title ${titleClassNames} ${focusOnSearch ? 'hidden' : ''}`}>
              {title}
            </div>
            <div className="w-[85px]">
              <SearchInput
                color={Colors.grayDark}
                onChange={searchInputChangeHandler}
                value={friendRequestSearch}
                isFocusIn={focusOnSearch}
                textColor="text-black"
                onBlur={() => setFocusOnSearch(false)}
                onFocus={() => setFocusOnSearch(true)}
                className=""
              />
            </div>
          </div>
        }
        <div className="pl-[25px] pr-[26px] pb-[16px] pt-[0px] max-h-96">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
            <UserCard key={item} isFriendRequest={true} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FriendRequestsBar;
