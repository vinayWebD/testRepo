import React from 'react';
import { getFileName } from '../../utils/helper';
import DocumentPdfIcon from '../Icons/DocumentPdfIcon';
import moment from 'moment';

const CertificateView = ({ certificate = {} }) => {
  return (
    <div key={certificate?.id} className="flex flex-col gap-2 text-greydark">
      {certificate?.title ? <p className="text-[16px] font-semibold">{certificate?.title}</p> : ''}
      {certificate?.institution ? (
        <p className="text-[16px] font-semibold">{certificate?.institution}</p>
      ) : (
        ''
      )}
      {certificate?.year ? (
        <p className="text-[14px] font-normal">{moment(certificate?.year).format('YYYY')}</p>
      ) : (
        ''
      )}

      {certificate?.path ? (
        <div
          className="detail-heading rounded-md h-[50px] w-[268.3px] bg-whitelight p-3 flex items-center justify-between"
          title={getFileName(certificate?.path)}
        >
          <div className="w-full flex">
            <div className="w-[14%]">
              <DocumentPdfIcon />
            </div>

            <p className="text-blueprimary w-[86%] text-ellipsis overflow-hidden whitespace-nowrap">
              {getFileName(certificate?.path)}
            </p>
          </div>
        </div>
      ) : (
        ''
      )}

      <div className="py-4">
        <div className="bg-greymedium h-[1px] w-full" />
      </div>
    </div>
  );
};

export default CertificateView;
