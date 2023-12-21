import React from 'react';

export const LinkData = ({ data = [] }) => {
  return (
    <div className="w-full">
      <div className="flex gap-[24px] grow-0 mt-6 flex-wrap	">
        {data.map((links, idx) => (
          <div key={idx}>
            <div className="detail-label">{links.domain}</div>
            <a
              className="text-[16px] font-normal text-[#3366CC]"
              href={links.url}
              target="_blank"
              rel="noreferrer"
            >
              {links.url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
