import React from 'react';

export const LinkData = ({ data = [] }) => {
  return (
    <div className="w-full">
      <div className="flex gap-[24px] grow-0 mt-6 flex-wrap	">
        {data.map((links, idx) => (
          <div key={idx}>
            <div className="detail-label">{links.domain}</div>
            <div className="detail-heading">{links.url}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
