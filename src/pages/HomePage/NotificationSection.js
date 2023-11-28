import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import AddFriendIcon from '../../components/Icons/AddFriendIcon';
import { PATHS } from '../../constants/urlPaths';
import Modal from '../../components/Modal';
import InvitePeopleLayout from '../MyNetwork/InvitePeopleLayout';
import { BUTTON_LABELS } from '../../constants/lang';
import { useDispatch } from 'react-redux';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import {
  markReadDispatcher,
  notificationListDispatcher,
} from '../../redux/dispatchers/notificationDispatcher';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { fetchPostDetails } from '../../services/feed';
import PostDetails from '../../components/Post/PostDetails';
const { BTNLBL_INVITE_PEOPLE } = BUTTON_LABELS;

const NotificationSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataList, setDataList] = useState([]);
  const [isInvitePeopleModalOpen, setIsInvitePeopleModalOpen] = useState(false);
  const [isPreviewDetailsPostOpen, setIsPreviewDetailsPostOpen] = useState(false);
  const [activePost, setActivePost] = useState({});
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const fetchSinglePostDetails = async (postId) => {
    const response = await fetchPostDetails({ postId });
    const { status, data } = response;
    const errormsg = getErrorMessage(data);
    if (!successStatus(status)) {
      ToastNotifyError(errormsg, '');
      setIsPreviewDetailsPostOpen(false);
    } else {
      setActivePost(data?.data);
    }
  };
  useEffect(() => {
    fetchnotificationList();
  }, []);
  const fetchnotificationList = async () => {
    const { status, data } = await dispatch(
      notificationListDispatcher({
        page: 1,
        limit: 3,
      }),
    );
    if (!successStatus(status)) {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    } else {
      setDataList(data?.data?.notifications);
      if (data?.data?.notifications?.length > 0) {
        localStorage.setItem('newNotification', true);
      }
    }
  };

  const formatTimeDifference = (timestamp) => {
    const notificationDate = new Date(timestamp);
    const formattedDistance = formatDistanceToNow(notificationDate, {
      addSuffix: true,
    });
    return formattedDistance;
  };

  const notificationData = (item, i, count = 0) => {
    const userData = item?.notificationData;
    if (!item?.markAsRead) {
      return (
        <div
          className="px-1 bg-[#F5FBFF] relative cursor-pointer"
          onClick={() => handleClick(item?.PostId, item?.id, item?.markAsRead, userData?.id)}
        >
          <div className="flex py-2 pt-3">
            <div className="block w-full">
              <div className="text-sm font-normal text-[#333333]">
                <span className="font-medium">
                  {userData?.firstName} {userData?.lastName}
                </span>
                {count > 1 && item?.notificationType === 'like'
                  ? ` and ${count - 1} others liked your post`
                  : count > 1 && item?.notificationType === 'comment'
                  ? ` and ${count - 1} others commented on your post`
                  : item?.notificationType === 'like'
                  ? `${' '}liked your post`
                  : item?.notificationType === 'comment'
                  ? `${' '}comment on your post`
                  : `${' '}followed you`}
              </div>
              <div className="text-xs font-normal text-[#A1A0A0]">
                {formatTimeDifference(item?.createdAt)}
              </div>
            </div>
          </div>
          <hr style={{ color: '#E8E8E8' }} />
        </div>
      );
    } else {
      return (
        <div
          className="px-1 cursor-pointer"
          onClick={() => handleClick(item?.PostId, item?.id, item?.markAsRead, userData?.id)}
        >
          <div className="flex py-2 pt-3">
            <div className="block w-full">
              <div className="text-sm font-normal text-[#333333]">
                <span className="font-medium">
                  {userData?.firstName} {userData?.lastName}
                </span>
                {count > 1 && item?.notificationType === 'like'
                  ? ` and ${count - 1} others liked your post`
                  : count > 1 && item?.notificationType === 'comment'
                  ? ` and ${count - 1} others commented on your post`
                  : item?.notificationType === 'like'
                  ? `${' '}liked your post`
                  : item?.notificationType === 'comment'
                  ? `${' '}comment on your post`
                  : `${' '}followed you`}
              </div>
              <div className="text-xs font-normal text-[#A1A0A0]">
                {formatTimeDifference(item?.createdAt)}
              </div>
            </div>
          </div>
          {<hr style={{ color: '#E8E8E8' }} />}
        </div>
      );
    }
  };

  const handleClick = async (postId, notificationId, markAsRead, userId) => {
    if (postId) {
      if (!markAsRead) {
        const { status, data } = await dispatch(
          markReadDispatcher({ NotificationId: Number(notificationId) }),
        );
        if (!successStatus(status)) {
          const errormsg = getErrorMessage(data);
          if (errormsg) {
            ToastNotifyError(errormsg);
          }
        } else {
          fetchnotificationList();
          fetchSinglePostDetails(postId);
          setActiveMediaIndex(postId);
          setIsPreviewDetailsPostOpen(true);
        }
      } else {
        fetchSinglePostDetails(postId);
        setActiveMediaIndex(postId);
        setIsPreviewDetailsPostOpen(true);
      }
    } else {
      if (userId) {
        const { status, data } = await dispatch(
          markReadDispatcher({ NotificationId: Number(notificationId) }),
        );
        if (!successStatus(status)) {
          const errormsg = getErrorMessage(data);
          if (errormsg) {
            ToastNotifyError(errormsg);
          }
        } else {
          navigate(`${PATHS.OTHER_USER_PROFILE}${userId}`);
        }
      }
    }
  };

  return (
    <div>
      <Card>
        <div className="rounded-t-lg flex flex-col gap-2 blue-white-gradient p-3 text-white">
          <div className="flex items-center gap-2">
            <AddFriendIcon />
            <p className="font-semibold text-xl">{BTNLBL_INVITE_PEOPLE}</p>
          </div>
          <p className="text-sm">Invite your friends and family to join PurDriven.</p>
        </div>
        <div
          className="p-3 text-blueprimary text-base font-semibold text-center cursor-pointer hover:opacity-70"
          onClick={() => setIsInvitePeopleModalOpen(true)}
        >
          Invite Now
        </div>
      </Card>

      <div className="h-auto">
        {dataList?.length > 0 ? (
          <>
            <Card classNames="p-3 mt-[14px]">
              <p className="font-semibold text-base">Notification</p>
              {dataList.map((item, i) => {
                if (item?.count) {
                  return notificationData(item?.data, i, item?.count);
                } else {
                  return notificationData(item, i);
                }
              })}

              <div
                className="pt-3 text-blueprimary text-base font-semibold text-center cursor-pointer hover:opacity-70"
                onClick={() => navigate(PATHS.MY_NOTIFICATION)}
              >
                View All
              </div>
            </Card>
          </>
        ) : (
          <div></div>
        )}
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
      <Modal
        isOpen={isPreviewDetailsPostOpen}
        onClose={() => {
          setActivePost({});
          setActiveMediaIndex(0);
          fetchnotificationList();
          setIsPreviewDetailsPostOpen(false);
        }}
        isTitle={false}
        width={` ${
          !activePost?.postMedia?.length ? '!w-[100vw] md:!w-[45vw]' : '!w-[100vw] md:!w-[75vw]'
        } `}
        childrenClassNames=""
        padding="!p-0"
        titleClassNames=""
        titleParentClassNames="md:m-3 m-0"
        height={` ${
          !activePost?.postMedia?.length
            ? 'max-h-[100dvh] md:h-auto'
            : 'h-[100dvh] max-h-[100dvh] md:h-auto'
        } `}
      >
        <PostDetails
          post={activePost}
          reloadPostDetails={fetchSinglePostDetails}
          customActiveIndex={activeMediaIndex}
          onCloseHandler={() => {
            setActivePost({});
            setActiveMediaIndex(0);
            fetchnotificationList();
            setIsPreviewDetailsPostOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default NotificationSection;
