import { useState } from 'react';

export const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="about-para">
      {isReadMore ? text.slice(0, 600) : text}
      <span onClick={toggleReadMore} className="yellow-text cursor-pointer">
        {isReadMore ? '...Read more' : ' Show less'}
      </span>
    </p>
  );
};
