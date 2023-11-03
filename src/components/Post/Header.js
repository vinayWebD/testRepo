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

const Header = ({
  postId = '',
  createdAt = '',
  creatorName = '',
  creatorProfilePicUrl = '',
  showThreeDots = true,
  isCreatedByMe = true,
  reloadData = () => {},
}) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (isCreatedByMe) {
      setOptions([
        {
          name: 'Edit',
          action: () => {},
        },
        {
          name: 'Delete',
          action: () => setIsDeleteModalOpen(true),
        },
        {
          name: 'Copy link',
          action: () => {},
        },
      ]);
    } else {
      setOptions([
        {
          name: 'Report',
          action: () => {},
        },
        {
          name: 'Unfollow',
          action: () => {},
        },
        {
          name: 'Copy link',
          action: () => {},
        },
      ]);
    }
  }, [isCreatedByMe]);

  const deletePostHandler = async () => {
    const { data, status } = (await dispatch(deletePostDispatcher({ postId }))) || {};
    if (successStatus(status)) {
      ToastNotifySuccess('Post deleted successfully');
      await reloadData(1);
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex gap-2 items-center">
      <Avatar
        name={creatorName}
        image={creatorProfilePicUrl}
        classNames="w-[50px] h-[50px] bg-greylight border border-greymedium"
      />
      <div>
        <p className="font-semibold capitalize">{creatorName}</p>
        <p className="text-[12px] text-greylight">{timeSpan(createdAt)}</p>
      </div>

      {showThreeDots && (
        <div className="ml-auto cursor-pointer">
          <Dropdown
            options={options}
            IconComponent={() => <ThreeDots className="w-[18px] h-[18px]" />}
          />
        </div>
      )}

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
    </div>
  );
};

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.createdAt === nextProps.createdAt ||
    prevProps.creatorName === nextProps.creatorName ||
    prevProps.creatorProfilePicUrl === nextProps.creatorProfilePicUrl ||
    prevProps.showThreeDots === nextProps.showThreeDots
  );
};

export default memo(Header, areEqual);
