import React from 'react';
import PrivateHeader from '../common/PrivateHeader';
import Background from '../../assets/images/private-background.svg';
import ProfileContainer from './ProfileContainer';
import LeftNavigation from './LeftNavigation';
import Card from '../common/Card';

/**
 * This component is the layout for the authenticated pages
 * @param {*} param0
 * @returns
 */
const PrivateLayout = ({ children }) => {
  return (
    <div>
      <div
        className="flex w-full flex-col min-h-[150vh] bg-fixed bg-bottom bg-cover"
        style={{ backgroundImage: `url(${Background})` }}
      >
        {/* The header component */}
        <PrivateHeader />

        <div className="px-[5%] flex-grow grid grid-cols-12 gap-5 mt-[61px]">
          {/* This is a common sidebar that should be on all private authenticated pages */}
          <div className="py-[14px] h-fit col-span-2 md:col-span-1 lg:col-span-3 sticky top-[61px] z-40">
            {/* The profile info - image, name etc. */}
            <ProfileContainer />

            <Card classNames="lg:mt-6">
              {/* Navigation sidebar */}
              <LeftNavigation />
            </Card>
          </div>
          <div className="col-span-10 md:col-span-11 lg:col-span-9 overflow-y-auto py-[14px] ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
