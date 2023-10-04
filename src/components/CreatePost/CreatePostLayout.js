import React, { useEffect, useRef, useState } from 'react';
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
import compressImage from '../../utils/compressImage';
import { fetchFileUPloadAWS, fetchGenratePreSignedUrl } from '../../services/signup';
import { getFileExtension } from '../../utils/helper';

const { BTNLBL_LINK, BTNLBL_VIDEO, BTNLBL_PHOTO } = BUTTON_LABELS;
const { POST_PATTERN } = REGEX;
const { LANG_TEXT_AREA_PLACEHOLDER } = LANG.PAGES.CREATE_POST;
const {
  successToast: { TST_POST_CREATED_SUCCESSFULLY = '' },
  toastid: { TST_POST_CREATED_SUCCESS_ID, TST_POST_CREATED_FAILED_ID },
} = TOASTMESSAGES;

const CreatePostLayout = ({ closePopupHandler = () => {} }) => {
  const [text, setText] = useState('');
  const [media, setMedia] = useState([
    {
      path: 'https://purdriven-dev-media.s3.amazonaws.com/temp/ayushidangay05.2/2023-10-04/file-9774a559-658d-4fc6-82da-2600da91ca90.jpg?AWSAccessKeyId=AKIAY6JWCPDSWD6T3C5V&Signature=Vmoe%2FYEIhrTrltTMFjODvGB%2FYEg%3D&Expires=1696409162',
      type: 'photo',
    },
  ]);
  const [isLinkSectionOpen, setIsLinkSectionOpen] = useState(false);
  const [links, setLinks] = useState(['']);
  const [openFileBrowser, setOpenFileBrowser] = useState(0);
  const mediaInput = useRef(null);

  useEffect(() => {
    if (openFileBrowser) {
      mediaInput?.current?.click();
    }
  }, [openFileBrowser]);

  const isPostButtonDisabled = () => {
    return !POST_PATTERN.test(text);
  };

  const uploadMedia = async () => {
    const filesToUpload = [],
      failedFiles = [];
    for (let i = 0; i < mediaInput?.current?.files?.length; i++) {
      const currentFile = mediaInput?.current?.files[i];
      console.log('---->>> first', currentFile.size);
      if (currentFile?.type?.includes('image/') && currentFile?.size > 1e7) {
        failedFiles.push(mediaInput?.current?.files[i]);
      } else if (currentFile?.type?.includes('image/') && currentFile?.size <= 1e7) {
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
    await getPreSignedUrl(filesToUpload);
  };

  const getPreSignedUrl = async (filesToUpload) => {
    const uploadData = new FormData();
    if (filesToUpload?.length) {
      for (let i = 0; i < filesToUpload.length; i++) {
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
          await fetchFileUPloadAWS({ url: url, dataTosend: uploadData });
          setMedia([...media, { path: key }]);
        }
      }
    }
  };

  const handleFileBrowser = (type) => {
    if (type === 'photo') {
      setOpenFileBrowser((prev) => prev + 1);
    }
  };

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
        <CreatePostLinkLayout
          links={links}
          setLinks={setLinks}
          closePopupHandler={() => setIsLinkSectionOpen(false)}
        />
      </Modal>

      {/* The below input field is for opening the Media Files Browser in the user's system */}
      <input
        ref={mediaInput}
        // disabled={maxNumberOfFiles !== undefined && numberOfUploads >= maxNumberOfFiles}
        type="file"
        multiple={true}
        onInput={() => uploadMedia()}
        onClick={(e) => {
          e.target.value = null;
        }} // We are setting this to null because we want to be able to select the same file simultaneously
        // style={{ visibility: 'hidden', width: 0, height: 0 }}
        className="contents w-0 h-0 "
        accept={['image/heif', 'image/heic', 'image/png', 'image/jpeg', 'image/png', 'image/gif']}
      />
    </>
  );
};

export default CreatePostLayout;
