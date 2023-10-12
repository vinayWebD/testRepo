import React, { useState } from 'react';

const CaptionLinkContainer = ({ caption = '', links = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxCharsBeforeSeeMore = 80; // change this value as needed

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const shouldShowSeeMore = caption.length > maxCharsBeforeSeeMore;

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
          href="https://www.purdriven.com/feed/?trk=homepage-basic_sign-in-submit"
          className="text-sm text-[#70baff] font-semibold"
          key={i}
        >
          {link}
        </a>
      ))}
    </div>
  );
};

export default CaptionLinkContainer;
