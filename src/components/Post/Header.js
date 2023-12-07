import React, { memo, useEffect, useState } from 'react';
import Avatar from '../common/Avatar';
import Dropdown from '../common/Dropdown';
import ThreeDots from '../Icons/ThreeDots';
import timeSpan from '../../utils/timeSpan';
import ConfirmationModal from '../Modal/ConfirmationModal';
import { useDispatch } from 'react-redux';
import { deletePostDispatcher } from '../../redux/dispatchers/feedDispatcher';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError, ToastNotifySuccess } from '../Toast/ToastNotify';
import Modal from '../Modal';
import CreatePostLayout from '../CreatePost/CreatePostLayout';
import { LANG } from '../../constants/lang';
import copyToClipboard from '../../utils/copyToClipboard';
import { DATE_FORMAT } from '../../constants/constants';
import { PATHS } from '../../constants/urlPaths';
import { useNavigate } from 'react-router-dom';
import {
  followOtherUserDispatcher,
  unfollowOtherUserDispatcher,
} from '../../redux/dispatchers/otherUserDispatcher';

const { LANG_EDIT_POST } = LANG.PAGES.FEED;

const Header = ({
  postId = '',
  createdAt = '',
  creatorName = '',
  creatorProfilePicUrl = '',
  showThreeDots = true,
  isCreatedByMe = true,
  reloadData = () => {},
  postDetails = {},
  reloadPostDetails = () => {},
  userId = '',
  isFollowed = false,
}) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCreatedByMe) {
      setOptions([
        {
          name: 'Edit',
          action: () => setIsCreatePostModalOpen(true),
        },
        {
          name: 'Delete',
          action: () => setIsDeleteModalOpen(true),
        },
        {
          name: 'Copy link',
          action: () =>
            copyLink(
              `${window.location.origin}${PATHS.HOME}/${
                postDetails?.parentPostId || postDetails?.id
              }`,
            ),
        },
      ]);
    } else {
      setOptions([
        {
          name: 'Report',
          action: () => {},
        },
        {
          name: isFollowed ? 'Unfollow' : 'Follow',
          action: () => followUnfollowHandler(),
        },
        {
          name: 'Copy link',
          action: () => copyLink(`${window.location.origin}${PATHS.HOME}/${postDetails?.id}`),
        },
      ]);
    }
  }, [isCreatedByMe, isFollowed]);

  const copyLink = (text) => {
    copyToClipboard(text);
    ToastNotifySuccess('URL copied to clipboard');
  };

  const deletePostHandler = async () => {
    const { data, status } = (await dispatch(deletePostDispatcher({ postId }))) || {};
    if (successStatus(status)) {
      ToastNotifySuccess('Post deleted successfully');
      await reloadData(0);
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    }
    setIsDeleteModalOpen(false);
  };

  const followUnfollowHandler = async () => {
    let response;
    if (isFollowed) {
      response =
        (await dispatch(unfollowOtherUserDispatcher({ id: userId, showLoader: true }))) || {};
    } else if (!isFollowed) {
      response =
        (await dispatch(followOtherUserDispatcher({ id: userId, showLoader: true }))) || {};
    }

    if (response) {
      const { status, data } = response;

      if (successStatus(status)) {
        if (!data?.data?.isApproved) {
          ToastNotifySuccess('A follow request has been sent');
        } else {
          ToastNotifySuccess(`User ${isFollowed ? 'unfollowed' : 'followed'} successfully`);
        }
        await reloadPostDetails({ postId: postDetails?.id });
      } else {
        const errormsg = getErrorMessage(data);
        if (errormsg) {
          ToastNotifyError(errormsg);
        }
      }
    }
    document.body.click();
  };

  return (
    <div className="flex gap-2 items-center">
      <Avatar
        name={creatorName}
        image={creatorProfilePicUrl}
        classNames="w-[50px] h-[50px] bg-greylight border border-greymedium cursor-pointer"
        clickFun={() => {
          if (!isCreatedByMe) {
            navigate(`${PATHS.OTHER_USER_PROFILE}${userId}`);
          } else {
            navigate(`${PATHS.PROFILE}`);
          }
        }}
      />
      <div>
        <p
          className="font-semibold capitalize cursor-pointer"
          onClick={() => {
            if (!isCreatedByMe) {
              navigate(`${PATHS.OTHER_USER_PROFILE}${userId}`);
            } else {
              navigate(`${PATHS.PROFILE}`);
            }
          }}
        >
          {creatorName}
        </p>
        <p className="text-[12px] text-greylight">{timeSpan(createdAt, DATE_FORMAT.POST)}</p>
      </div>

      {showThreeDots && (
        <div className="ml-auto cursor-pointer">
          <Dropdown
            closeAfterClick={true}
            options={options}
            IconComponent={() => <ThreeDots className="w-[18px] h-[18px]" />}
          />
        </div>
      )}

      {/* A confirmation popup to delete the post */}
      <ConfirmationModal
        title="Delete Post"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        primaryButtonTitle="Delete"
        primaryButtonAction={() => deletePostHandler()}
        secondaryButtonTitle="Cancel"
        secondaryButtonAction={() => setIsDeleteModalOpen(false)}
      >
        Are you sure you want to delete this post?
      </ConfirmationModal>

      {/* Modal to edit the post */}
      <Modal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        isTitle={true}
        title={LANG_EDIT_POST}
        childrenClassNames="!overflow-visible"
        padding="p-0"
        titleClassNames=""
        titleParentClassNames="md:m-3 m-0"
        height="h-[100dvh] max-h-[100dvh] md:h-auto !overflow-visible"
        width="!w-[100vw] md:max-w-[540px]"
      >
        <CreatePostLayout
          closePopupHandler={() => {
            setIsCreatePostModalOpen(false);
          }}
          openTypeOfPost={null}
          reloadData={reloadData}
          reloadPostDetails={reloadPostDetails}
          isEditing={true}
          postDetails={{ ...postDetails, postId }}
        />
      </Modal>
    </div>
  );
};

const areEqual = (prevProps, nextProps) => {
  return (
    (prevProps.createdAt === nextProps.createdAt ||
      prevProps.creatorName === nextProps.creatorName ||
      prevProps.creatorProfilePicUrl === nextProps.creatorProfilePicUrl ||
      prevProps.showThreeDots === nextProps.showThreeDots) &&
    JSON.stringify(prevProps.postDetails) === JSON.stringify(nextProps.postDetails) &&
    prevProps.postDetails?.id === nextProps.postDetails?.id &&
    prevProps.isFollowed === nextProps.isFollowed
  );
};

export default memo(Header, areEqual);
