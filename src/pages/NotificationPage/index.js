import React, { useEffect } from 'react';
import SectionLayout from '../../components/PrivateLayout/SectionLayout';
import dummy from '../../assets/images/dummy.svg';
import Pagination from '../../components/Pagination';
import { useMemo, useState } from 'react';
import noWork from '../../assets/images/noWork.svg';
import './style.scss';
import InnerSectionLayout from '../../components/PrivateLayout/InnerSectionLayout';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import { getErrorMessage, successStatus } from '../../common';
import { notificationListing } from '../../services/notificationService';

let PageSize = 10;
let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const NotificationPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const fetchnotificationList = async () => {
    const { status, data } = await notificationListing({
      page: currentPage
      , limit: 10
    });
    if (!successStatus(status)) {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    } else {
      console.log('data?.data', data?.data)
    }
  };

  useEffect(() => {
    fetchnotificationList();
  }, [currentPage]);
  return (
    <SectionLayout activeTab={3}>
      <InnerSectionLayout heading={'Notification'}>
        <div className="h-auto">
          {currentTableData?.length > 0 ? (
            currentTableData.map((item, i) => {
              if (i % 2 === 0) {
                return (
                  <div key={i} className="px-4 md:pl-10 bg-[#F5FBFF] relative">
                    <div className="dot-icon" />
                    <div className="flex pt-4 pb-4">
                      <div className="mr-2.5">
                        <img
                          alt=""
                          src={dummy}
                          className="rounded-full w-[45px] h-[40px] object-cover	"
                        />
                      </div>
                      <div className="block w-full">
                        <div className="text-[14px] font-normal text-[#333333]">
                          <span className="font-medium">Lex Murphy</span> requested you to follow.
                        </div>
                        <div className="text-[12px] font-normal text-[#A1A0A0]">Just Now</div>
                      </div>
                    </div>
                    {i !== data.length - 1 && <hr style={{ color: '#E8E8E8' }} />}
                  </div>
                );
              } else {
                return (
                  <div key={i} className="px-4 md:pl-10">
                    <div className="flex pt-4 pb-4">
                      <div className="mr-2.5">
                        <img
                          alt=""
                          src={dummy}
                          className="rounded-full w-[45px] h-[40px] object-cover	"
                        />
                      </div>
                      <div className="block w-full">
                        <div className="text-[14px] font-normal text-[#333333]">
                          <span className="font-medium">Lex Murphy</span> requested you to follow.
                        </div>
                        <div className="text-[12px] font-normal text-[#A1A0A0]">Just Now</div>
                      </div>
                    </div>
                    {i !== data.length - 1 && <hr style={{ color: '#E8E8E8' }} />}
                  </div>
                );
              }
            })
          ) : (
            <div className="p-4 mt-4 h-[calc(100vh-275px)] flex flex-col justify-center item-center m-auto text-center">
              <img src={noWork} alt="noWork" className="w-[20%] md:w-[10%] mx-auto " />
              <h4 className="font-semibold text-greydark text-[12px] md:text-[14px] my-2">
                No notification yet.
              </h4>
              <h5 className="font-medium text-greydark text-[10px] md:text-[14px] mb-2">
                It helps people quickly identify your many talents.
              </h5>
            </div>
          )}
        </div>
        <div className="py-4 flex items-center justify-end mt-auto">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </InnerSectionLayout>
    </SectionLayout>
  );
};

export default NotificationPage;
