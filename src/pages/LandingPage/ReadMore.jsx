import { useState } from 'react';

export const ReadMore = ({ text, moreText }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="about-para">
      {isReadMore ? text : moreText}
      <span onClick={toggleReadMore} className="yellow-text cursor-pointer">
        {isReadMore ? '...Read more' : ' Show less'}
      </span>
    </p>
  );
};
