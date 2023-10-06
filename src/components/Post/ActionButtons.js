import React, { useState } from 'react';
import CommentIcon from '../Icons/CommentIcon';
import ShareIcon from '../Icons/ShareIcon';
import LikeEmptyIcon from '../Icons/LikeEmptyIcon';
import LikeFilledIcon from '../Icons/LikeFilledIcon';
import CommentInput from './CommentInput';

const ActionButtons = ({
  isLikedByMe = false,
  commentCount = 0,
  shareCount = 0,
  likeCount = 0,
}) => {
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);

  const commentClickHandler = () => {
    setIsCommentSectionOpen(true);
  };

  return (
    <>
      <div className="flex w-full mt-7 gap-[10%]">
        <div className="flex gap-1 justify-center items-center cursor-pointer hover:opacity-70">
          {isLikedByMe ? <LikeFilledIcon /> : <LikeEmptyIcon />}
          <p className="text-16 font-bold text-greylight">
            {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
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
