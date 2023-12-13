import React, { useState } from 'react';
import ConfirmationModal from '../Modal/ConfirmationModal';
import { useDispatch } from 'react-redux';
import TextArea from '../TextArea';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError, ToastNotifySuccess } from '../Toast/ToastNotify';
import { reportPostDispatcher } from '../../redux/dispatchers/feedDispatcher';
import { PATHS } from '../../constants/urlPaths';

const ReportPost = ({ isOpen = () => {}, onClose = () => {}, postId, creatorId }) => {
  const dispatch = useDispatch();
  const [reason, setReason] = useState('');

  const reportPostHandler = async () => {
    if (reason?.trim()?.length) {
      const { status, data } = await dispatch(
        reportPostDispatcher({
          postId,
          reason,
          postLink: `${window.location.origin}${PATHS.HOME}/${postId}`,
          profileLink: `${window.location.origin}${PATHS.OTHER_USER_PROFILE}${creatorId}`,
        }),
      );

      if (!successStatus(status)) {
        const errormsg = getErrorMessage(data);
        if (errormsg) {
          ToastNotifyError(errormsg);
        }
      } else {
        ToastNotifySuccess('Post reported successfully');
        onClose();
      }
    }
  };
  return (
    <ConfirmationModal
      title="Report Post"
      isOpen={isOpen}
      onClose={onClose}
      primaryButtonTitle="Report"
      primaryButtonAction={reportPostHandler}
      secondaryButtonTitle="Cancel"
      secondaryButtonAction={onClose}
      isPrimaryButtonDisabled={!reason?.trim()?.length}
    >
      <div>
        <div className="text-[18px] tx-greydark font-medium">
          Are you sure you want to Report this post?
        </div>
        <div className="mt-6 flex flex-col">
          <label htmlFor="reportReason" className="flex">
            Please type the reason<span className="text-red">*</span>
          </label>

          <TextArea
            placeholder="Please type the reason why you want to report the post."
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

export default ReportPost;
