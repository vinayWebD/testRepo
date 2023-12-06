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
import PostSkeleton from '../../components/common/PostSkeleton';
import InfiniteScroll from 'react-infinite-scroller';
import { PAGE_SIZE } from '../../constants/constants';

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
      fetchUserList(1, val);
    }, 400),
    [valueKey],
  );

  useEffect(() => {
    if (valueKey) {
      fetchUserList();
    }
  }, [valueKey]);

  const onSelectHandler = (id) => {
    if (selectedUsers?.includes(id)) {
      let filteredUsers = selectedUsers?.filter((userId) => userId !== id);
      setSelectedUsers([...new Set(filteredUsers)]);
    } else {
      setSelectedUsers((prev) => [...prev, id]);
    }
  };

  const fetchUserList = async (page = 1, search = searchValue || '') => {
    if (isLoading || allPostsLoaded || isLoadingAPI) {
      return;
    }
    isLoadingAPI = true;

    setIsLoading(true);

    const { status, data } = await dispatch(
      getSpecificUsersForPrivacySettingsDispatcher({
        search: search,
        type: valueKey,
        page,
      }),
    );

    if (!successStatus(status)) {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    } else {
      setUsers(data?.data?.Networks || []);
      setSelectedUsers((prev) => [...prev, data?.data?.SpecificUsers?.specificUsers || []]);

      if (data?.data?.page === currentPage) {
        setAllPostsLoaded(
          (data?.data?.Networks || [])?.length < PAGE_SIZE.PRIVACY_SETTING_SELECT_USERS,
        );
        if (currentPage === 1) {
          // For the first time we just need to set the data as is
          setUsers(data?.data?.Networks || []);
        } else if ((currentPage - 1) * PAGE_SIZE.FOLLOW_REQUESTS === users.length) {
          setUsers((prevPosts) => [...prevPosts, ...(data?.data?.Networks || [])]);
        }

        setCurrentPage(data?.data?.page + 1);
      }
    }
    setIsLoading(false);
    isLoadingAPI = false;
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
      <div className="px-[18px] modal-internal h-[75dvh] max-h-[75dvh] md:h-auto md:max-h-[70vh] overflow-y-auto">
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
            threshold={5}
            loadMore={fetchUserList}
            hasMore={!allPostsLoaded}
            useWindow={false}
            loader={
              <div className="flex w-full h-full justify-center items-center">
                <PostSkeleton showMedia={false} />
              </div>
            }
          >
            {users?.map((user, _i) => {
              return (
                <div
                  key={_i}
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
