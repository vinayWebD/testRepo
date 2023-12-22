import moment from 'moment';
import React from 'react';

const EducationView = ({ education = {} }) => {
  return (
    <div key={education?.id} className="flex flex-col gap-2 text-greydark">
      {education?.institute ? (
        <p className="text-[16px] font-semibold">{education?.institute}</p>
      ) : (
        ''
      )}
      {education?.startDate ? (
        <p className="text-[14px] font-normal">
          {`${moment(education?.startDate).format('YYYY')} - ${
            education?.isCurrentlyWorking ? 'Present' : moment(education?.endDate).format('YYYY')
          }`}
        </p>
      ) : (
        ''
      )}
      {education?.filedOfStudy ? (
        <p className="text-[14px] font-medium">{education?.filedOfStudy}</p>
      ) : (
        ''
      )}
      {education?.degree ? <p className="text-[14px] font-medium">{education?.degree}</p> : ''}
      {education?.otherActivities ? (
        <p className="text-[14px] font-medium">{education?.otherActivities}</p>
      ) : (
        ''
      )}

      <div className="py-4">
        <div className="bg-greymedium h-[1px] w-full" />
      </div>
    </div>
  );
};

export default EducationView;
