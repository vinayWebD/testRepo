import React, { useState } from 'react';
import PhotoIcon from '../Icons/PhotoIcon';
import VideoIcon from '../Icons/VideoIcon';
import LinkIcon from '../Icons/LinkIcon';
import { Button } from '../common/Button';
import { BUTTON_LABELS } from '../../constants/lang';
import CreatePostTextInput from './CreatePostTextInput';
import { REGEX } from '../../constants/constants';

const { BTNLBL_LINK, BTNLBL_VIDEO, BTNLBL_PHOTO } = BUTTON_LABELS;
const { POST_PATTERN } = REGEX;

const CreatePostLayout = () => {
  const [postType, setPostType] = useState('text');
  const [text, setText] = useState('');

  const postForm = () => {
    if (postType === 'text') {
      return <CreatePostTextInput updateTextValue={(val) => setText(val)} />;
    }
  };

  const isPostButtonDisabled = () => {
    return !POST_PATTERN.test(text);
  };

  return (
    <>
      <div className="relative px-6">{postForm()}</div>
      <div className="flex gap-14 mt-3 pt-3 pb-6 justify-between border-greymedium border-b px-6">
        <div
          className="flex gap-2 cursor-pointer hover:opacity-70"
          onClick={() => setPostType('photo')}
        >
          <PhotoIcon /> <p>{BTNLBL_PHOTO}</p>
        </div>

        <div
          className="flex gap-2 cursor-pointer hover:opacity-70"
          onClick={() => setPostType('video')}
        >
          <VideoIcon /> <p>{BTNLBL_VIDEO}</p>
        </div>

        <div
          className="flex gap-2 cursor-pointer hover:opacity-70"
          onClick={() => setPostType('link')}
        >
          <LinkIcon /> <p>{BTNLBL_LINK}</p>
        </div>
      </div>
      <div className="flex justify-end mt-4 px-6">
        <Button
          label="Post"
          additionalClassNames="text-sm"
          showArrowIcon={false}
          isDisabled={isPostButtonDisabled()}
        />
      </div>
    </>
  );
};

export default CreatePostLayout;
