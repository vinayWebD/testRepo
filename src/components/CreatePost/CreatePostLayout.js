import React, { useEffect, useRef, useState } from 'react';
import PhotoIcon from '../Icons/PhotoIcon';
import VideoIcon from '../Icons/VideoIcon';
import LinkIcon from '../Icons/LinkIcon';
import { BUTTON_LABELS, LANG } from '../../constants/lang';
import { LIMITS, POST_IMAGE_TYPES, POST_VIDEO_TYPES, REGEX } from '../../constants/constants';
import MediaLayout from '../MediaLayout';
import EmojiTextarea from '../common/EmojieTextarea';
import { createPost } from '../../services/feed';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError, ToastNotifySuccess } from '../Toast/ToastNotify';
import { TOASTMESSAGES } from '../../constants/messages';
import CreatePostLinkLayout from './CreatePostLinkLayout';
import compressImage from '../../utils/compressImage';
import { fetchFileUPloadAWS, fetchGenratePreSignedUrl } from '../../services/signup';
import { getFileExtension } from '../../utils/helper';
import Loader from '../common/Loader';
import { Button } from '../common/Button';

const { BTNLBL_LINK, BTNLBL_VIDEO, BTNLBL_PHOTO } = BUTTON_LABELS;
const { POST_PATTERN, LINK_PATTERN } = REGEX;
const { LANG_TEXT_AREA_PLACEHOLDER } = LANG.PAGES.CREATE_POST;
const {
  successToast: { TST_POST_CREATED_SUCCESSFULLY = '' },
  errorToast: {
    TST_POST_UPLOAD_INVALID_MEDIA = '',
    TST_POST_MAX_ALLOWED_MEDIA = '',
    TST_INVALID_LINKS = '',
  },
  toastid: {
    TST_POST_CREATED_SUCCESS_ID,
    TST_POST_CREATED_FAILED_ID,
    TST_POST_UPLOAD_MEDIA_VALIDATION_FAILED_ID,
    TST_LINK_VALIDATION_FAILED_ID,
  },
} = TOASTMESSAGES;

const { POST_MAX_IMAGE_SIZE_IN_BYTES, POST_MAX_VIDEO_SIZE_IN_BYTES, POST_MAX_ALLOWED_MEDIA } =
  LIMITS;

const CreatePostLayout = ({
  closePopupHandler = () => {},
  openTypeOfPost = null,
  reloadData = () => {},
}) => {
  const [text, setText] = useState('');
  const [media, setMedia] = useState([]);
  const [isInputLinkOpen, setIsInputLinkOpen] = useState(false);
  const [links, setLinks] = useState([]);
  const [linkInInput, setLinkInInput] = useState('');
  const [openFileBrowser, setOpenFileBrowser] = useState(0);
  const [openForcedPreview, setOpenForcedPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaTypeToUpload, setMediaTypeToUpload] = useState('photo');
  const mediaInput = useRef(null);

  useEffect(() => {
    if (openFileBrowser) {
      mediaInput?.current?.click();
    }
  }, [openFileBrowser]);

  useEffect(() => {
    if (openTypeOfPost) {
      if (['photo', 'video'].includes(openTypeOfPost)) {
        handleFileBrowser(openTypeOfPost);
      } else if (openTypeOfPost === 'link') {
        setIsInputLinkOpen(true);
      }
    }
  }, [openTypeOfPost]);

  const isPostButtonDisabled = () => {
    let link = !['', null, undefined].includes(linkInInput) ? linkInInput : undefined;
    let allLinks = [link, ...links];
    return !POST_PATTERN.test(text) && !media?.length && !allLinks.length;
  };

  /**
   * This function will validate the media, check if they can be uploaded
   * and then call the function that will upload the valid files to AWS
   */
  const uploadMedia = async () => {
    const filesToUpload = [],
      failedFiles = [];

    if (mediaInput?.current?.files?.length + media.length > POST_MAX_ALLOWED_MEDIA) {
      ToastNotifyError(TST_POST_MAX_ALLOWED_MEDIA, TST_POST_UPLOAD_MEDIA_VALIDATION_FAILED_ID);
    }

    for (let i = 0; i < mediaInput?.current?.files?.length; i++) {
      if (i < POST_MAX_ALLOWED_MEDIA) {
        const currentFile = mediaInput?.current?.files[i];

        if (currentFile?.type?.includes('image/')) {
          // If image if greater than POST_MAX_IMAGE_SIZE_IN_BYTES, then this shall not be uploaded
          if (currentFile?.size > POST_MAX_IMAGE_SIZE_IN_BYTES) {
            failedFiles.push(mediaInput?.current?.files[i]);
          } else {
            const compressedImage = await compressImage({
              file: mediaInput?.current?.files[i],
            });
            filesToUpload.push(compressedImage);
          }
        } else if (currentFile?.type?.includes('video/')) {
          // If video if greater than POST_MAX_VIDEO_SIZE_IN_BYTES, then this shall not be uploaded
          if (currentFile?.size > POST_MAX_VIDEO_SIZE_IN_BYTES) {
            failedFiles.push(mediaInput?.current?.files[i]);
          } else {
            filesToUpload.push(mediaInput?.current?.files[i]);
          }
        }
      }
    }

    if (failedFiles.length) {
      ToastNotifyError(TST_POST_UPLOAD_INVALID_MEDIA, TST_POST_UPLOAD_MEDIA_VALIDATION_FAILED_ID);
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
      setIsLoading(true);
      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i];
        const response = await fetchGenratePreSignedUrl(getFileExtension(file?.name), 'post');
        const { status = 0, data = {} } = response;
        if (successStatus(status)) {
          const { key, url } = data?.data || {};
          try {
            await fetchFileUPloadAWS({ url, selectedFile: file });
            uploadedMedia.push({ key: URL.createObjectURL(file), path: key });
          } catch (error) {
            ToastNotifyError('Upload failed for a file');
          }
        }
      }
      setMedia([...uploadedMedia]);
      setIsLoading(false);
      setOpenForcedPreview(true);
    }
  };

  /**
   * This function opens the file browser so that user can choose images and videos to upload
   * @param {*} type
   */
  const handleFileBrowser = (type) => {
    if (media.length < POST_MAX_ALLOWED_MEDIA) {
      if (type === 'photo') {
        setMediaTypeToUpload('photo');
      } else if (type === 'video') {
        setMediaTypeToUpload('video');
      }
      setOpenFileBrowser((prev) => prev + 1);
    }
  };

  /**
   * Function that calls the create post API
   */
  const savePostHandler = async () => {
    setIsLoading(true);

    let link = !['', null, undefined].includes(linkInInput) ? linkInInput : undefined;
    let allLinks = [...links];

    // If there is anything typed in the input box and the plus button is not clicked, so we need to check
    // if there is some value in it and if it's valid
    if (link) {
      if (!link.startsWith('https://')) {
        link = `https://${link}`;
      }

      if (!LINK_PATTERN.test(link)) {
        ToastNotifyError(TST_INVALID_LINKS, TST_LINK_VALIDATION_FAILED_ID);
        setIsLoading(false);
        return false;
      } else {
        allLinks = [link, ...allLinks];
      }
    }

    const response = await createPost({ caption: text, links: allLinks, media });

    const { status, data } = response;
    const errormsg = getErrorMessage(data);
    setIsLoading(false);
    if (successStatus(status)) {
      ToastNotifySuccess(TST_POST_CREATED_SUCCESSFULLY, TST_POST_CREATED_SUCCESS_ID);
      closePopupHandler();
      await reloadData(1);
    } else {
      if (errormsg) {
        ToastNotifyError(errormsg, TST_POST_CREATED_FAILED_ID);
      }
    }
  };

  return (
    <div className="relative">
      <div className="h-[83dvh] max-h-[83dvh] md:h-auto md:max-h-[70vh] overflow-y-auto">
        <div className="relative px-[18px] flex flex-col gap-2">
          <EmojiTextarea
            placeholder={LANG_TEXT_AREA_PLACEHOLDER}
            value={text}
            handleChange={(val) => setText(val)}
          />

          {isInputLinkOpen ? (
            <CreatePostLinkLayout
              links={links}
              setLinks={setLinks}
              linkInInput={linkInInput}
              setLinkInInput={setLinkInInput}
              isInputLinkOpen={isInputLinkOpen}
            />
          ) : (
            ''
          )}

          {media.length ? (
            <div
              className={`${media.length > 1 ? 'border border-greymedium' : ''}  rounded-lg p-2`}
            >
              <MediaLayout
                media={media}
                forcedPreview={openForcedPreview}
                updateMedia={setMedia}
                allowOnlyView={false}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="flex gap-3 flex-col mt-3 py-3 justify-between px-6">
          <div className="flex md:gap-14 justify-between w-full">
            <div
              className={`flex gap-2 hover:opacity-70 ${
                media?.length < POST_MAX_ALLOWED_MEDIA
                  ? 'cursor-pointer'
                  : 'cursor-not-allowed text-greylight'
              }`}
              onClick={() => handleFileBrowser('photo')}
            >
              <PhotoIcon /> <p>{BTNLBL_PHOTO}</p>
            </div>

            <div
              className={`flex gap-2 hover:opacity-70 ${
                media?.length < POST_MAX_ALLOWED_MEDIA
                  ? 'cursor-pointer'
                  : 'cursor-not-allowed text-greylight'
              }`}
              onClick={() => handleFileBrowser('video')}
            >
              <VideoIcon /> <p>{BTNLBL_VIDEO}</p>
            </div>

            <div
              className="flex gap-2 cursor-pointer hover:opacity-70"
              onClick={() => setIsInputLinkOpen(true)}
            >
              <LinkIcon /> <p>{BTNLBL_LINK}</p>
            </div>
          </div>

          <p className="text-xs text-greylight pb-2 w-full">
            Click the button to browse (Max allowed each photo of{' '}
            {POST_MAX_IMAGE_SIZE_IN_BYTES / (1024 * 1024)} MB and video of{' '}
            {POST_MAX_VIDEO_SIZE_IN_BYTES / (1024 * 1024)} MB)
          </p>
        </div>
      </div>
      <div className="flex justify-end px-[18px] border-greymedium border-t pt-5">
        <Button
          label={'Post'}
          isDisabled={isPostButtonDisabled()}
          onClick={savePostHandler}
          showArrowIcon={false}
        />
      </div>

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
        accept={mediaTypeToUpload === 'photo' ? POST_IMAGE_TYPES : POST_VIDEO_TYPES}
      />

      {isLoading ? <Loader /> : ''}
    </div>
  );
};

export default CreatePostLayout;
