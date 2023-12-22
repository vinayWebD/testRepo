import moment from 'moment';
import React from 'react';

const ExperienceView = ({ experience = {} }) => {
  return (
    <div key={experience?.id} className="flex flex-col gap-2 text-greydark">
      {experience?.title ? <p className="text-[16px] font-semibold">{experience?.title}</p> : ''}
      {experience?.company ? (
        <p className="text-[16px] font-semibold">{experience?.company}</p>
      ) : (
        ''
      )}
      {experience?.startDate ? (
        <p className="text-[14px] font-normal">
          {`${moment(experience?.startDate).format('ll')} - ${
            experience?.isCurrentlyWorking ? 'Present' : moment(experience?.endDate).format('ll')
          }`}
        </p>
      ) : (
        ''
      )}
      {experience?.description ? (
        <p className="text-[14px] font-normal">{experience?.description}</p>
      ) : (
        ''
      )}
      <div className="py-4">
        <div className="bg-greymedium h-[1px] w-full" />
      </div>
    </div>
  );
};

export default ExperienceView;
