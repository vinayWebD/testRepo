import React from 'react';
import LinksIcon from '../../Icons/LinksIcon';
import EditBlueIcon from '../../Icons/EditBlueIcon';

export const LinkData = ({ data = [], openModalHandler = () => {}, isEditable = true }) => {
  return (
    <div className="w-full text-left py-[17px] px-[24px] bg-white mb-[16px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-4">
            <LinksIcon />
          </span>
          <span className="form-title-blue">Links</span>
        </div>
        {isEditable && (
          <span onClick={openModalHandler} className="cursor-pointer">
            <EditBlueIcon />
          </span>
        )}
      </div>
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
