import React from 'react';
import PrivateHeader from '../common/PrivateHeader';
import Background from '../../assets/images/private-background.svg';
import ProfileContainer from './ProfileContainer';
import LeftNavigation from './LeftNavigation';
import Card from '../common/Card';
import NotificationSection from '../../pages/HomePage/NotificationSection';
import MobileBottomNavigation from './MobileBottomNavigation';
import { useSelector } from 'react-redux';
import Loader from '../common/Loader';
/**
 * This component is the layout for the authenticated pages
 * @param {*} param0
 * @returns
 */
const PrivateLayout = ({ children }) => {
  const isGlobalTransparentLoadingPrivate = useSelector(
    (state) => state?.auth?.globalTransparentLoadingPrivate,
  );

  return (
    <div className="relative">
      <div
        className="flex w-full flex-col bg-fixed bg-bottom bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${Background})` }}
      >
        {/* The header component */}
        <PrivateHeader />

        <div className="px-0 md:px-[5%] mt-[61px] flex-grow grid grid-cols-12 gap-5 ">
          {/* This is a common sidebar that should be on all private authenticated pages */}
          <div className="hidden md:block col-span-2 md:col-span-1 lg:col-span-3 sticky top-[61px] z-40 py-[14px] h-fit">
            {/* The profile info - image, name etc. */}
            <ProfileContainer />

            <Card classNames="lg:mt-6">
              {/* Navigation sidebar */}
              <LeftNavigation />
            </Card>
          </div>
          <div className="col-span-12 md:col-span-8 min-h-[calc(100vh-61px)] h-fit overflow-y-auto lg:col-span-6 md:py-[14px] mb-[60px] md:mb-0">
            {children}

            <MobileBottomNavigation />
          </div>
          <div className="hidden md:block md:col-span-3 col-span-3 py-[14px] h-fit sticky top-[61px] z-40">
            <NotificationSection />
          </div>
        </div>
      </div>
      {isGlobalTransparentLoadingPrivate ? (
        <div className="fixed top-0 left-0 bg-[#b3b3b366] h-screen w-screen z-50 pointer-events-none">
          <Loader />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default PrivateLayout;
