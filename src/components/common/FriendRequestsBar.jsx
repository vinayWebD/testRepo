import React, { useCallback, useEffect, useRef, useState } from 'react';
import UserCard from '../MyNetworkLayout/UserCard';
import SearchInput from './SearchInput';
import { Colors } from '../../constants/colors';
import SearchIcon from '../Icons/SearchIcon';
import { useDispatch } from 'react-redux';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../Toast/ToastNotify';
import { fetchFollowRequestsDispatcher } from '../../redux/dispatchers/myNetworkDispatcher';
// import debounce from '../../utils/debounce';
import SpinningLoader from './SpinningLoader';
import debounce from '../../utils/debounce';
import { PAGE_SIZE } from '../../constants/constants';

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
  const loaderRef = useRef(null);
  const [focusOnSearch, setFocusOnSearch] = useState(false);
  const [friendRequestSearchValue, setFriendRequestSearchValue] = useState('');
  const [requests, setRequests] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const searchInputChangeHandler = (value) => {
    setFriendRequestSearchValue(value);
  };

  // This is for the infinite scroll pagination
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [isOpen]);

  const handleObserver = useCallback(
    (entities) => {
      const target = entities[0];
      if (target.isIntersecting && !allPostsLoaded && !isLoading) {
        setIsLoading(true);
        getFollowRequests(friendRequestSearchValue, currentPage).then(() => setIsLoading(false));
      }
    },
    [currentPage, allPostsLoaded, isLoading, friendRequestSearchValue, isOpen],
  );

  useEffect(() => {
    if (isOpen) {
      setAllPostsLoaded(false);
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

  useEffect(() => {
    updateSearchVal(friendRequestSearchValue);
  }, [friendRequestSearchValue]);

  // Added debounce in the search to avoid multiple API calls
  const updateSearchVal = useCallback(
    debounce((val) => {
      getFollowRequests(val, 0);
    }, 400),
    [],
  );

  const getFollowRequests = async (searchVal = '', page = currentPage || 0) => {
    if (allPostsLoaded) {
      return;
    }

    const { status, data } = await dispatch(
      fetchFollowRequestsDispatcher({
        page: page + 1,
        search: searchVal,
      }),
    );

    if (successStatus(status)) {
      setAllPostsLoaded(data?.data?.FollowRequests?.length < PAGE_SIZE.FOLLOW_REQUESTS);
      setCount(data?.data?.count);

      if (page === 0) {
        // For the first time we just need to set the data as is
        setRequests(data?.data?.FollowRequests);
      } else if (currentPage * PAGE_SIZE.FOLLOW_REQUESTS === requests.length) {
        setRequests((prevPosts) => [...prevPosts, ...(data?.data?.FollowRequests || [])]);
      }

      setCurrentPage(data?.data?.page);
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
          <div className="flex items-center justify-between bg-white  sticky top-0 z-10">
            <div
              className={`text-[20px] font-semibold text-blueprimary ${titleClassNames} ${
                focusOnSearch ? 'hidden' : ''
              } pl-[25px] py-5`}
            >
              {title} ({count})
            </div>
            {(friendRequestSearchValue === '' || friendRequestSearchValue === null) &&
            !focusOnSearch ? (
              <div
                className="flex items-center px-[5px] pr-[26px]"
                onClick={() => setFocusOnSearch(true)}
                onBlur={() => setFocusOnSearch(false)}
              >
                <div className="flex items-center px-[5px]">
                  <SearchIcon color={'black'} />
                </div>
                <div className="text-[14px] text-[#A1A0A0] ml-2">Search</div>
              </div>
            ) : (
              <div className="pl-[25px] pr-[26px]">
                <SearchInput
                  iconColor={Colors.grayDark}
                  onChange={searchInputChangeHandler}
                  value={friendRequestSearchValue}
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
              id={item?.id}
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

          {!allPostsLoaded && (
            <div className="flex justify-center items-center" ref={loaderRef}>
              <SpinningLoader width="w-6" height="h-6" color="#0171bc" />
            </div>
          )}
        </div>
        <div className="h-[10px]"></div>
      </div>
    </div>
  );
}

export default FriendRequestsBar;
