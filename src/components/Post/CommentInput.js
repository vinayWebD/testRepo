import React, { useEffect, useRef, useState } from 'react';
import SendIcon from '../Icons/SendIcon';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../common/Avatar';
import {
  createCommentDispatcher,
  editCommentDispatcher,
} from '../../redux/dispatchers/feedDispatcher';
import { successStatus } from '../../common';
import { ToastNotifyError } from '../Toast/ToastNotify';
import { LIMITS } from '../../constants/constants';

const CommentInput = ({
  postId,
  onChange = () => {},
  reloadPostDetails = () => {},
  isEditing = false,
  commentDetails = {},
  cancelEditing = () => {},
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const userData = useSelector((state) => state?.auth?.user) || {};
  const textareaRef = useRef(null);
  const { globalTransparentLoadingPrivate } = useSelector((state) => state.auth || {});

  useEffect(() => {
    if (isEditing && commentDetails?.description !== value) {
      setValue(commentDetails?.description);
      textareaRef.current.value = commentDetails?.description;
      textareaRef.current.focus();
      autoExpand();
    }
  }, [isEditing, commentDetails?.description]);

  const onChangeHandler = (e) => {
    setValue(e.target.value);
    onChange();
  };

  // This function is used for expanding the textarea as we type in it
  const autoExpand = () => {
    /* Reset field height */
    const textarea = textareaRef.current;
    const textAreaActualHeight = parseInt(textarea.style.height);

    textarea.style.height = 'inherit';

    /* Get the computed styles for the element */
    const computed = window.getComputedStyle(textarea);
    /* Calculate the height */
    const height =
      parseInt(computed.getPropertyValue('padding-top'), 10) +
      textarea.scrollHeight +
      parseInt(computed.getPropertyValue('padding-bottom'), 10) -
      14; // 14 as it is the height of the font (font size)

    if (height < 180) {
      textarea.style.height = height + 'px';
    } else {
      textarea.style.height = textAreaActualHeight + 'px';
    }
  };

  const isValid = () => {
    return value?.trim()?.length > 0 && value?.trim()?.length <= LIMITS.COMMENT_MAX_LIMIT;
  };

  const submitCommentHandler = async () => {
    if (isValid() && !globalTransparentLoadingPrivate) {
      let status;
      if (!isEditing) {
        const response =
          (await dispatch(createCommentDispatcher({ postId, description: value }))) || {};
        status = response?.status;
      } else {
        const response =
          (await dispatch(editCommentDispatcher({ id: commentDetails?.id, description: value }))) ||
          {};
        status = response?.status;
        cancelEditing();
      }

      if (successStatus(status)) {
        setValue('');
        textareaRef.current.value = '';
        autoExpand();
        await reloadPostDetails(postId);
      }
    } else {
      ToastNotifyError(`Comment is required with max ${LIMITS.COMMENT_MAX_LIMIT} characters`);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center relative w-full justify-center">
        <Avatar
          name={`${userData?.firstName} ${userData?.lastName}`}
          image={userData?.profilePictureUrl}
          classNames="w-[37px] h-[37px]"
        />
        <div className="flex w-full">
          <textarea
            value={value}
            placeholder={'Write a comment'}
            className={`p-[9px] min-h-10 outline-none w-full border-2 !border-r-0 rounded-r-none border-greylighter text-sm  placeholder:text-greylight ${
              isEditing ? 'bg-whitelight' : 'bg-white'
            } `}
            onChange={(e) => onChangeHandler(e)}
            autoComplete={'true'}
            rows={1}
            onInput={autoExpand}
            ref={textareaRef}
          />
          <div
            className={`px-3 ml-[-1px] flex items-center cursor-pointer rounded-r-[8px] border-l-0 border-2 border-greylighter ${
              !isValid() ? 'cursor-not-allowed' : 'cursor-pointer'
            } ${isEditing ? 'bg-whitelight' : 'bg-white'}`}
            onClick={() => {}}
          >
            <div className={`${!isValid() ? 'opacity-60' : ''}`} onClick={submitCommentHandler}>
              <SendIcon />
            </div>
          </div>
        </div>
        {isEditing ? (
          <div
            className=""
            onClick={() => (!globalTransparentLoadingPrivate ? cancelEditing() : {})}
          >
            <p className="cursor-pointer text-blueprimary text-[12px] hover:opacity-70 font-medium">
              Cancel
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CommentInput;
