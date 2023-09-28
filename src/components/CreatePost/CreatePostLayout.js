import React, { useState } from 'react';
import PhotoIcon from '../Icons/PhotoIcon';
import VideoIcon from '../Icons/VideoIcon';
import LinkIcon from '../Icons/LinkIcon';
import { Button } from '../common/Button';
import { BUTTON_LABELS, LANG } from '../../constants/lang';
import CreatePostTextInput from './CreatePostTextInput';
import { REGEX } from '../../constants/constants';
import MediaLayout from '../MediaLayout';
import Modal from '../Modal';
import CreatePostLinkInput from './CreatePostLinkInput';

const { BTNLBL_LINK, BTNLBL_VIDEO, BTNLBL_PHOTO } = BUTTON_LABELS;
const { POST_PATTERN } = REGEX;
const { LANG_ADD_NEW } = LANG.PAGES.CREATE_POST;

const CreatePostLayout = () => {
  const [text, setText] = useState('');
  const [media] = useState([
    {
      type: 'video',
      src: 'https://vod-progressive.akamaized.net/exp=1695899167~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4363%2F14%2F371817283%2F1544168342.mp4~hmac=63d4e1f3c0f20957f0b7264c9ec8aa5cbcbb8b239e4224b18d3462f473dfe115/vimeo-prod-skyfire-std-us/01/4363/14/371817283/1544168342.mp4',
    },
    {
      type: 'photo',
      src: 'https://images.pexels.com/photos/2245436/pexels-photo-2245436.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      type: 'photo',
      src: 'https://images.pexels.com/photos/2245436/pexels-photo-2245436.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      type: 'photo',
      src: 'https://images.pexels.com/photos/2245436/pexels-photo-2245436.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      type: 'photo',
      src: 'https://images.pexels.com/photos/2245436/pexels-photo-2245436.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      type: 'photo',
      src: 'https://images.pexels.com/photos/2245436/pexels-photo-2245436.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ]);
  const [isLinkSectionOpen, setIsLinkSectionOpen] = useState(false);

  const isPostButtonDisabled = () => {
    return !POST_PATTERN.test(text);
  };

  return (
    <>
      <div className="max-h-[515px] overflow-auto">
        <div className="relative px-6">
          <CreatePostTextInput updateTextValue={(val) => setText(val)} />
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
        />
      </div>

      <Modal
        isOpen={isLinkSectionOpen}
        onClose={() => setIsLinkSectionOpen(false)}
        isTitle={true}
        title={'Add Links'}
        additionalClassNames="py-4 px-0"
      >
        <div className="overflow-auto mb-3 px-6">
          <CreatePostLinkInput />
          <div className="mt-5">
            <p className="text-blueprimary font-semibold text-sm text-right cursor-pointer">
              {LANG_ADD_NEW}
            </p>
          </div>
        </div>
        <div className="flex justify-end px-6 border-greymedium border-t pt-3">
          <Button
            label="Save"
            additionalClassNames="text-sm"
            showArrowIcon={false}
            isDisabled={isPostButtonDisabled()}
          />
        </div>
      </Modal>
    </>
  );
};

export default CreatePostLayout;
