import React, { useState } from 'react';
import PhotoIcon from '../Icons/PhotoIcon';
import VideoIcon from '../Icons/VideoIcon';
import LinkIcon from '../Icons/LinkIcon';
import { Button } from '../common/Button';
import { BUTTON_LABELS, LANG } from '../../constants/lang';
import { REGEX } from '../../constants/constants';
import MediaLayout from '../MediaLayout';
import Modal from '../Modal';
import EmojiTextarea from '../common/EmojieTextarea';
import { createPost } from '../../services/feed';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError, ToastNotifySuccess } from '../Toast/ToastNotify';
import { TOASTMESSAGES } from '../../constants/messages';
import CreatePostLinkLayout from './CreatePostLinkLayout';

const { BTNLBL_LINK, BTNLBL_VIDEO, BTNLBL_PHOTO } = BUTTON_LABELS;
const { POST_PATTERN } = REGEX;
const { LANG_TEXT_AREA_PLACEHOLDER } = LANG.PAGES.CREATE_POST;
const {
  successToast: { TST_POST_CREATED_SUCCESSFULLY = '' },
  toastid: { TST_POST_CREATED_SUCCESS_ID, TST_POST_CREATED_FAILED_ID },
} = TOASTMESSAGES;

const CreatePostLayout = () => {
  const [text, setText] = useState('');
  const [media] = useState([]);
  const [isLinkSectionOpen, setIsLinkSectionOpen] = useState(false);
  const [links, setLinks] = useState(['']);

  const isPostButtonDisabled = () => {
    return !POST_PATTERN.test(text);
  };

  const savePostHandler = async () => {
    const response = await createPost({ caption: text, links });

    const { status, data } = response;
    const errormsg = getErrorMessage(data);
    if (successStatus(status)) {
      ToastNotifySuccess(TST_POST_CREATED_SUCCESSFULLY, TST_POST_CREATED_SUCCESS_ID);
    } else {
      if (errormsg) {
        ToastNotifyError(errormsg, TST_POST_CREATED_FAILED_ID);
      }
    }
  };

  return (
    <>
      <div className="max-h-[515px] overflow-y-visible">
        <div className="relative px-6 flex flex-col gap-2">
          <EmojiTextarea
            placeholder={LANG_TEXT_AREA_PLACEHOLDER}
            value={text}
            handleChange={(val) => setText(val)}
          />
          {media.length ? <MediaLayout media={media} /> : ''}
        </div>
        <div className="flex gap-14 mt-3 py-3 justify-between px-6">
          <div className="flex gap-2 cursor-pointer hover:opacity-70" onClick={() => {}}>
            <PhotoIcon /> <p>{BTNLBL_PHOTO}</p>
          </div>

          <div className="flex gap-2 cursor-pointer hover:opacity-70" onClick={() => {}}>
            <VideoIcon /> <p>{BTNLBL_VIDEO}</p>
          </div>

          <div
            className="flex gap-2 cursor-pointer hover:opacity-70"
            onClick={() => setIsLinkSectionOpen(true)}
          >
            <LinkIcon /> <p>{BTNLBL_LINK}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end px-6 border-greymedium border-t pt-3">
        <Button
          label="Post"
          additionalClassNames="text-sm"
          showArrowIcon={false}
          isDisabled={isPostButtonDisabled()}
          onClick={savePostHandler}
        />
      </div>

      <Modal
        isOpen={isLinkSectionOpen}
        onClose={() => setIsLinkSectionOpen(false)}
        isTitle={true}
        title={'Add Links'}
        additionalClassNames="py-4 px-0"
      >
        <CreatePostLinkLayout links={links} setLinks={setLinks} closeModal={setIsLinkSectionOpen} />
      </Modal>
    </>
  );
};

export default CreatePostLayout;
