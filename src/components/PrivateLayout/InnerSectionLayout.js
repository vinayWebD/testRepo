import React from 'react';

const InnerSectionLayout = ({ heading, children }) => {
  return (
    <div className="grid grid-cols-12 gap-5 feed-page">
      <div className="col-span-12">
        <div
          className={
            'bg-white md:rounded-lg shadow-card lg:mt-4 h-auto min-h-[calc(100vh-120px)] md:min-h-[calc(100vh-120px)] flex flex-col'
          }
        >
          <div className="text-[20px] text-[#333333] font-medium p-4 pb-0 mb-4">{heading}</div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default InnerSectionLayout;
