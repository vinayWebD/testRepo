import React, { useEffect, useRef, useState } from 'react';
import PhotoIcon from '../Icons/PhotoIcon';
import VideoIcon from '../Icons/VideoIcon';
import LinkIcon from '../Icons/LinkIcon';
import { BUTTON_LABELS, LANG } from '../../constants/lang';
import { LIMITS, POST_IMAGE_TYPES, REGEX } from '../../constants/constants';
import MediaLayout from '../MediaLayout';
import Modal from '../Modal';
import EmojiTextarea from '../common/EmojieTextarea';
import { createPost } from '../../services/feed';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError, ToastNotifySuccess } from '../Toast/ToastNotify';
import { TOASTMESSAGES } from '../../constants/messages';
import CreatePostLinkLayout from './CreatePostLinkLayout';
import compressImage from '../../utils/compressImage';
import { fetchFileUPloadAWS, fetchGenratePreSignedUrl } from '../../services/signup';
import { getFileExtension } from '../../utils/helper';
import OutlinedButton from '../common/OutlinedButton';

const { BTNLBL_LINK, BTNLBL_VIDEO, BTNLBL_PHOTO } = BUTTON_LABELS;
const { POST_PATTERN } = REGEX;
const { LANG_TEXT_AREA_PLACEHOLDER } = LANG.PAGES.CREATE_POST;
const {
  successToast: { TST_POST_CREATED_SUCCESSFULLY = '' },
  toastid: { TST_POST_CREATED_SUCCESS_ID, TST_POST_CREATED_FAILED_ID },
} = TOASTMESSAGES;

const { POST_MAX_IMAGE_SIZE_IN_BYTES } = LIMITS;

const CreatePostLayout = ({ closePopupHandler = () => {} }) => {
  const [text, setText] = useState('');
  const [media, setMedia] = useState([]);
  const [isLinkSectionOpen, setIsLinkSectionOpen] = useState(false);
  const [links, setLinks] = useState([]);
  const [openFileBrowser, setOpenFileBrowser] = useState(0);
  const [openForcedPreview, setOpenForcedPreview] = useState(false);
  const mediaInput = useRef(null);

  useEffect(() => {
    if (openFileBrowser) {
      mediaInput?.current?.click();
    }
  }, [openFileBrowser]);

  const isPostButtonDisabled = () => {
    return !POST_PATTERN.test(text);
  };

  /**
   * This function will validate the media, check if they can be uploaded
   * and then call the function that will upload the valid files to AWS
   */
  const uploadMedia = async () => {
    const filesToUpload = [],
      failedFiles = [];
    for (let i = 0; i < mediaInput?.current?.files?.length; i++) {
      const currentFile = mediaInput?.current?.files[i];

      if (
        currentFile?.type?.includes('image/') &&
        currentFile?.size > POST_MAX_IMAGE_SIZE_IN_BYTES
      ) {
        failedFiles.push(mediaInput?.current?.files[i]);
      } else if (
        currentFile?.type?.includes('image/') &&
        currentFile?.size <= POST_MAX_IMAGE_SIZE_IN_BYTES
      ) {
        const compressedImage = await compressImage({
          file: mediaInput?.current?.files[i],
        });
        filesToUpload.push(compressedImage);
      } else {
        filesToUpload.push(mediaInput?.current?.files[i]);
      }
    }

    if (failedFiles.length) {
      console.log('----error in failed');
    }

    // Upload the files on AWS
    await uploadFilesOnAWS(filesToUpload);
  };

  /**
   * This function shall upload all the files to AWS
   * @param {*} filesToUpload
   */
  const uploadFilesOnAWS = async (filesToUpload) => {
    const uploadedMedia = [...media];

    if (filesToUpload?.length) {
      for (let i = 0; i < filesToUpload.length; i++) {
        const uploadData = new FormData();
        const file = filesToUpload[i];
        const response = await fetchGenratePreSignedUrl(getFileExtension(file?.name));
        const { status = 0, data = {} } = response;
        if (successStatus(status)) {
          const { fields: { key, AWSAccessKeyId, policy, signature } = {}, url } = data;
          uploadData.append('key', key);
          uploadData.append('AWSAccessKeyId', AWSAccessKeyId);
          uploadData.append('policy', policy);
          uploadData.append('signature', signature);
          uploadData.append('file', file);
          await fetchFileUPloadAWS({ url, dataTosend: uploadData });
          uploadedMedia.push({ path: key, url: URL.createObjectURL(file) });
        }
      }
      setMedia([...uploadedMedia]);
      setOpenForcedPreview(true);
    }
  };

  /**
   * This function opens the file browser so that user can choose images and videos to upload
   * @param {*} type
   */
  const handleFileBrowser = (type) => {
    if (type === 'photo') {
      setOpenFileBrowser((prev) => prev + 1);
    }
  };

  /**
   * Function that calls the create post API
   */
  const savePostHandler = async () => {
    const response = await createPost({ caption: text, links, media });

    const { status, data } = response;
    const errormsg = getErrorMessage(data);
    if (successStatus(status)) {
      ToastNotifySuccess(TST_POST_CREATED_SUCCESSFULLY, TST_POST_CREATED_SUCCESS_ID);
      closePopupHandler();
    } else {
      if (errormsg) {
        ToastNotifyError(errormsg, TST_POST_CREATED_FAILED_ID);
      }
    }
  };

  return (
    <>
      <div className="max-h-[70vh] overflow-y-auto">
        <div className="relative px-[18px] flex flex-col gap-2">
          <EmojiTextarea
            placeholder={LANG_TEXT_AREA_PLACEHOLDER}
            value={text}
            handleChange={(val) => setText(val)}
          />
          {media.length ? (
            <MediaLayout media={media} forcedPreview={openForcedPreview} updateMedia={setMedia} />
          ) : (
            ''
          )}
        </div>
        <div className="flex gap-14 mt-3 py-3 justify-between px-6">
          <div
            className="flex gap-2 cursor-pointer hover:opacity-70"
            onClick={() => handleFileBrowser('photo')}
          >
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
      <div className="flex justify-end px-6 border-greymedium border-t pt-5">
        <OutlinedButton
          label={'Post'}
          disabled={isPostButtonDisabled()}
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
        <CreatePostLinkLayout
          links={links}
          setLinks={setLinks}
          closePopupHandler={() => setIsLinkSectionOpen(false)}
        />
      </Modal>

      {/* The below input field is for opening the Media Files Browser in the user's system */}
      <input
        ref={mediaInput}
        type="file"
        multiple={true}
        onInput={() => uploadMedia()}
        onClick={(e) => {
          e.target.value = null;
        }} // We are setting this to null because we want to be able to select the same file simultaneously
        className="contents w-0 h-0 "
        accept={POST_IMAGE_TYPES}
      />
    </>
  );
};

export default CreatePostLayout;
