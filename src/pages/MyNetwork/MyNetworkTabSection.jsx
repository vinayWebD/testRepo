import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../components/common/Card';
import SearchInput from '../../components/common/SearchInput';
import { Button } from '../../components/common/Button';
import { Colors } from '../../constants/colors';
import CrossIcon from '../../components/Icons/Cross';
import UserCard from '../../components/MyNetworkLayout/UserCard';
import Modal from '../../components/Modal';
import { BUTTON_LABELS, TABS_NAME } from '../../constants/lang';
import InvitePeopleLayout from './InvitePeopleLayout';
import { useDispatch } from 'react-redux';
import {
  fetchMyConnectionsDispatcher,
  fetchMyFollowersDispatcher,
  fetchMyFollowingsDispatcher,
} from '../../redux/dispatchers/myNetworkDispatcher';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import { RESPONSE_FOR_NETWORK } from '../../constants/constants';
import Pagination from '../../components/Pagination';
import debounce from '../../utils/debounce';

const { BTNLBL_INVITE_PEOPLE } = BUTTON_LABELS;
const { FOLLOWERS, FOLLOWING, CONNECTIONS } = TABS_NAME;
const pageSize = 10;

const MyNetworkTabSection = ({ selectedTab }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [searchOnFocus, setSearchOnFocus] = useState(false);
  const [isInvitePeopleModalOpen, setIsInvitePeopleModalOpen] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  let setResponse = RESPONSE_FOR_NETWORK?.[selectedTab];

  useEffect(() => {
    if (selectedTab) {
      setUsersList([]);
      setTotalCount(0);
      setSearchValue('');
      setCurrentPage(1);
      getData();
    }
  }, [selectedTab]);

  useEffect(() => {
    if (currentPage) {
      getData();
    }
  }, [currentPage]);

  useEffect(() => {
    updateSearchVal(searchValue);
  }, [searchValue]);

  // Added debounce in the search to avoid multiple API calls
  const updateSearchVal = useCallback(
    debounce((val) => {
      getData(val, 1);
    }, 400),
    [selectedTab],
  );

  const getData = async (searchVal = '', page = currentPage || 1) => {
    let response;

    switch (selectedTab) {
      case FOLLOWERS:
        response = await dispatch(
          fetchMyFollowersDispatcher({ page, limit: pageSize, search: searchVal }),
        );
        break;
      case FOLLOWING:
        response = await dispatch(
          fetchMyFollowingsDispatcher({ page, limit: pageSize, search: searchVal }),
        );

        break;
      case CONNECTIONS:
        response = await dispatch(
          fetchMyConnectionsDispatcher({ page, limit: pageSize, search: searchVal }),
        );
        break;
    }

    const { status, data } = response;

    if (!successStatus(status)) {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    } else {
      setUsersList(data?.[setResponse?.type] || []);
      setTotalCount(data?.count);
    }
  };

  const searchInputChangeHandler = (value) => {
    setSearchValue(value);
  };

  return (
    <Card classNames="md:mt-0 md:py-3 lg:mt-2 lg:py-2 min-[320px]:mt-0  min-[320px]:rounded-t-none lg:rounded-t-lg min-[320px]:py-5">
      <div className=" w-[100%] ">
        <div className="lg:flex  md:flex md:justify-between lg:justify-between mx-9 items-center">
          <div className="font-medium lg:block md:block min-[320px]:hidden ">
            {selectedTab} ({totalCount})
          </div>
          <div className="flex justify-between items-center sm:gap-4 min-[320px]:gap-0">
            {/* {(searchValue === '' || searchValue === null) && !searchOnFocus ? (
              <div
                className="flex items-center px-[5px]"
                onClick={() => setSearchOnFocus(true)}
                onBlur={() => setSearchOnFocus(false)}
              >
                <div className="flex items-center px-[5px]">
                  <SearchIcon color={'black'} />
                </div>
                <div className="text-[14px] text-[#A1A0A0] ml-2">Search</div>
              </div>
            ) : ( */}
            <div
              className={`${
                // searchOnFocus
                'border-[darkgray] flex border-b-[1px] border-0 min-[320px]:w-full md:w-[197.7px]'
                // : ''
              } `}
            >
              <SearchInput
                iconColor={Colors.grayDark}
                onChange={searchInputChangeHandler}
                value={searchValue}
                isFocusIn={searchOnFocus}
                onBlur={() => setSearchOnFocus(false)}
                onFocus={() => setSearchOnFocus(true)}
                textColor="text-black"
                className={' md:w-[100%] min-[320px]:w-[100px] min-[300px]:w-[0px] py-1'}
              />
              {searchOnFocus && (
                <div
                  className="min-[320px]:block sm:hidden cursor-pointer"
                  onClick={() => setSearchOnFocus(false)}
                >
                  <CrossIcon />
                </div>
              )}
            </div>
            {/* )} */}

            <Button
              label={BTNLBL_INVITE_PEOPLE}
              additionalClassNames={` md:px-[24px] sm:h-[0px] md:h-[50px] md:py-[14px] items-center text-xs min-[320px]:p-4 ${
                searchOnFocus
                  ? 'min-[320px]:hidden  md:px-[24px] md:py-[15px] items-center text-xs sm:block'
                  : ''
              } `}
              showArrowIcon={false}
              onClick={() => setIsInvitePeopleModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <div className="my-5 mx-6 mb-4">
        {usersList?.map((item) => (
          <UserCard
            key={item?.id}
            id={item?.[setResponse.innerType]?.id}
            selectedTab={selectedTab}
            userName={`${item?.[setResponse.innerType]?.firstName} ${
              item?.[setResponse.innerType]?.lastName
            }`}
            location={item?.[setResponse.innerType]?.location}
            career={item?.[setResponse.innerType]?.Careers?.[0]?.title}
            userImage={item?.[setResponse.innerType]?.profilePicture}
            isApproved={item?.isApproved}
            reloadData={getData}
            isRequestedByYou={!!item?.[setResponse.innerType]?.Requested?.length}
          />
        ))}
        <div className="py-4 flex items-center justify-end mt-auto">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scroll(0, 0);
            }}
          />
        </div>
      </div>
      <Modal
        isOpen={isInvitePeopleModalOpen}
        onClose={() => setIsInvitePeopleModalOpen(false)}
        isTitle={true}
        title={BTNLBL_INVITE_PEOPLE}
        childrenClassNames="overflow-y-auto"
        padding="p-0"
        titleClassNames=""
        titleParentClassNames="md:m-3 m-0"
        height=" max-h-[100dvh] md:h-auto"
      >
        <InvitePeopleLayout onCloseHandler={() => setIsInvitePeopleModalOpen(false)} />
      </Modal>
    </Card>
  );
};

export default MyNetworkTabSection;
