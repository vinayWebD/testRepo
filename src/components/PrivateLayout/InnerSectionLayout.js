import React from 'react';
import backIcon from '../../assets/images/backIcon.svg';

const InnerSectionLayout = ({
  heading,
  isSubSection = false,
  children,
  onClickSubSectionHandler = () => {},
}) => {
  return (
    <div className="grid grid-cols-12 gap-5 feed-page">
      <div className="col-span-12">
        <div
          className={
            'bg-white md:rounded-lg shadow-card lg:mt-4 h-auto min-h-[calc(100vh-120px)] md:min-h-[calc(100vh-120px)] flex flex-col p-4'
          }
        >
          <div
            className={`flex items-center gap-2 mb-4 ${isSubSection ? 'cursor-pointer' : ''}`}
            onClick={onClickSubSectionHandler}
          >
            {isSubSection && <img src={backIcon} alt="backIcon" className="w-[24px]" />}
            <div
              className={`md:text-[20px] text-[#333333] font-medium pb-0 ${
                isSubSection ? 'text-[18px]' : 'font-semibold'
              }`}
            >
              {heading}
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default InnerSectionLayout;
