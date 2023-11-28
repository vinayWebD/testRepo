/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import SectionLayout from '../../components/PrivateLayout/SectionLayout';
import Pagination from '../../components/Pagination';
import noWork from '../../assets/images/noWork.svg';
import './style.scss';
import InnerSectionLayout from '../../components/PrivateLayout/InnerSectionLayout';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import { getErrorMessage, successStatus } from '../../common';
// import { notificationListing } from '../../services/notificationService';
import {
  markReadDispatcher,
  notificationListDispatcher,
} from '../../redux/dispatchers/notificationDispatcher';
import { useDispatch } from 'react-redux';
import Avatar from '../../components/common/Avatar';
import { fetchPostDetails } from '../../services/feed';
import Modal from '../../components/Modal';
import PostDetails from '../../components/Post/PostDetails';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';
let PageSize = 10;

const NotificationPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataList, setDataList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch();
  const [isPreviewDetailsPostOpen, setIsPreviewDetailsPostOpen] = useState(false);
  const [activePost, setActivePost] = useState({});
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const fetchnotificationList = async () => {
    const { status, data } = await dispatch(
      notificationListDispatcher({
        page: currentPage,
      }),
    );
    if (!successStatus(status)) {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    } else {
      setCurrentPage(data?.data?.page);
      setDataList(data?.data?.notifications);
      setTotalCount(data?.data?.count);
    }
  };

  useEffect(() => {
    fetchnotificationList();
  }, [currentPage]);

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
          className="px-4 md:pl-10 bg-[#F5FBFF] relative cursor-pointer"
          onClick={() => handleClick(item?.PostId, item?.id, item?.markAsRead, userData?.id)}
        >
          <div className="dot-icon" />
          <div className="flex pt-4 pb-4">
            <div className="mr-2.5">
              <Avatar
                classNames="w-[45px] h-[45px] object-cover"
                image={userData?.profilePictureUrl}
                name={`${userData?.firstName} ${userData?.lastName}`}
              />
            </div>
            <div className="block w-full">
              <div className="text-[14px] font-normal text-[#333333]">
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
              <div className="text-[12px] font-normal text-[#A1A0A0]">
                {formatTimeDifference(item?.createdAt)}
              </div>
            </div>
          </div>
          {i !== dataList.length - 1 && <hr style={{ color: '#E8E8E8' }} />}
        </div>
      );
    } else {
      return (
        <div
          className="px-4 md:pl-10 cursor-pointer"
          onClick={() => handleClick(item?.PostId, item?.id, item?.markAsRead, userData?.id)}
        >
          <div className="flex pt-4 pb-4">
            <div className="mr-2.5">
              <Avatar
                classNames="w-[45px] h-[45px] object-cover"
                image={userData?.profilePictureUrl}
                name={`${userData?.firstName} ${userData?.lastName}`}
              />
            </div>
            <div className="block w-full">
              <div className="text-[14px] font-normal text-[#333333]">
                <span className="font-medium">
                  {userData?.firstName} {userData?.lastName}{' '}
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
              <div className="text-[12px] font-normal text-[#A1A0A0]">
                {formatTimeDifference(item?.createdAt)}
              </div>
            </div>
          </div>
          {i !== dataList.length - 1 && <hr style={{ color: '#E8E8E8' }} />}
        </div>
      );
    }
  };
  return (
    <SectionLayout activeTab={3}>
      <InnerSectionLayout heading={'Notification'}>
        <div className="h-auto">
          {dataList?.length > 0 ? (
            dataList.map((item, i) => {
              if (item?.count) {
                return notificationData(item?.data, i, item?.count);
              } else {
                return notificationData(item, i);
              }
            })
          ) : (
            <div className="p-4 mt-4 h-[calc(100vh-275px)] flex flex-col justify-center item-center m-auto text-center">
              <img src={noWork} alt="noWork" className="w-[20%] md:w-[10%] mx-auto " />
              <h4 className="font-semibold text-greydark text-[12px] md:text-[14px] my-2">
                No notification yet.
              </h4>
              <h5 className="font-medium text-greydark text-[10px] md:text-[14px] mb-2">
                It helps people quickly identify your many talents.
              </h5>
            </div>
          )}
        </div>
        <div className="py-4 flex items-center justify-end mt-auto">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </InnerSectionLayout>
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
    </SectionLayout>
  );
};

export default NotificationPage;
