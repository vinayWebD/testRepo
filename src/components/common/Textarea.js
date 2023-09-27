import React, { useState } from 'react';

const Textarea = ({ placeholder = '', maxLength = 100 }) => {
  const [text, setText] = useState('');

  return (
    <textarea
      value={text}
      className="min-h-[130px] w-full pr-6"
      placeholder={placeholder}
      onChange={(e) => setText(e.target.value)}
      maxLength={maxLength}
    />
  );
};

export default Textarea;
