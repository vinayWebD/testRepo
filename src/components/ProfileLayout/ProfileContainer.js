import React, { useMemo, useState } from 'react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import location from '../../assets/images/location.svg';
import mail from '../../assets/images/mail.svg';
import edit from '../../assets/images/editIcon.svg';
import ThreeDots from '../Icons/ThreeDots';
import Dropdown from '../common/Dropdown';
import OutlinedButton from '../common/OutlinedButton';
import Modal from '../../components/Modal';
import EditProfile from '../../components/ProfilePage/EditProfile';
import { useDispatch } from 'react-redux';
import {
  blockUserDispatcher,
  followOtherUserDispatcher,
  unfollowOtherUserDispatcher,
} from '../../redux/dispatchers/otherUserDispatcher';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError, ToastNotifySuccess } from '../Toast/ToastNotify';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';

const { HOME } = PATHS;

const ProfileContainer = ({
  userData,
  isOtherUser = false,
  reloadAfterFollowUnfollow = () => {},
}) => {
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [isLoadingFollowUnfollow, setIsLoadingFollowUnfollow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const followUnfollowHandler = async () => {
    if (isLoadingFollowUnfollow) {
      return;
    }

    let response;
    setIsLoadingFollowUnfollow(true);
    if (userData?.followStatus?.isApproved || userData?.followStatus?.isApproved === false) {
      response = (await dispatch(unfollowOtherUserDispatcher({ id: userData?.id }))) || {};
    } else if (userData?.followStatus?.isApproved === undefined) {
      response = (await dispatch(followOtherUserDispatcher({ id: userData?.id }))) || {};
    }

    if (response) {
      const { status, data } = response;

      if (successStatus(status)) {
        // Means that this request which was sent has been removed
        if (userData?.followStatus?.isApproved === false) {
          ToastNotifySuccess('Sent request has been cancelled');
        } else if (!data?.data?.isApproved) {
          ToastNotifySuccess('A follow request has been sent');
        }
        await reloadAfterFollowUnfollow();
      } else {
        const errormsg = getErrorMessage(data);
        if (errormsg) {
          ToastNotifyError(errormsg);
        }
      }
    }
    setIsLoadingFollowUnfollow(false);
  };

  const memoizedAvatar = useMemo(
    () => (
      <Avatar
        classNames="w-[40%] h-[40%] max-w-[100px] max-h-[100px] m-auto"
        image={userData?.profilePictureUrl}
        name={`${userData?.firstName} ${userData?.lastName}`}
      />
    ),
    [userData?.id],
  );

  const followUnfollowLabel = () => {
    if (userData?.followStatus?.isApproved) {
      return 'Following';
    } else if (userData?.followStatus?.isApproved === false) {
      return 'Request Sent';
    } else {
      return 'Follow';
    }
  };

  const blockClickHandler = async () => {
    const { status, data } = await dispatch(
      blockUserDispatcher({ userId: userData?.id, showLoader: true }),
    );

    if (successStatus(status)) {
      ToastNotifySuccess('The user has been blocked');
      navigate(HOME, { replace: true });
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    }
  };

  return (
    <Card classNames="lg:block py-4 px-2 md:px-4 relative">
      <div className="block gap-4">
        {!isOtherUser ? (
          <div
            className="bg-iconBackground p-1 rounded w-fit absolute right-[5%]"
            onClick={() => setIsEditingModalOpen(true)}
          >
            <img src={edit} alt="edit" className="cursor-pointer" />
          </div>
        ) : (
          <div className="p-1 rounded w-fit absolute right-[5%]">
            <Dropdown
              IconComponent={ThreeDots}
              options={[
                { name: 'Report', action: () => {} },
                { name: 'Block', action: blockClickHandler },
              ]}
            />
          </div>
        )}

        {memoizedAvatar}
        <div className="flex flex-col gap-1 overflow-hidden text-center pt-2">
          <p className="text-greydark text-[14px] md:text-[20px] font-semibold overflow-hidden truncate capitalize">
            {userData?.firstName} {userData?.lastName}
          </p>
          <h4 className="font-normal text-greydark text-[12px] md:text-[14px]">
            {userData?.designation}
          </h4>
          {userData?.location && (
            <h6 className="flex font-normal text-greydark text-[10px] justify-center items-center">
              <img src={location} alt="location" className="pr-1" />
              {userData?.location}
            </h6>
          )}
          {!isOtherUser ? (
            <h6 className="flex font-normal text-greydark text-[10px] justify-center items-center">
              <img src={mail} alt="mail" className="pr-1" />
              {userData?.email}
            </h6>
          ) : (
            ''
          )}

          <div className="font-medium text-[8px] md:text-[10px] leading-3 text-greylight">
            {userData?.description}
          </div>
          {isOtherUser && (
            <div className="flex gap-[7%] justify-center mt-2">
              <OutlinedButton label={'Message'} additionalClassNames="!text-[14px]" />
              <OutlinedButton
                onClick={() => followUnfollowHandler()}
                label={followUnfollowLabel()}
                additionalClassNames="!bg-blueprimary text-white !text-[14px] w-[135px] !justify-center !px-1"
                isLoading={isLoadingFollowUnfollow}
              />
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isEditingModalOpen}
        onClose={() => setIsEditingModalOpen(false)}
        isTitle={true}
        title={'Edit Profile'}
        childrenClassNames=""
        padding="!p-0"
        titleClassNames=""
        titleParentClassNames="md:m-0 mt-[121px]"
        height="h-[100dvh] max-h-[100dvh] md:h-auto"
      >
        <EditProfile {...userData} onClose={() => setIsEditingModalOpen(false)} />
      </Modal>
    </Card>
  );
};

export default ProfileContainer;
