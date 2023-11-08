import React, { useState } from 'react';
import { LIMITS } from '../../constants/constants';
import ReadMore from '../ReadMore';
import HtmlText from '../common/HtmlText';

const { POST_READ_MORE_LIMIT } = LIMITS;

const CaptionLinkContainer = ({ caption = '', links = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxCharsBeforeSeeMore = POST_READ_MORE_LIMIT; // change this value as needed

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
        <HtmlText text={displayedCaption} />
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
          className="text-sm text-blueprimary font-medium max-w-max md:w-fit break-all"
          target="_blank"
          rel="noreferrer"
          key={i}
        >
          <ReadMore length={200} className="text-darkblue !font-semibold">
            {link}
          </ReadMore>
        </a>
      ))}
    </div>
  );
};

export default CaptionLinkContainer;
