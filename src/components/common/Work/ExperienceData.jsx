import moment from 'moment';
import React from 'react';
import EditBlueIcon from '../../Icons/EditBlueIcon';
import HtmlText from '../HtmlText';

export const ExperienceData = ({ data, openModalHandler = () => {}, isEditable = true }) => {
  return (
    <div>
      <div
        className={`${
          isEditable ? 'md:pr-[64px]' : 'justify-between'
        }  flex flex-col md:flex-row relative gap-6 break-words`}
      >
        <div className={`pb-[24px] w-full ${isEditable ? 'md:w-[35%]' : 'md:w-[30%]'}`}>
          <div className="detail-label">Title</div>
          <div className="detail-heading">{data.title}</div>
        </div>
        <div className={`pb-[24px] w-full ${isEditable ? 'md:w-[35%]' : 'md:w-[30%]'}`}>
          <div className="detail-label">Company</div>
          <div className="detail-heading">{data.company}</div>
        </div>
        <div className={`pb-[24px] w-full ${isEditable ? ' md:w-[15%] ' : ' md:w-[20%] '}`}>
          <div className="detail-label">Start Date</div>
          <div className="detail-heading">{moment(data?.startDate).format('ll')}</div>
        </div>
        <div className={`pb-[24px] w-full ${isEditable ? ' md:w-[15%] ' : ' md:w-[20%] '}`}>
          <div className="detail-label"> End Date</div>
          <div className="detail-heading">
            {data?.isCurrentlyWorking
              ? 'Present'
              : data?.endDate
              ? moment(data?.endDate).format('ll')
              : 'NA'}
          </div>
        </div>
        {isEditable && (
          <span
            className="absolute right-[0] top-[50%] cursor-pointer"
            onClick={() => {
              openModalHandler(data);
            }}
          >
            <EditBlueIcon />
          </span>
        )}
      </div>

      {data?.description ? (
        <div className={isEditable ? 'md:pr-[64px]' : ''}>
          <div className="detail-label">Description</div>

          <HtmlText text={data?.description} className="detail-heading" />
        </div>
      ) : (
        ''
      )}

      <div className="py-[18px]">
        <div className="bg-greymedium h-[1px] w-full" />
      </div>
    </div>
  );
};
