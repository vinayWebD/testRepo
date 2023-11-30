import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../common/Avatar';
import EmojiTextarea from '../common/EmojieTextarea';
import Header from '../Post/Header';
import MediaLayout from '../MediaLayout';
import CaptionLinkContainer from '../Post/CaptionLinkContainer';
import { Button } from '../common/Button';
import { repostDispatcher } from '../../redux/dispatchers/feedDispatcher';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError, ToastNotifySuccess } from '../Toast/ToastNotify';

const RepostLayout = ({ post = {}, closePopup = () => {}, reloadData = () => {} }) => {
  const userData = useSelector((state) => state?.auth?.user) || {};
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const repostHandler = async () => {
    if (!isLoading) {
      setIsLoading(true);
      const { status, data } = await dispatch(
        repostDispatcher({ postId: post?.parentPostId || post?.id, caption: text }),
      );

      if (!successStatus(status)) {
        const errormsg = getErrorMessage(data);
        if (errormsg) {
          ToastNotifyError(errormsg);
        }
      } else {
        ToastNotifySuccess('Post reposted successfully!');
        closePopup();
        await reloadData();
      }
    }
  };

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
              parentPostId: post?.parentPostId,
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
          onClick={() => repostHandler()}
          showArrowIcon={false}
          isLoading={isLoading}
          onlyShowLoaderWhenLoading={true}
        />
      </div>
    </>
  );
};

export default RepostLayout;
