import React, { useEffect, useState } from 'react';
import CommentIcon from '../Icons/CommentIcon';
import ShareIcon from '../Icons/ShareIcon';
import LikeEmptyIcon from '../Icons/LikeEmptyIcon';
import LikeFilledIcon from '../Icons/LikeFilledIcon';
import CommentInput from './CommentInput';
import { likePost, unlikePost } from '../../services/feed';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../Toast/ToastNotify';

const ActionButtons = ({
  isLikedByMe = false,
  commentCount = 0,
  shareCount = 0,
  likeCount = 0,
  className = 'gap-[10%]',
  isCommentSectionOpenDefault = false,
  postId = '',
  reloadPostDetails = () => {},
}) => {
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(isCommentSectionOpenDefault);
  const [_isLikedByMe, _setIsLikedByMe] = useState(isLikedByMe);
  const [_likeCount, _setIsLikeCount] = useState(likeCount);

  useEffect(() => {
    _setIsLikeCount(likeCount);
    _setIsLikedByMe(isLikedByMe);
  }, [likeCount, isLikedByMe]);

  const commentClickHandler = () => {
    setIsCommentSectionOpen(true);
  };

  const likeOrUnlikeClickHandler = async () => {
    let response = {};
    _setIsLikedByMe((prev) => !prev);

    if (_isLikedByMe) {
      _setIsLikeCount((prev) => prev - 1);
    } else {
      _setIsLikeCount((prev) => prev + 1);
    }

    if (isLikedByMe) {
      response = await unlikePost({ postId });
    } else {
      response = await likePost({ postId });
    }

    const { status, data } = response;
    const errormsg = getErrorMessage(data);
    if (!successStatus(status) && errormsg) {
      ToastNotifyError(errormsg, 'like-unlike-post-failed');
    } else {
      await reloadPostDetails({ postId });
    }
  };

  return (
    <>
      <div className={`flex w-full mt-7 ${className}`}>
        <div
          className="flex gap-1 justify-center items-center cursor-pointer hover:opacity-70"
          onClick={likeOrUnlikeClickHandler}
        >
          {_isLikedByMe ? <LikeFilledIcon /> : <LikeEmptyIcon />}
          <p className="text-16 font-bold text-greylight">
            {_likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
          </p>
        </div>

        <div
          className="flex gap-1 justify-center items-center cursor-pointer hover:opacity-70"
          onClick={commentClickHandler}
        >
          <CommentIcon />
          <p className="text-16 text-greylight">
            {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
          </p>
        </div>

        <div className="flex gap-1 justify-center items-center cursor-pointer hover:opacity-70">
          <ShareIcon />
          <p className="text-16 text-greylight">
            {shareCount} {shareCount === 1 ? 'Share' : 'Shares'}
          </p>
        </div>
      </div>

      {isCommentSectionOpen ? (
        <div className="mt-7">
          <CommentInput />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default ActionButtons;
