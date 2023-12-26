import React from 'react';

const LinkView = ({ link = {} }) => {
  return (
    <div>
      <div className="detail-label">{link.domain}</div>
      <a
        className="text-[16px] font-normal text-[#3366CC]"
        href={link.url}
        target="_blank"
        rel="noreferrer"
      >
        {link.url}
      </a>
    </div>
  );
};

export default LinkView;
