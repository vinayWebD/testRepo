import React, { useState } from 'react';
import Avatar from '../common/Avatar';
import ThreeDots from '../Icons/ThreeDots';
import Dropdown from '../common/Dropdown';
import ConfirmationModal from '../Modal/ConfirmationModal';
import timeSpan from '../../utils/timeSpan';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentDispatcher } from '../../redux/dispatchers/feedDispatcher';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../Toast/ToastNotify';
import CommentInput from './CommentInput';
import HtmlText from '../common/HtmlText';
import { DATE_FORMAT } from '../../constants/constants';
import ReportComment from './ReportComment';

const CommentLayout = ({
  PostId,
  User,
  id,
  createdAt,
  description,
  reloadPostDetails = () => {},
}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.user) || {};
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { globalTransparentLoadingPrivate } = useSelector((state) => state.auth || {});

  const deleteCommentHandler = async () => {
    if (!globalTransparentLoadingPrivate) {
      const { status, data } = (await dispatch(deleteCommentDispatcher({ id }))) || {};
      if (!successStatus(status)) {
        const errormsg = getErrorMessage(data);
        if (errormsg) {
          ToastNotifyError(errormsg);
        }
      }
      await reloadPostDetails(PostId);
    }
  };

  return (
    <div className="flex gap-2 mt-3 w-full">
      {!isEditing ? (
        <>
          <Avatar
            image={User?.profilePictureUrl}
            name={`${User?.firstName} ${User?.lastName}`}
            classNames="w-[40px] h-[40px]"
          />
          <div className="relative flex flex-col justify-center gap-1 p-2 bg-whitelight rounded-lg w-full">
            <div className="flex justify-between items-center">
              <div
                className="text14 font-semibold text-greydark max-w-[55%] text-ellipsis overflow-hidden"
                title={`${User?.firstName} ${User?.lastName}`}
              >
                {User?.firstName} {User?.lastName}
              </div>
              <div className="flex items-center justify-center gap-4">
                <p className="text-[11px] lg:text-xs text-greylight">
                  {timeSpan(createdAt, DATE_FORMAT.CAPTION)}
                </p>
                <div className="w-[20px] relative top-1">
                  <Dropdown
                    options={
                      User?.id === userData?.id
                        ? [
                            { name: 'Edit', action: () => setIsEditing(true) },
                            { name: 'Delete', action: () => setIsDeleteModalOpen(true) },
                          ]
                        : [{ name: 'Report', action: () => setIsReportModalOpen(true) }]
                    }
                    IconComponent={() => <ThreeDots className="w-[4px] h-[20px] rotate-90" />}
                    optionsClassName="!top-0"
                  />
                </div>
              </div>
            </div>

            <ConfirmationModal
              title="Delete Comment"
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              primaryButtonTitle="Delete"
              secondaryButtonTitle="No"
              secondaryButtonAction={() => setIsDeleteModalOpen(false)}
              primaryButtonAction={deleteCommentHandler}
            >
              Are you sure you want to delete this comment?
            </ConfirmationModal>

            <ReportComment
              isOpen={isReportModalOpen}
              onClose={() => setIsReportModalOpen(false)}
              commentId={id}
              postId={PostId}
              commentorId={User?.id}
            />

            <div className="text-[13px] lg:text14 text-greydark">
              <HtmlText text={description} />
            </div>
          </div>
        </>
      ) : (
        <CommentInput
          reloadPostDetails={reloadPostDetails}
          postId={PostId}
          isEditing={true}
          cancelEditing={() => setIsEditing(false)}
          commentDetails={{
            description,
            id,
            userId: User?.id,
          }}
        />
      )}
    </div>
  );
};

export default CommentLayout;
