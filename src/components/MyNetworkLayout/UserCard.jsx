import React, { useState } from 'react';
import Avatar from '../common/Avatar';
import OutlinedButton from '../common/OutlinedButton';
import userimg from '../../assets/images/user.png';
import LocationIcon from '../Icons/LocationIcon';
import ChatIcon from '../Icons/ChatIcon';
import { Button } from '../common/Button';
import { BUTTON_LABELS, TABS_NAME } from '../../constants/lang';
import CrossIcon from '../Icons/Cross';
import { useDispatch } from 'react-redux';
import {
  followOtherUserDispatcher,
  unfollowOtherUserDispatcher,
} from '../../redux/dispatchers/otherUserDispatcher';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError, ToastNotifySuccess } from '../Toast/ToastNotify';
import {
  acceptFollowRequestDispatcher,
  rejectFollowRequestDispatcher,
} from '../../redux/dispatchers/myNetworkDispatcher';
import useDeviceType from '../../hooks/useDeviceType';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';

const { BTNLBL_FOLLOW, BTNLBL_UNFOLLOW, BTNLBL_ACCEPT } = BUTTON_LABELS;
const { FOLLOWERS } = TABS_NAME;

/**
 * isApproved = true: means you are following that person
 * isApproved = false: request sent
 * isApproved = true:  will also come in followers list
 */

const UserCard = ({
  id,
  userId,
  selectedTab,
  className = '',
  isFriendRequest, // If we are referring to a friend request, probably friend request section
  userName = '',
  location = '',
  userImage = userimg,
  career = '',
  reloadData = () => {},
  isRequestedByYou = false, // This means if the current user has requested
  closePopupHandler = () => {}, // This is currently required to close the friend requests section popup
}) => {
  const [isLoadingFollowUnfollow, setIsLoadingFollowUnfollow] = useState(false);
  const navigate = useNavigate();
  const deviceType = useDeviceType();
  const dispatch = useDispatch();

  const handleRedirect = () => {
    navigate(`${PATHS.OTHER_USER_PROFILE}${userId}`);
    closePopupHandler();
  };

  const followUnfollowHandler = async () => {
    if (isLoadingFollowUnfollow) {
      return;
    }

    let response;
    setIsLoadingFollowUnfollow(true);
    // This means we have sent a request, and now we are cancelling it
    if (isRequestedByYou) {
      response = (await dispatch(unfollowOtherUserDispatcher({ id }))) || {};
    } else {
      if (selectedTab === 'Followers') {
        response = (await dispatch(followOtherUserDispatcher({ id }))) || {};
      } else {
        response = (await dispatch(unfollowOtherUserDispatcher({ id }))) || {};
      }
    }

    if (response) {
      const { status, data } = response;

      if (successStatus(status)) {
        if (!data?.data?.isApproved && !isRequestedByYou) {
          ToastNotifySuccess('A follow request has been sent');
        }
        await reloadData();
      } else {
        const errormsg = getErrorMessage(data);
        if (errormsg) {
          ToastNotifyError(errormsg);
        }
      }
    }
    setIsLoadingFollowUnfollow(false);
  };

  const acceptRequestHandler = async () => {
    let response = await dispatch(acceptFollowRequestDispatcher({ id }));
    const { status, data } = response;

    if (successStatus(status)) {
      ToastNotifySuccess('Request accepted successfully!');
      await reloadData();
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    }
  };

  const rejectRequestHandler = async () => {
    let response = await dispatch(rejectFollowRequestDispatcher({ id }));
    const { status, data } = response;

    if (successStatus(status)) {
      ToastNotifySuccess('Request has been rejected');

      await reloadData();
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    }
  };

  return (
    <div
      className={`${className} overflow-hidden  mb-3 flex justify-start min-[320px]:items-start sm:items-start gap-2 relative w-[100%] border border-borderColor rounded-lg p-2 py-5 pr-6 md:!items-center`}
    >
      <div
        className=" sm:flex sm:justify-start sm:items-start cursor-pointer"
        onClick={handleRedirect}
      >
        <Avatar name={userName} image={userImage} classNames="h-[52px] w-[52px] cursor-pointer" />
      </div>
      <div className="w-full flex md:justify-between md:flex-row sm:flex-col gap-3 relative min-[320px]:flex-col min-[320px]:gap-y-3 ">
        <div className="w-full md:w-[60%] md:max-w-[60%] lg:w-[65%] lg:max-w-[65%] gap-3 flex justify-between cursor-pointer md:flex-row sm:flex-col min-[320px]:flex-col min-[320px]:gap-y-2 md:items-center">
          <div className="w-full md:w-[70%] md:max-w-[70%] lg:w-[70%] lg:max-w-[70%]">
            <h3
              className="text-base text-gray-950 font-medium cursor-pointer"
              onClick={handleRedirect}
            >
              {userName}
            </h3>
            {location ? (
              <div className="flex gap-1">
                <LocationIcon />
                <span className="text-xs font-normal">{location}</span>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="w-full md:w-[30%] md:max-w-[30%] lg:w-[35%] lg:max-w-[35%] font-sm md:font-medium lg:font-medium relative text-greydark min-[320px]:font-normal min-[320px]:text-xs">
            <span>{career}</span>
          </div>
        </div>

        <div className="w-full md:w-[40%] md:max-w-[40%] lg:w-[30%] lg:max-w-[30%] flex md:items-center md:gap-[7%] gap-[15%] items-center md:justify-end">
          {!isFriendRequest && (
            <div className="cursor-pointer flex items-center">
              <ChatIcon />
            </div>
          )}
          {isFriendRequest ? (
            <>
              <Button
                label={BTNLBL_ACCEPT}
                additionalClassNames=" sm:px-[30px] sm:h-[0px] md:h-[0px] sm:py-[19px] md:h-[37px] items-center text-xs min-[320px]:p-4 !text-[14px]"
                showArrowIcon={false}
                onClick={acceptRequestHandler}
              />

              <span
                onClick={rejectRequestHandler}
                className="text-[#999999] text-sm font-medium cursor-pointer hover:opacity-70"
              >
                {deviceType === 'mobile' ? 'Reject' : <CrossIcon />}
              </span>
            </>
          ) : isRequestedByYou ? (
            <OutlinedButton
              isIcon={false}
              label={'Request Sent'}
              additionalClassNames=" sm:h-[37px] min-[320px]:px-2 !text-[14px]"
              onClick={followUnfollowHandler}
              isLoading={isLoadingFollowUnfollow}
            />
          ) : selectedTab === FOLLOWERS ? (
            <Button
              label={BTNLBL_FOLLOW}
              additionalClassNames="sm:px-[30px] sm:h-[0px] md:h-[0px] sm:py-[19px] items-center text-xs min-[320px]:p-4 w-[101px] !text-[14px]"
              showArrowIcon={false}
              onClick={followUnfollowHandler}
              isLoading={isLoadingFollowUnfollow}
              onlyShowLoaderWhenLoading={true}
            />
          ) : (
            <OutlinedButton
              isIcon={false}
              label={BTNLBL_UNFOLLOW}
              additionalClassNames="sm:h-[37px] sm:p-[15px] min-[320px]:px-2 w-[115px] !justify-center !text-[14px]"
              onClick={followUnfollowHandler}
              isLoading={isLoadingFollowUnfollow}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
