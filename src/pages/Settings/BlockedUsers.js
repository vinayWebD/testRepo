import React, { useEffect, useState } from 'react';
import SectionLayout from '../../components/PrivateLayout/SectionLayout';
import InnerSectionLayout from '../../components/PrivateLayout/InnerSectionLayout';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';
import { useDispatch } from 'react-redux';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError, ToastNotifySuccess } from '../../components/Toast/ToastNotify';
import {
  fetchBlockedUsersDispatcher,
  unblockUserDispatcher,
} from '../../redux/dispatchers/otherUserDispatcher';
import Pagination from '../../components/Pagination';
import { PAGE_SIZE } from '../../constants/constants';
import OutlinedButton from '../../components/common/OutlinedButton';
import Avatar from '../../components/common/Avatar';
import LocationIcon from '../../components/Icons/LocationIcon';

const { SETTINGS } = PATHS;

const BlockedUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    const { status, data } = await dispatch(fetchBlockedUsersDispatcher({ page: currentPage }));
    if (!successStatus(status)) {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    } else {
      setUsers(data?.data?.rows);
      setTotalCount(data?.data?.count);
    }
  };

  const unblockUser = async (id) => {
    const { status, data } = await dispatch(
      unblockUserDispatcher({ userId: id, showLoader: true }),
    );
    if (!successStatus(status)) {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    } else {
      ToastNotifySuccess('User unblocked successfully!');
      await fetchUsers();
    }
  };

  return (
    <SectionLayout activeTab={4}>
      <InnerSectionLayout
        heading={'Blocked Users'}
        isSubSection={true}
        onClickSubSectionHandler={() => navigate(SETTINGS)}
      >
        <div className="flex flex-col gap-5">
          {users?.map((user) => {
            return (
              <div
                key={user?.id}
                className={
                  'overflow-hidden mb-3 flex justify-start min-[320px]:items-start sm:items-start gap-2 relative w-[100%]  shadow-card rounded-lg p-2 py-5 pr-6 md:!items-center'
                }
              >
                <div className=" sm:flex sm:justify-start sm:items-start ">
                  <Avatar
                    name={`${user?.userBlocked?.firstName} ${user?.userBlocked?.lastName}`}
                    image={user?.userBlocked?.profilePicture}
                    classNames="h-[52px] w-[52px] "
                  />
                </div>
                <div className="w-full flex md:justify-between md:flex-row sm:flex-col gap-3 relative min-[320px]:flex-col min-[320px]:gap-y-3 ">
                  <div className="w-full md:w-[60%] md:max-w-[60%] lg:w-[65%] lg:max-w-[65%] gap-3 flex justify-between md:flex-row sm:flex-col min-[320px]:flex-col min-[320px]:gap-y-2 md:items-center">
                    <div className="w-full md:w-[70%] md:max-w-[70%] lg:w-[70%] lg:max-w-[70%]">
                      <h3 className="text-base text-gray-950  font-medium">
                        {`${user?.userBlocked?.firstName} ${user?.userBlocked?.lastName}`}
                      </h3>
                      {user?.userBlocked?.location ? (
                        <div className="flex gap-1">
                          <LocationIcon />
                          <span className="text-xs font-normal">{user?.userBlocked?.location}</span>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="w-full md:w-[30%] md:max-w-[30%] lg:w-[35%] lg:max-w-[35%] font-medium relative text-greydark text-xs">
                      <span>{user?.userBlocked?.Careers?.[0]?.title}</span>
                    </div>
                  </div>

                  <div className="w-full md:w-[40%] md:max-w-[40%] lg:w-[30%] lg:max-w-[30%] flex justify-center items-center md:justify-end">
                    <OutlinedButton
                      isIcon={false}
                      label={'Unblock'}
                      additionalClassNames="sm:h-[37px] !text-[14px]"
                      onClick={() => unblockUser(user?.userBlocked?.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="py-4 flex items-center justify-end mt-auto">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={PAGE_SIZE.BLOCKED_USERS_LIST}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scroll(0, 0);
              }}
            />
          </div>
        </div>
      </InnerSectionLayout>
    </SectionLayout>
  );
};

export default BlockedUsers;
