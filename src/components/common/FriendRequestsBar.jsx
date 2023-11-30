import React, { useEffect, useState } from 'react';
// import { CloseIcon } from '../Icons/CloseIcon';
import UserCard from '../MyNetworkLayout/UserCard';
import SearchInput from './SearchInput';
import { Colors } from '../../constants/colors';
import SearchIcon from '../Icons/SearchIcon';
import { useDispatch } from 'react-redux';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../Toast/ToastNotify';
import { fetchFollowRequestsDispatcher } from '../../redux/dispatchers/myNetworkDispatcher';

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
  const [requests, setRequests] = useState([]);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const searchInputChangeHandler = (value) => {
    setFriendRequestSearch(value);
  };

  useEffect(() => {
    if (isOpen) {
      getFollowRequests();
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

  const getFollowRequests = async () => {
    const { status, data } = await dispatch(fetchFollowRequestsDispatcher({}));

    if (successStatus(status)) {
      setRequests(data?.data?.FollowRequests || []);
      setCount(data?.data?.count);
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="cust-modal-fixed items-start fixed top-0 left-0 w-full h-full mt-14 flex justify-center z-50 bg-[#0000005f] backdrop-blur-[1.5px]"
      onClick={onClose}
    >
      <div
        style={{ marginTop: '0px' }}
        className={`bg-white min-[320px]:w-11/12 overflow-x-hidden lg:w-[65%] min-[320px]:ml-0 lg:ml-[22rem] pb-[12px] ${width} ${height} rounded-md shadow-lg z-50  ${titleParentClassNames}`}
        onClick={(e) => e.stopPropagation()}
      >
        {
          <div className="flex items-center justify-between p-[12px] bg-white  sticky top-0 z-10">
            <div className={`modal-title ${titleClassNames} ${focusOnSearch ? 'hidden' : ''}`}>
              {title} ({count})
            </div>
            {(friendRequestSearch === '' || friendRequestSearch === null) && !focusOnSearch ? (
              <div
                className="flex items-center px-[5px]"
                onClick={() => setFocusOnSearch(true)}
                onBlur={() => setFocusOnSearch(false)}
              >
                <div className="flex items-center px-[5px]">
                  <SearchIcon color={'black'} />
                </div>
                <div className="text-[14px] text-[#A1A0A0] ml-2">Search</div>
              </div>
            ) : (
              <div className="">
                <SearchInput
                  iconColor={Colors.grayDark}
                  onChange={searchInputChangeHandler}
                  value={friendRequestSearch}
                  isFocusIn={focusOnSearch}
                  textColor="text-black"
                  onBlur={() => setFocusOnSearch(false)}
                  onFocus={() => setFocusOnSearch(true)}
                  className=""
                />
              </div>
            )}
          </div>
        }
        <div className="pl-[25px] pr-[26px] pb-[16px] pt-[0px] max-h-96 overflow-scroll">
          {requests.map((item) => (
            <UserCard
              key={item?.id}
              id={item?.User?.id}
              selectedTab={'selectedTab'}
              userName={`${item?.User?.firstName} ${item?.User?.lastName}`}
              location={item?.User?.location}
              career={item?.User?.Careers?.[0]?.title}
              userImage={item?.User?.profilePicture}
              isApproved={item?.isApproved}
              reloadData={getFollowRequests}
              isRequestedByYou={!!item?.User?.Requested?.length}
              isFriendRequest={true}
            />
          ))}
        </div>
        <div className="h-[10px]"></div>
      </div>
    </div>
  );
}

export default FriendRequestsBar;
