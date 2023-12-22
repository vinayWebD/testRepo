import moment from 'moment';
import React from 'react';
import { getFileName } from '../../utils/helper';
import DocumentPdfIcon from '../Icons/DocumentPdfIcon';
import edit from '../../assets/images/editIcon.svg';
import SeeMoreLessIcon from '../Icons/SeeMoreLessIcon';

const CareerView = ({ career = {}, isEditable = false }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="py-[10px] px-[20px] rounded-r-lg flex flex-col gap-2 blue-white-gradient p-3 text-white w-fit text-[14px] md:text-[18px] font-semibold break-words">
          {career?.title}
        </div>
        {isEditable && (
          <div className="p-4">
            <div className="bg-iconBackground p-1 rounded cursor-pointer">
              <img src={edit} alt="edit" />
            </div>
          </div>
        )}
      </div>

      {career?.Experiences?.length ? (
        <div className="p-4">
          <p className="text-blueprimary text-xl font-medium mb-4">Experiences</p>

          {career?.Experiences?.map((exp) => {
            return (
              <div key={exp?.id} className="flex flex-col gap-2 text-greydark">
                {exp?.title ? <p className="text-[16px] font-semibold">{exp?.title}</p> : ''}
                {exp?.company ? <p className="text-[16px] font-semibold">{exp?.company}</p> : ''}
                {exp?.startDate ? (
                  <p className="text-[14px] font-normal">
                    {`${moment(exp?.startDate).format('ll')} - ${
                      exp?.isCurrentlyWorking ? 'Present' : moment(exp?.endDate).format('ll')
                    }`}
                  </p>
                ) : (
                  ''
                )}
                {exp?.description ? (
                  <p className="text-[14px] font-normal">{exp?.description}</p>
                ) : (
                  ''
                )}
                <div className="pt-[22px]">
                  <div className="bg-greymedium h-[1px] w-full" />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ''
      )}

      {career?.Certificates?.length ? (
        <div className="p-4">
          <p className="text-blueprimary text-xl font-medium mb-4">Certifications</p>

          {career?.Certificates?.map((cert) => {
            return (
              <div key={cert?.id} className="flex flex-col gap-2 text-greydark">
                {cert?.title ? <p className="text-[16px] font-semibold">{cert?.title}</p> : ''}
                {cert?.institution ? (
                  <p className="text-[16px] font-semibold">{cert?.institution}</p>
                ) : (
                  ''
                )}
                {cert?.year ? (
                  <p className="text-[14px] font-normal">{moment(cert?.year).format('YYYY')}</p>
                ) : (
                  ''
                )}

                {cert?.path ? (
                  <div
                    className="detail-heading rounded-md h-[50px] w-[268.3px] bg-whitelight p-3 flex items-center justify-between"
                    title={getFileName(cert?.path)}
                  >
                    <div className="w-full flex">
                      <div className="w-[14%]">
                        <DocumentPdfIcon />
                      </div>

                      <p className="text-blueprimary w-[86%] text-ellipsis overflow-hidden whitespace-nowrap">
                        {getFileName(cert?.path)}
                      </p>
                    </div>
                  </div>
                ) : (
                  ''
                )}

                <div className="pt-[22px]">
                  <div className="bg-greymedium h-[1px] w-full" />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ''
      )}

      <div className="text-center text-blueprimary cursor-pointer text-[14px] font-semibold capitalize flex gap-1 justify-center items-center hover:opacity-70">
        See less <SeeMoreLessIcon />
      </div>
    </div>
  );
};

export default CareerView;
