import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../components/common/Card';
import SearchInput from '../../components/common/SearchInput';
import { Colors } from '../../constants/colors';
import CrossIcon from '../../components/Icons/Cross';
import UserCard from '../../components/MyNetworkLayout/UserCard';
import { TABS_NAME } from '../../constants/lang';
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

const { FOLLOWERS, FOLLOWING, CONNECTIONS } = TABS_NAME;
const pageSize = 10;

const NO_RESULTS_DATA_TITLE = {
  [FOLLOWERS]: 'You will see all the people who follow you here.',
  [FOLLOWING]: 'You will see all the people who are followed by you here.',
  [CONNECTIONS]: 'You will see all your connections here.',
};

const MyNetworkTabSection = ({ selectedTab }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [searchOnFocus, setSearchOnFocus] = useState(false);
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
    let response = {};

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
      setCurrentPage(data?.page);
    }
  };

  const searchInputChangeHandler = (value) => {
    setSearchValue(value);
  };

  return (
    <Card classNames="min-h-[75vh] md:mt-0 md:py-3 lg:mt-2 lg:py-2 min-[320px]:mt-0  min-[320px]:rounded-t-none lg:rounded-t-lg min-[320px]:py-5">
      <div className=" w-[100%] ">
        <div className="lg:flex  md:flex md:justify-between lg:justify-between mx-9 items-center">
          <div className="lg:block md:block min-[320px]:hidden font-semibold">
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
          </div>
        </div>
      </div>

      <div className="my-5 mx-6 mb-4">
        {usersList?.length ? (
          <>
            {usersList?.map((item) => (
              <UserCard
                key={item?.id}
                id={item?.[setResponse.innerType]?.id}
                userId={item?.[setResponse.innerType]?.id}
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
          </>
        ) : (
          <div className="flex w-full justify-center items-center">
            <div className="p-4 mt-4 h-[calc(100vh-275px)] flex flex-col justify-center item-center m-auto text-center">
              <h5 className="font-medium text-greydark text-[14px] mb-2">
                {NO_RESULTS_DATA_TITLE[selectedTab]}
              </h5>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MyNetworkTabSection;
