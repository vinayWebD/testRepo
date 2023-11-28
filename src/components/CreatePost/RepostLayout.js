import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../common/Avatar';
import EmojiTextarea from '../common/EmojieTextarea';
import Header from '../Post/Header';
import MediaLayout from '../MediaLayout';
import CaptionLinkContainer from '../Post/CaptionLinkContainer';
import { Button } from '../common/Button';

const RepostLayout = ({ post = {} }) => {
  const userData = useSelector((state) => state?.auth?.user) || {};
  const [text, setText] = useState('');

  return (
    <>
      <div className="px-[18px] modal-internal h-[75dvh] max-h-[75dvh] md:h-auto md:max-h-[70vh] overflow-y-auto">
        <div className="flex gap-2">
          <Avatar
            name={`${userData?.firstName} ${userData?.lastName}`}
            image={userData?.profilePictureUrl}
            classNames="w-[50px] h-[50px]"
          />
          <div className="w-full">
            <EmojiTextarea
              placeholder={'Share your thoughts...'}
              value={text}
              handleChange={(val) => setText(val)}
              textareaClassNames="text-[14px]"
              textareaHeightClass="h-[80px]"
            />
          </div>
        </div>
        <div className="border border-greylighter rounded-lg px-3 py-4 mt-7">
          <Header
            createdAt={post?.createdAt}
            creatorName={`${post?.User?.firstName} ${post?.User?.lastName}`}
            creatorProfilePicUrl={post?.User?.profilePictureUrl}
            isCreatedByMe={post?.UserId === userData?.id}
            postId={post?.postId}
            postDetails={{
              caption: post?.caption,
              media: post?.media,
              links: post?.links,
              id: post?.id,
            }}
            userId={post?.UserId}
            isFollowed={post?.isFollowed}
            showThreeDots={false}
          />
          <CaptionLinkContainer caption={post?.caption} links={post?.links} />
          <div className="mt-3">
            <MediaLayout media={post?.postMedia} allowOnlyView={false} origin="feed" />
          </div>
        </div>
      </div>
      <div className="flex justify-end px-[18px] pt-5">
        <Button
          label={'Repost'}
          // isDisabled={isPostButtonDisabled()}
          onClick={() => {}}
          showArrowIcon={false}
        />
      </div>
    </>
  );
};

export default RepostLayout;
