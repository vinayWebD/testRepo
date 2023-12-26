import React from 'react';
import LinkView from '../../ProfilePage/LinkView';

export const LinkData = ({ data = [] }) => {
  return (
    <div className="w-full">
      <div className="flex gap-[24px] grow-0 mt-6 flex-wrap	">
        {data.map((link, idx) => (
          <LinkView key={idx} link={link} />
        ))}
      </div>
    </div>
  );
};
