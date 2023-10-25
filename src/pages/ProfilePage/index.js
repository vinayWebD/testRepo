/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProfileLayout from '../../components/ProfileLayout';
import FollowerContainer from '../../components/ProfileLayout/FollowerContainer';
import ProfileContainer from '../../components/ProfileLayout/ProfileContainer';
// import Loader from '../../components/common/Loader';
import Card from '../../components/common/Card';
import backIcon from '../../assets/images/backIcon.svg';
import noWork from '../../assets/images/noWork.svg';

import { useNavigate } from 'react-router-dom';
import WorkDetail from './WorkDetail';
import OutlinedButton from '../../components/common/OutlinedButton';
import InterestDetail from './InterestDetail';
import useScrollToTop from '../../hooks/useScrollToTop';

const ProfilePage = () => {
  const userData = useSelector((state) => state?.auth?.user) || {};
  // const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState('work');
  const navigate = useNavigate();

  // Scrolling to top whenever user comes on this page for the first time
  useScrollToTop();

  return (
    <ProfileLayout>
      <div className="col-span-10 md:col-span-12 xs:col-span-12 sm:col-span-12 lg:col-span-4 xl:col-span-3 lg:sticky top-[61px] z-40 lg:h-fit	">
        {/* The profile info - image, name etc. */}
        <div
          className="flex text-[15px] md:text-[18px] lg:text-[24px] py-4 sticky h-fit cursor-pointer font-medium"
          onClick={() => navigate(-1)}
        >
          <img src={backIcon} alt="backIcon" className="w-[20px] lg:w-[30px]" />
          My Profile
        </div>
        <ProfileContainer userData={userData} />
        <FollowerContainer />
      </div>
      <div className="col-span-10 xs:col-span-12 sm:col-span-12 lg:col-span-8 md:col-span-12 xl:col-span-9 overflow-y-auto py-[12px] lg:my-14">
        <div className="grid grid-cols-12 gap-3 feed-page">
          <div className="col-span-12">
            <div>
              <Card
                classNames="flex justify-around overflow-hidden text-center"
                bottomNotRound={true}
              >
                <div
                  className={`w-[33.3%] p-4 cursor-pointer ${
                    tab === 'work' ? 'border-b-4 border-blueprimary text-blueprimary' : ''
                  }`}
                  onClick={() => setTab('work')}
                  style={{ fontWeight: '500' }}
                >
                  Work
                </div>
                <div
                  className={`w-[33.3%] p-4 cursor-pointer ${
                    tab === 'interest' ? 'border-b-4 border-blueprimary text-blueprimary' : ''
                  }`}
                  onClick={() => setTab('interest')}
                  style={{ fontWeight: '500' }}
                >
                  Interests
                </div>
                <div
                  className={`w-[33.3%] p-4 cursor-pointer ${
                    tab === 'myself' ? 'border-b-4 border-blueprimary text-blueprimary' : ''
                  }`}
                  onClick={() => setTab('myself')}
                  style={{ fontWeight: '500' }}
                >
                  Myself
                </div>
              </Card>

              {tab === 'work' ? (
                <>
                  <WorkDetail />
                  <Card classNames="p-4 mt-4 h-[calc(100vh-275px)] flex flex-col justify-center item-center m-auto text-center">
                    <img src={noWork} alt="noWork" className="w-[20%] md:w-[10%] mx-auto " />
                    <h4 className="font-semibold text-greydark text-[12px] md:text-[14px] my-2">
                      No work added yet.
                    </h4>
                    <h5 className="font-medium text-greydark text-[10px] md:text-[14px] mb-2">
                      It helps people quickly identify your many talents.
                    </h5>
                    <div className="text-center mx-auto flex mt-2">
                      <OutlinedButton
                        label={'Add'}
                        additionalClassNames="mt-2 pl-0 pr-0 w-fit"
                        showArrowIcon={false}
                        add
                      />
                    </div>
                  </Card>
                </>
              ) : tab === 'interest' ? (
                <>
                  <InterestDetail />
                  <Card classNames="p-4 mt-4 h-[calc(100vh-275px)] flex flex-col justify-center item-center m-auto text-center">
                    <img src={noWork} alt="noWork" className="w-[20%] md:w-[10%] mx-auto " />
                    <h4 className="font-semibold text-greydark text-[12px] md:text-[14px] my-2">
                      No Interests added yet.
                    </h4>
                    <div className="text-center mx-auto flex mt-2">
                      <OutlinedButton
                        label={'Add Interests'}
                        additionalClassNames="mt-2 pl-0 pr-0 w-fit"
                        showArrowIcon={false}
                        add
                      />
                    </div>
                  </Card>
                </>
              ) : (
                <>
                  <Card classNames="p-4 mt-4 h-[calc(100vh-275px)] flex flex-col justify-center item-center m-auto text-center">
                    <img src={noWork} alt="noWork" className="w-[20%] md:w-[10%] mx-auto " />
                    <h4 className="font-semibold text-greydark text-[12px] md:text-[14px] my-2">
                      No work added yet.
                    </h4>
                    <h5 className="font-medium text-greydark text-[10px] md:text-[14px] mb-2">
                      It helps people quickly identify your many talents.
                    </h5>
                    <div className="text-center mx-auto flex mt-2">
                      <OutlinedButton
                        label={'Add'}
                        additionalClassNames="mt-2 pl-0 pr-0 w-fit"
                        showArrowIcon={false}
                        add
                      />
                    </div>
                  </Card>
                </>
              )}

              {/* {isLoading && <Loader />} */}
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default ProfilePage;
