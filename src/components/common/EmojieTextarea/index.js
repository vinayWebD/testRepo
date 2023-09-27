import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import EmojieIcon from '../../Icons/EmojieIcon';

const EmojiTextarea = () => {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (emojiObject) => {
    setText((prevText) => prevText + emojiObject.emoji);
  };

  return (
    <div className="relative">
      <textarea
        value={text}
        className="min-h-[100px] w-full"
        placeholder="Share a content, media or link"
        onChange={(e) => setText(e.target.value)}
      />
      <span
        className="absolute top-5 right-2 cursor-pointer"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <EmojieIcon />
      </span>

      <div className="absolute right-2 bottom-3 text-xs text-greylight">0/100</div>

      {showEmojiPicker && (
        <div className="absolute top-11 right-2 z-[1000] max-h-[320px]">
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
            lazyLoadEmojis={false}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiTextarea;
