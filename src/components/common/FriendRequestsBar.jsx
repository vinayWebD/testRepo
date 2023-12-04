import React, { useCallback, useEffect, useState } from 'react';
import UserCard from '../MyNetworkLayout/UserCard';
import SearchInput from './SearchInput';
import { Colors } from '../../constants/colors';
import SearchIcon from '../Icons/SearchIcon';
import { useDispatch } from 'react-redux';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../Toast/ToastNotify';
import { fetchFollowRequestsDispatcher } from '../../redux/dispatchers/myNetworkDispatcher';
import SpinningLoader from './SpinningLoader';
import debounce from '../../utils/debounce';
import { PAGE_SIZE } from '../../constants/constants';
import InfiniteScroll from 'react-infinite-scroller';

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
  const [friendRequestSearchValue, setFriendRequestSearchValue] = useState('');
  const [requests, setRequests] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  let isLoadingAPI = false;

  const searchInputChangeHandler = (value) => {
    setFriendRequestSearchValue(value);
  };

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
    setAllPostsLoaded(false);
    setRequests([]);
    setCurrentPage(1);
  }, [friendRequestSearchValue]);

  // Added debounce in the search to avoid multiple API calls
  const updateSearchVal = useCallback(
    debounce((val) => {
      if (isOpen) {
        setCurrentPage(1);
        setRequests([]);
        setAllPostsLoaded(false);
        getFollowRequests(1, val);
      }
    }, 400),
    [isOpen],
  );

  const getFollowRequests = async (
    page = currentPage || 1,
    searchVal = friendRequestSearchValue,
  ) => {
    if (isLoading || allPostsLoaded || isLoadingAPI) {
      return;
    }

    console.log(currentPage, requests.length);

    setIsLoading(true);
    const { status, data } = await dispatch(
      fetchFollowRequestsDispatcher({
        page: currentPage || page,
        search: searchVal,
      }),
    );

    if (successStatus(status)) {
      if (data?.data?.page === currentPage) {
        setAllPostsLoaded(data?.data?.FollowRequests?.length < PAGE_SIZE.FOLLOW_REQUESTS);
        setCount(data?.data?.count);
        if (currentPage === 1) {
          // For the first time we just need to set the data as is
          setRequests(data?.data?.FollowRequests);
        } else if ((currentPage - 1) * PAGE_SIZE.FOLLOW_REQUESTS === requests.length) {
          setRequests((prevPosts) => [...prevPosts, ...(data?.data?.FollowRequests || [])]);
        }

        setCurrentPage(data?.data?.page + 1);
      }
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    }
    setIsLoading(false);
    isLoadingAPI = false;
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
                <div className="text-[16px] text-[#A1A0A0] ml-2">Search</div>
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
                  className="text-[16px]"
                />
              </div>
            )}
          </div>
        }
        <div className="pl-[25px] pr-[26px] pb-[16px] pt-[0px] max-h-96 overflow-scroll">
          <InfiniteScroll
            threshold={10}
            loadMore={getFollowRequests}
            hasMore={!allPostsLoaded}
            useWindow={false}
            loader={
              <div className="flex w-full justify-center items-center">
                <SpinningLoader width="w-6" height="h-6" color="#0171bc" key={0} />
              </div>
            }
          >
            {requests?.map((item) => (
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
          </InfiniteScroll>
        </div>
        {isLoading && <></>}
        <div className="h-[10px]"></div>
      </div>
    </div>
  );
}

export default FriendRequestsBar;
