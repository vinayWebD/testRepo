import React from 'react';
import PrivateHeader from '../common/PrivateHeader';
import Background from '../../assets/images/private-background.svg';
import LeftNavigation from './LeftNavigation';
import Card from '../common/Card';
import MobileBottomNavigation from './MobileBottomNavigation';
import { useSelector } from 'react-redux';
import Loader from '../common/Loader';
/**
 * This component is the layout for the authenticated pages
 * @param {*} param0
 * @returns
 */
const SectionLayout = ({ children, activeTab = 0 }) => {
  const isGlobalTransparentLoadingPrivate = useSelector(
    (state) => state?.auth?.globalTransparentLoadingPrivate,
  );

  return (
    <div className="relative">
      <div
        className="flex w-full flex-col bg-fixed bg-bottom bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <PrivateHeader />

        <div className="add-blur-after-search px-0 md:px-[5%] mt-[61px] flex-grow grid grid-cols-12 gap-5 ">
          <div className="hidden md:block col-span-2 md:col-span-1 lg:col-span-3 sticky top-[61px] z-40 py-[14px] h-fit">

            <Card classNames="lg:mt-4">
              <LeftNavigation activeTab={activeTab} />
            </Card>
          </div>
          <div className="col-span-12 md:col-span-11 min-h-[calc(100vh-61px)] h-fit overflow-y-auto lg:col-span-9 md:py-[14px] mb-[60px] md:mb-0">
            {children}

            <MobileBottomNavigation activeTab={activeTab} />
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

export default SectionLayout;
