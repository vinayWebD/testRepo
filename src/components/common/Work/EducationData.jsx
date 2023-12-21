import moment from 'moment';
import React from 'react';
import EditBlueIcon from '../../Icons/EditBlueIcon';

const EducationData = ({ data, openModalHandler = () => {}, isEditable = true }) => {
  return (
    <div>
      <div
        className={`${
          isEditable ? 'md:pr-[64px]' : 'justify-between'
        }  flex flex-col md:flex-row relative gap-6 break-words`}
      >
        <div className={`pb-[24px] w-full ${isEditable ? 'md:w-[35%]' : 'md:w-[30%]'}`}>
          <div className="detail-label">School/College/University</div>
          <div className="detail-heading">{data.institute}</div>
        </div>
        <div className={`pb-[24px] w-full ${isEditable ? 'md:w-[35%]' : 'md:w-[30%]'}`}>
          <div className="detail-label">Field of Study</div>
          <div className="detail-heading">{data?.filedOfStudy}</div>
        </div>
        <div className={`pb-[24px] w-full ${isEditable ? ' md:w-[15%] ' : ' md:w-[20%] '}`}>
          <div className="detail-label">Start Date</div>
          <div className="detail-heading">{moment(data?.startDate).format('ll')}</div>
        </div>
        <div className={`pb-[24px] w-full ${isEditable ? ' md:w-[15%] ' : ' md:w-[20%] '}`}>
          <div className="detail-label">End Date</div>
          <div className="detail-heading">{moment(data?.endDate).format('ll')}</div>
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
      <div
        className={`${
          isEditable ? 'md:pr-[64px]' : 'justify-between'
        }  flex flex-col md:flex-row relative break-words`}
      >
        <div className={`pb-[24px] w-full ${isEditable ? 'md:w-[35%]' : 'md:w-[30%]'}`}>
          <div className="detail-label"> Degree</div>
          <div className="detail-heading">{data?.degree}</div>
        </div>
        {data?.otherActivities ? (
          <div className={`pb-[24px] w-full ${isEditable ? 'md:w-[65%]' : 'md:w-[70%]'}`}>
            <div className="detail-label">
              Other (Activities, clubs, organizations and societies)
            </div>
            <div className="detail-heading">{data?.otherActivities}</div>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="py-[18px]">
        <div className="bg-greymedium h-[1px] w-full" />
      </div>
    </div>
  );
};

export default EducationData;
