import React, { useState } from 'react';
import { LIMITS } from '../../constants/constants';

const { POST_CAPTION_MAX_LIMIT } = LIMITS;

const CaptionLinkContainer = ({ caption = '', links = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxCharsBeforeSeeMore = POST_CAPTION_MAX_LIMIT; // change this value as needed

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const shouldShowSeeMore = caption?.length > maxCharsBeforeSeeMore;

  const displayedCaption =
    isExpanded || !shouldShowSeeMore
      ? caption
      : `${caption.substring(0, maxCharsBeforeSeeMore)}...`;

  return (
    <div className="mt-3 flex gap-2 flex-col break-words">
      <p className="text-sm">
        {displayedCaption}
        {shouldShowSeeMore && (
          <span
            className="text-sm font-semibold cursor-pointer ml-2"
            onClick={handleToggleExpanded}
          >
            {isExpanded ? 'See less' : 'See more'}
          </span>
        )}
      </p>

      {links?.map((link, i) => (
        <a
          href={link}
          className="text-sm text-blueprimary font-semibold w-auto md:w-fit break-words"
          target="_blank"
          rel="noreferrer"
          key={i}
        >
          {link}
        </a>
      ))}
    </div>
  );
};

export default CaptionLinkContainer;
