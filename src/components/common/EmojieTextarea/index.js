import React, { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import EmojieIcon from '../../Icons/EmojieIcon';
import { LIMITS } from '../../../constants/constants';

const { POST_CAPTION_MAX_LIMIT } = LIMITS;

const EmojiTextarea = ({
  placeholder = '',
  maxLength = POST_CAPTION_MAX_LIMIT,
  value = '',
  handleChange = () => {},
  textareaClassNames = '',
  textareaHeightClass = 'min-h-[120px]',
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojieContainerRef = useRef(null);

  const onEmojiClick = (emojiObject) => {
    handleChange((prevText) => {
      // We need to allow the input of emojies only when the max length of textarea has not reached
      if (prevText.length + emojiObject.emoji?.length <= maxLength) {
        return prevText + emojiObject.emoji;
      } else {
        return prevText;
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojieContainerRef.current && !emojieContainerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <textarea
        value={value}
        className={`w-full pr-6 textarea-with-emojie ${textareaClassNames} ${textareaHeightClass}`}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        maxLength={maxLength}
      />

      <span
        className="absolute top-5 right-2 cursor-pointer"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <EmojieIcon />
      </span>

      <div className="w-full text-right text-xs text-greylight">
        {value.length}/{maxLength}
      </div>

      {showEmojiPicker && (
        <div className="absolute top-11 right-2 z-[1000] max-h-[320px]" ref={emojieContainerRef}>
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            searchDisabled={true}
            skinTonesDisabled={true}
            previewConfig={{
              showPreview: false,
              defaultEmoji: '1f60a',
            }}
            height={320}
            width={280}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiTextarea;
