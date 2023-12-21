import React from 'react';
import EditBlueIcon from '../../Icons/EditBlueIcon';
import moment from 'moment';
import { getFileName } from '../../../utils/helper';
import DocumentPdfIcon from '../../Icons/DocumentPdfIcon';

const CertificateData = ({ data, openModalHandler = () => {}, isEditable = true }) => {
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
          <div className="detail-label">Institution</div>
          <div className="detail-heading">{data?.institution}</div>
        </div>
        <div className={`pb-[24px] w-full ${isEditable ? ' md:w-[15%] ' : ' md:w-[20%] '}`}>
          <div className="detail-label">Year</div>
          <div className="detail-heading">{moment(data?.year).format('YYYY')}</div>
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
          <div className="detail-label">Media</div>
          {data?.path ? (
            <div
              className="detail-heading rounded-md h-[50px] w-[268.3px] bg-whitelight p-3 flex items-center justify-between"
              title={getFileName(data?.path)}
            >
              <div className="w-full flex">
                <div className="w-[14%]">
                  <DocumentPdfIcon />
                </div>

                <p className="text-blueprimary w-[86%] text-ellipsis overflow-hidden whitespace-nowrap">
                  {getFileName(data?.path)}
                </p>
              </div>
            </div>
          ) : (
            <div className="detail-heading">NA</div>
          )}
        </div>
      </div>
      <div className="py-[18px]">
        <div className="bg-greymedium h-[1px] w-full" />
      </div>
    </div>
  );
};

export default CertificateData;
