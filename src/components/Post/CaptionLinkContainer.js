import React from 'react';

const CaptionLinkContainer = ({ caption = '', links = [] }) => {
  return (
    <div className="mt-3 flex gap-2 flex-col break-words">
      <p className="text-sm">{caption}</p>

      {links.map((link, i) => (
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
