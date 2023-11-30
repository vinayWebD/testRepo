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

const { BTNLBL_FOLLOW, BTNLBL_UNFOLLOW, BTNLBL_ACCEPT } = BUTTON_LABELS;
const { FOLLOWERS } = TABS_NAME;

/**
 * isApproved = true: means you are following that person
 * isApproved = false: request sent
 * isApproved = true:  will also come in followers list
 */

const UserCard = ({
  id,
  selectedTab,
  className = '',
  onClick = () => {},
  isFriendRequest, // If we are referring to a friend request, probably friend request section
  userName = '',
  location = '',
  userImage = userimg,
  career = '',
  reloadData = () => {},
  isRequestedByYou = false, // This means if the current user has requested
}) => {
  const [isLoadingFollowUnfollow, setIsLoadingFollowUnfollow] = useState(false);
  const dispatch = useDispatch();

  const handleRedirect = () => {
    console.log('navigate user profile');
  };

  const followUnfollowHandler = async () => {
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
        if (!data?.data?.isApproved) {
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

  return (
    <div
      className={`${className} mb-3 flex sm:justify-start min-[320px]:items-start sm:items-start gap-2 relative w-[100%] border border-borderColor rounded-lg p-2 py-5 pr-6 !items-center`}
    >
      <div className=" sm:flex sm:justify-start sm:items-start ">
        <Avatar name={userName} image={userImage} classNames="h-[52px] w-[52px] " />
      </div>
      <div className="flex justify-between   md:w-[-webkit-fill-available] md:flex-row sm:flex-col  lg:gap-x-10 relative xl:w-[-webkit-fill-available] min-[320px]:flex-col min-[320px]:gap-y-3 ">
        <div
          className="flex justify-between cursor-pointer gap-9 md:flex-row sm:flex-col min-[320px]:flex-col min-[320px]:gap-y-2 items-center"
          onClick={handleRedirect}
        >
          <div>
            <h3 className="text-base text-gray-950  font-medium">{userName}</h3>
            {location ? (
              <div className="flex gap-1">
                <LocationIcon />
                <span className="text-xs font-normal">{location}</span>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="font-sm md:font-medium lg:font-medium xl:w-[268px] lg:w-[150px] md:w-[268px] relative text-greydark w-[auto] min-[320px]:font-normal min-[320px]:text-xs">
            <span>{career}</span>
          </div>
        </div>

        <div className="flex md:gap-5 xl:gap-x-16 lg:gap-x-6 md:gap-x-16 items-center min-[320px]:gap-x-9 ">
          <div className="cursor-pointer flex items-center">
            {isFriendRequest ? <CrossIcon /> : <ChatIcon />}
          </div>
          {isFriendRequest ? (
            <Button
              label={BTNLBL_ACCEPT}
              additionalClassNames=" sm:px-[30px] sm:h-[0px] md:h-[0px] sm:py-[19px] md:h-[37px] items-center text-xs min-[320px]:p-4 !text-[14px]"
              showArrowIcon={false}
              onClick={onClick}
            />
          ) : isRequestedByYou ? (
            <OutlinedButton
              isIcon={false}
              label={'Request Sent'}
              additionalClassNames=" sm:h-[37px] sm:p-[15px] min-[320px]:px-2 !text-[14px]"
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
