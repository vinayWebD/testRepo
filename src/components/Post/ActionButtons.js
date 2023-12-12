import React, { useEffect, useState } from 'react';
import CommentIcon from '../Icons/CommentIcon';
import ShareIcon from '../Icons/ShareIcon';
import LikeEmptyIcon from '../Icons/LikeEmptyIcon';
import LikeFilledIcon from '../Icons/LikeFilledIcon';
import CommentInput from './CommentInput';
import { getComments, likePost } from '../../services/feed';
import { getErrorMessage, successStatus } from '../../common';
import CommentLayout from './CommentLayout';
import DownCaret from '../Icons/DownCaret';
import CommentSkeleton from '../common/CommentSkeleton';
import { PAGE_SIZE } from '../../constants/constants';
import { ToastNotifyError } from '../Toast/ToastNotify';
import Modal from '../Modal';
import RepostLayout from '../CreatePost/RepostLayout';

const ActionButtons = ({
  isLikedByMe = false,
  commentCount = 0,
  shareCount = 0,
  likeCount = 0,
  className = 'md:gap-[10%]',
  isCommentSectionOpenDefault = false,
  postId = '',
  reloadPostDetails = () => {},
  completePostData = {}, // Using currently for reposting UI
  reloadData = () => {},
}) => {
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(isCommentSectionOpenDefault);
  const [_isLikedByMe, _setIsLikedByMe] = useState(isLikedByMe);
  const [_likeCount, _setIsLikeCount] = useState(likeCount);
  const [isAnimating, setIsAnimating] = useState(false);
  const [commentsPage, setCommentsPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isRepostModalOpen, setIsRepostModalOpen] = useState(false);

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

  useEffect(() => {
    if (isCommentSectionOpen) {
      fetchComments();
    }
  }, [isCommentSectionOpen, commentsPage, postId]);

  const commentClickHandler = () => {
    setIsCommentSectionOpen(true);
  };

  const likeOrUnlikeClickHandler = async () => {
    let response = {};
    _setIsLikedByMe((prev) => !prev);

    if (_isLikedByMe) {
      _setIsLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
      response = await likePost({ postId, type: 0 });
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

  const fetchComments = async (page = commentsPage) => {
    if (postId) {
      setIsCommentLoading(true);
      const { status, data } = await getComments({ postId, page });
      if (successStatus(status)) {
        if (page === 1) {
          setComments(data?.data);
        } else {
          setComments((prevData) => [...prevData, ...data.data]);
        }
      } else {
        const errormsg = getErrorMessage(data);
        if (errormsg) {
          ToastNotifyError(errormsg);
        }
      }
      setIsCommentLoading(false);
    }
  };

  const reloadCommentWithPostDetails = async (postId) => {
    setCommentsPage(1);
    await fetchComments(1);
    await reloadPostDetails({ postId });
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

        <div
          className="flex gap-1 justify-center items-center cursor-pointer hover:opacity-70"
          onClick={() => setIsRepostModalOpen(true)}
        >
          <ShareIcon />
          <p className="text16 text-greylight">
            {shareCount || undefined} {shareCount <= 1 ? 'Share' : 'Shares'}
          </p>
        </div>
      </div>

      {isCommentSectionOpen ? (
        <>
          <div className="mt-7">
            <CommentInput postId={postId} reloadPostDetails={reloadCommentWithPostDetails} />
          </div>
          <div className="mt-3">
            {comments?.map((comment) => {
              return (
                <CommentLayout
                  {...comment}
                  key={comment?.id}
                  reloadPostDetails={reloadCommentWithPostDetails}
                />
              );
            })}

            {isCommentLoading ? (
              ['', ''].map((a, i) => {
                return (
                  <div className="mb-3" key={i}>
                    {' '}
                    <CommentSkeleton />
                  </div>
                );
              })
            ) : commentCount > comments?.length &&
              comments.length === commentsPage * PAGE_SIZE.COMMENT ? (
              <div
                className="flex gap-1 mt-3 cursor-pointer hover:opacity-70"
                onClick={() => setCommentsPage((prev) => prev + 1)}
              >
                <p className="text14 text-greydark">Load more comments</p>{' '}
                <DownCaret fill="#A1A0A0" />
              </div>
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        ''
      )}

      <Modal
        isOpen={isRepostModalOpen}
        onClose={() => setIsRepostModalOpen(false)}
        isTitle={true}
        title="Repost"
        width="!w-[100vw] md:max-w-[540px]"
        childrenClassNames="overflow-y-auto"
        padding="p-0"
        titleClassNames=""
        titleParentClassNames="md:m-3 m-0"
        height="h-[100dvh] max-h-[100dvh] md:h-auto"
      >
        <RepostLayout
          post={completePostData}
          closePopup={() => setIsRepostModalOpen(false)}
          reloadData={reloadData}
        />
      </Modal>
    </>
  );
};

export default ActionButtons;
