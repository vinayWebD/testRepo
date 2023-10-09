import React, { useRef, useState } from 'react';
import SendIcon from '../Icons/SendIcon';
import { useSelector } from 'react-redux';
import Avatar from '../common/Avatar';

const CommentInput = ({ onChange = () => {} }) => {
  const [value, setValue] = useState('');
  const userData = useSelector((state) => state?.auth?.user) || {};
  const textareaRef = useRef(null);

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

  return (
    <div>
      <div className="flex gap-2 items-center relative w-full">
        <Avatar
          name={`${userData?.first_name} ${userData?.last_name}`}
          image={userData?.profile_picture_url}
        />
        <div className="flex w-full">
          <textarea
            value={value}
            placeholder={'Write a comment'}
            className="p-[9px] min-h-10 outline-none w-full border-2 !border-r-0 rounded-r-none border-greymedium text-sm text-greylight bg-white"
            onChange={(e) => onChangeHandler(e)}
            autoComplete={'true'}
            rows={1}
            onInput={autoExpand}
            ref={textareaRef}
          />
          <div
            className="px-3 ml-[-1px] flex items-center cursor-pointer bg-white rounded-r-[8px] border-l-0 border-2 border-greymedium"
            onClick={() => {}}
          >
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
