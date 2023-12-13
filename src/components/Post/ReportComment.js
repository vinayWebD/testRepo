import React, { useState } from 'react';
import ConfirmationModal from '../Modal/ConfirmationModal';
import { useDispatch } from 'react-redux';
import TextArea from '../TextArea';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../Toast/ToastNotify';
import { reportCommentDispatcher } from '../../redux/dispatchers/feedDispatcher';
import { PATHS } from '../../constants/urlPaths';

const ReportComment = ({
  isOpen = () => {},
  onClose = () => {},
  commentId,
  postId,
  commentorId,
}) => {
  const dispatch = useDispatch();
  const [reason, setReason] = useState('');

  const reportCommentHandler = async () => {
    if (reason?.trim()?.length) {
      const { status, data } = await dispatch(
        reportCommentDispatcher({
          commentId,
          reason,
          postLink: `${window.location.origin}${PATHS.HOME}/${postId}`,
          profileLink: `${window.location.origin}${PATHS.OTHER_USER_PROFILE}${commentorId}`,
        }),
      );

      if (!successStatus(status)) {
        const errormsg = getErrorMessage(data);
        if (errormsg) {
          ToastNotifyError(errormsg);
        }
      }
    }
  };
  return (
    <ConfirmationModal
      title="Report User"
      isOpen={isOpen}
      onClose={onClose}
      primaryButtonTitle="Report"
      primaryButtonAction={reportCommentHandler}
      secondaryButtonTitle="Cancel"
      secondaryButtonAction={onClose}
      isPrimaryButtonDisabled={!reason?.trim()?.length}
    >
      <div>
        <div className="text-[18px] tx-greydark font-medium">
          Are you sure you want to Report this comment?
        </div>
        <div className="mt-6 flex flex-col">
          <label htmlFor="reportReason" className="flex">
            Please type the reason<span className="text-red">*</span>
          </label>

          <TextArea
            placeholder="Please type the reason why you want to report the comment."
            label=""
            height="min-h-[110px] mt-1"
            value={reason}
            handleChange={(val) => setReason(val)}
          />
        </div>
      </div>
    </ConfirmationModal>
  );
};

export default ReportComment;
