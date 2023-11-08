import React, { useEffect, useState } from 'react';

const ReadMore = ({ children, length, className }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(text?.length > length);

  useEffect(() => {
    setIsReadMore(text?.length > length);
  }, [children]);

  const toggleReadMore = (e) => {
    e.preventDefault();
    setIsReadMore(!isReadMore);
  };

  return (
    <p>
      {isReadMore ? text.slice(0, length) : text}
      <span onClick={toggleReadMore} className={`font-semibold cursor-pointer ${className}`}>
        {text?.length > length ? (isReadMore ? '...See more' : ' See less') : ''}
      </span>
    </p>
  );
};

export default ReadMore;
