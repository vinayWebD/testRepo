import React, { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import EmojieIcon from '../../Icons/EmojieIcon';

const EmojiTextarea = ({ placeholder = '', maxLength = 100, updateTextValue = () => {} }) => {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojieContainerRef = useRef(null);

  const onEmojiClick = (emojiObject) => {
    setText((prevText) => prevText + emojiObject.emoji);
  };

  useEffect(() => {
    updateTextValue(text);
  }, [text]);

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
        value={text}
        className="min-h-[120px] w-full pr-6"
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
      />

      <span
        className="absolute top-5 right-3 cursor-pointer"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <EmojieIcon />
      </span>

      <div className="absolute right-3 bottom-3 text-xs text-greylight">{text.length}/100</div>

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
