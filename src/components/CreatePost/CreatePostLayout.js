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

const { BTNLBL_LINK, BTNLBL_VIDEO, BTNLBL_PHOTO, BTNLBL_SAVE } = BUTTON_LABELS;
const { POST_PATTERN } = REGEX;
const { LANG_ADD_NEW } = LANG.PAGES.CREATE_POST;

const CreatePostLayout = () => {
  const [text, setText] = useState('');
  const [media] = useState([
    {
      type: 'video',
      src: 'https://vod-progressive.akamaized.net/exp=1696004024~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4363%2F14%2F371817283%2F1544168342.mp4~hmac=cf9d2e416dd1fdf00149218c7c68a6f4f7a20f073a9f1eea0a55b3110995a1d8/vimeo-prod-skyfire-std-us/01/4363/14/371817283/1544168342.mp4',
    },
    {
      type: 'photo',
      src: 'https://images.pexels.com/photos/2245436/pexels-photo-2245436.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      type: 'photo',
      src: 'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hbGx8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
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
  const [links, setLinks] = useState(['']);

  const isPostButtonDisabled = () => {
    return !POST_PATTERN.test(text);
  };

  const isLinkButtonDisabled = () => {
    return !links.length;
  };

  const addLink = () => {
    if (links.length === 5) return;
    setLinks([...links, '']);
  };

  return (
    <>
      <div className="max-h-[515px] overflow-auto">
        <div className="relative px-6 flex flex-col gap-2">
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
        <div className="overflow-auto mb-3 px-6 flex flex-col gap-2">
          <CreatePostLinkInput links={links} setLinks={setLinks} />
          <div className="mt-5">
            <p
              className={`${
                links.length === 5
                  ? 'text-greylight cursor-not-allowed'
                  : 'text-blueprimary cursor-pointer'
              }  font-semibold text-sm text-right `}
              onClick={addLink}
            >
              {LANG_ADD_NEW}
            </p>
          </div>
        </div>
        <div className="flex justify-end px-6 border-greymedium border-t pt-3">
          <Button
            label={BTNLBL_SAVE}
            additionalClassNames="text-sm"
            showArrowIcon={false}
            isDisabled={isLinkButtonDisabled()}
          />
        </div>
      </Modal>
    </>
  );
};

export default CreatePostLayout;
