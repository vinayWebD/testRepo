import React, { useEffect, useState } from 'react';
import CommentIcon from '../Icons/CommentIcon';
import ShareIcon from '../Icons/ShareIcon';
import LikeEmptyIcon from '../Icons/LikeEmptyIcon';
import LikeFilledIcon from '../Icons/LikeFilledIcon';
import CommentInput from './CommentInput';
import { likePost, unlikePost } from '../../services/feed';
import { successStatus } from '../../common';
import CommentLayout from './CommentLayout';
import DownCaret from '../Icons/DownCaret';

const ActionButtons = ({
  isLikedByMe = false,
  commentCount = 0,
  shareCount = 0,
  likeCount = 0,
  className = 'md:gap-[10%]',
  isCommentSectionOpenDefault = false,
  postId = '',
  reloadPostDetails = () => {},
}) => {
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(isCommentSectionOpenDefault);
  const [_isLikedByMe, _setIsLikedByMe] = useState(isLikedByMe);
  const [_likeCount, _setIsLikeCount] = useState(likeCount);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

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
      _setIsLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
      response = await unlikePost({ postId, type: 0 });
    } else {
      setIsAnimating(true); // Trigger the animation
      _setIsLikeCount((prev) => prev + 1);
      response = await likePost({ postId, type: 1 });
    }

    const { status } = response;
    if (successStatus(status)) {
      await reloadPostDetails({ postId });
    }
  };

  return (
    <>
      <div className={`flex w-full mb-2 mt-7 select-none ${className}`}>
        <div
          className={`flex gap-1 justify-center items-center cursor-pointer hover:opacity-70 ${
            isAnimating ? 'scale-bounce' : ''
          }`}
          onClick={likeOrUnlikeClickHandler}
        >
          {_isLikedByMe ? <LikeFilledIcon /> : <LikeEmptyIcon />}
          <p className={`text16 text-greylight ${_isLikedByMe ? 'font-bold' : ''}`}>
            {_likeCount || undefined} {_likeCount <= 1 ? 'Like' : 'Likes'}
          </p>
        </div>

        <div
          className="flex gap-1 justify-center items-center cursor-pointer hover:opacity-70"
          onClick={commentClickHandler}
        >
          <CommentIcon />
          <p className="text16 text-greylight">
            {commentCount || undefined} {commentCount <= 1 ? 'Comment' : 'Comments'}
          </p>
        </div>

        <div className="flex gap-1 justify-center items-center cursor-pointer hover:opacity-70">
          <ShareIcon />
          <p className="text16 text-greylight">
            {shareCount || undefined} {shareCount <= 1 ? 'Share' : 'Shares'}
          </p>
        </div>
      </div>

      {isCommentSectionOpen ? (
        <>
          <div className="mt-7">
            <CommentInput />
          </div>
          <div className="mt-3">
            <CommentLayout />
            <CommentLayout />

            <div className="flex gap-1 mt-3 cursor-pointer hover:opacity-70">
              <p className="text14 text-greydark">Load more comments</p>{' '}
              <DownCaret fill="#A1A0A0" />
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default ActionButtons;
