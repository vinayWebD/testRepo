import React, { useCallback, useEffect, useState } from 'react';
import UserCard from '../MyNetworkLayout/UserCard';
import SearchInput from './SearchInput';
import { Colors } from '../../constants/colors';
import SearchIcon from '../Icons/SearchIcon';
import { useDispatch } from 'react-redux';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../Toast/ToastNotify';
import { fetchFollowRequestsDispatcher } from '../../redux/dispatchers/myNetworkDispatcher';
import debounce from '../../utils/debounce';
import { PAGE_SIZE } from '../../constants/constants';
import InfiniteScroll from 'react-infinite-scroller';
import { useNavigate } from 'react-router-dom';
import { BackArrowIcon } from '../Icons/BackArrowIcon';
import PostSkeleton from './PostSkeleton';

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
  const navigate = useNavigate();
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
    }, 500),
    [isOpen],
  );

  const getFollowRequests = async (
    page = currentPage || 1,
    searchVal = friendRequestSearchValue,
  ) => {
    if (isLoading || allPostsLoaded || isLoadingAPI) {
      return;
    }

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
      className="cust-modal-fixed items-start fixed overflow-hidden top-0 left-0 w-full h-full mt-14 flex justify-center z-50 bg-[#0000005f] backdrop-blur-[1.5px]"
      onClick={onClose}
    >
      <div
        style={{ marginTop: '0px' }}
        className={`bg-white overflow-x-hidden w-full md:w-[65%] min-[320px]:ml-0 lg:ml-[22rem] pb-[12px] ${width} ${height} rounded-md shadow-lg z-50  ${titleParentClassNames}`}
        onClick={(e) => e.stopPropagation()}
      >
        {
          <div className="flex items-center justify-between bg-white  sticky top-0 z-10">
            <div
              className={`flex gap-1 justify-center items-center text-[18px] md:text-[20px] font-semibold text-blueprimary ${titleClassNames} ${
                focusOnSearch ? 'hidden' : ''
              } pl-[25px] py-5`}
            >
              <div
                className="block md:hidden"
                onClick={() => {
                  navigate(-1);
                  onClose();
                }}
              >
                <BackArrowIcon color="#0071BC" />
              </div>
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
              <div
                className={`pl-[10px] md:pl-[25px] pr-[26px] ${
                  focusOnSearch ? '!pl-[25px] w-full' : ''
                }`}
              >
                <SearchInput
                  iconColor={Colors.grayDark}
                  onChange={searchInputChangeHandler}
                  value={friendRequestSearchValue}
                  isFocusIn={focusOnSearch}
                  textColor="text-black"
                  onBlur={() => setFocusOnSearch(false)}
                  onFocus={() => setFocusOnSearch(true)}
                  className={`text-[16px] h-[66px] ${
                    !focusOnSearch
                      ? 'max-w-[40px] p-0 md:max-w-[120px] text-ellipsis overflow-hidden'
                      : 'w-full'
                  }`}
                  isAutoFocus={true}
                  bottomBorderColorClass={focusOnSearch ? 'border-[#A1A0A0]' : '!border-0'}
                />
              </div>
            )}
          </div>
        }
        <div className="pl-[25px] pr-[26px] pb-[16px] pt-[0px] min-h-[85%] md:min-h-[90%] max-h-[85%] md:max-h-[90%] overflow-scroll mt-2">
          <InfiniteScroll
            threshold={10}
            loadMore={getFollowRequests}
            hasMore={!allPostsLoaded}
            useWindow={false}
            loader={
              <div className="flex w-full h-full justify-center items-center">
                <PostSkeleton showMedia={false} />
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
      </div>
    </div>
  );
}

export default FriendRequestsBar;
