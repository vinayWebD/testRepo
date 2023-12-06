import React, { useCallback, useEffect, useState } from 'react';
import SearchInput from '../../components/common/SearchInput';
import { Button } from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import OutlinedButton from '../../components/common/OutlinedButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSpecificUsersForPrivacySettingsDispatcher,
  updateSpecificUsersForPrivacySettingsDispatcher,
} from '../../redux/dispatchers/myProfileDispatcher';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError, ToastNotifySuccess } from '../../components/Toast/ToastNotify';
import debounce from '../../utils/debounce';
import InfiniteScroll from 'react-infinite-scroller';
import { PAGE_SIZE } from '../../constants/constants';
import PostSkeleton from '../../components/common/PostSkeleton';

const SelectUsers = ({ valueKey, popupCloseHandler = () => {} }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.user) || {};
  const [searchValue, setSearchValue] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  let isLoadingAPI = false;

  useEffect(() => {
    updateSearchVal(searchValue);
  }, [searchValue]);

  // Added debounce in the search to avoid multiple API calls
  const updateSearchVal = useCallback(
    debounce((val) => {
      setUsers([]);
      setCurrentPage(1);
      setAllPostsLoaded(false);
      fetchUserList(1, val);
    }, 400),
    [valueKey],
  );

  const onSelectHandler = (id) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((userId) => userId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const fetchUserList = async (page = currentPage, search = searchValue || '') => {
    if (isLoading || allPostsLoaded || isLoadingAPI) return;

    isLoadingAPI = true;
    setIsLoading(true);

    const { status, data } = await dispatch(
      getSpecificUsersForPrivacySettingsDispatcher({
        search: search,
        type: valueKey,
        page: page,
      }),
    );

    if (successStatus(status)) {
      // Append new users to the existing list
      if (page === 1) {
        setUsers(data?.data?.Networks || []);
      } else {
        setUsers((prevUsers) => [...prevUsers, ...(data?.data?.Networks || [])]);
      }

      // Update the pagination and loading state
      setCurrentPage((prevPage) => prevPage + 1);
      setAllPostsLoaded(data?.data?.Networks?.length < PAGE_SIZE.PRIVACY_SETTING_SELECT_USERS);
    } else {
      const errorMsg = getErrorMessage(data);
      if (errorMsg) {
        ToastNotifyError(errorMsg);
      }
    }
    setIsLoading(false);
  };

  const onAddHandler = async () => {
    const { status, data } = await dispatch(
      updateSpecificUsersForPrivacySettingsDispatcher({
        specificUserType: valueKey,
        specificUsers: selectedUsers,
      }),
    );

    if (!successStatus(status)) {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    } else {
      ToastNotifySuccess('Specific users updated successfully!');
      popupCloseHandler();
    }
  };

  return (
    <div className="w-full">
      <div className="px-[18px] modal-internal min-h-[75dvh] max-h-[75dvh] md:h-auto md:min-h-[70vh] md:max-h-[70vh] overflow-y-auto">
        <SearchInput
          iconColor={'#A1A0A0'}
          onChange={(value) => setSearchValue(value)}
          value={searchValue}
          textColor="text-black"
          className="text-[16px] w-full"
          isAutoFocus={false}
          bottomBorderColorClass="border-[#A1A0A0]"
        />

        <div className="py-3 flex gap-3 flex-col">
          <InfiniteScroll
            threshold={-24.5}
            loadMore={() => fetchUserList(currentPage)}
            hasMore={!allPostsLoaded}
            useWindow={false}
            loader={
              <div className="flex w-full h-full justify-center items-center" key={0}>
                <PostSkeleton />
              </div>
            }
          >
            {users?.map((user, _i) => {
              return (
                <div
                  key={`${user?.FollowingUserId}_${_i}_${user?.id}`}
                  className="flex justify-between items-center border-b border-whitelight py-3"
                >
                  <div className="w-[70%] flex gap-2 items-center">
                    <Avatar
                      image={user?.User?.profilePicture}
                      name={`${user?.User?.firstName} ${user?.User?.lastName}`}
                      classNames="w-[40px] h-[40px]"
                    />
                    <div className="overflow-ellipsis text-[16px] font-semibold">{`${user?.User?.firstName} ${user?.User?.lastName}`}</div>
                  </div>

                  {selectedUsers?.includes(
                    +(user?.FollowingUserId !== userData?.id
                      ? user?.FollowingUserId
                      : user?.UserId),
                  ) ? (
                    <Button
                      label={'Selected'}
                      onClick={() =>
                        onSelectHandler(
                          +(user?.FollowingUserId !== userData?.id
                            ? user?.FollowingUserId
                            : user?.UserId),
                        )
                      }
                      showArrowIcon={false}
                      additionalClassNames="w-[126px] text-[14px]"
                    />
                  ) : (
                    <OutlinedButton
                      label={'Select'}
                      additionalClassNames="text-[14px] w-[126px] !text-center justify-center"
                      isIcon={false}
                      onClick={() =>
                        onSelectHandler(
                          +(user?.FollowingUserId !== userData?.id
                            ? user?.FollowingUserId
                            : user?.UserId),
                        )
                      }
                    />
                  )}
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>

      <div className="flex justify-end px-[18px] border-greymedium border-t pt-5">
        <Button
          label={'Add'}
          isDisabled={!selectedUsers?.length}
          onClick={() => onAddHandler()}
          showArrowIcon={false}
        />
      </div>
    </div>
  );
};

export default SelectUsers;
