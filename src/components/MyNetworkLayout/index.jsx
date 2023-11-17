import React from 'react';

import Background from '../../assets/images/private-background.svg';
import PrivateHeader from '../common/PrivateHeader';
import MobileBottomNavigation from '../PrivateLayout/MobileBottomNavigation';
import LeftNavigation from '../PrivateLayout/LeftNavigation';
import Card from '../common/Card';

const MyNetworkLayout = ({ children, page }) => {
  return (
    <div>
      <div
        className="flex w-full flex-col min-h-[100vh] bg-fixed bg-bottom"
        style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover' }}
      >
        {/* The header component */}
        <PrivateHeader />

        <div className="lg:px-[5%]   lg:flex-grow grid md:grid-cols-12 lg:gap-5 mt-[61px]">
          <div className="col-span-10 md:col-span-12 xs:col-span-12 sm:col-span-12 lg:col-span-4 xl:col-span-3 lg:sticky top-[61px] z-40 lg:h-fit	">
            <div className="hidden lg:block col-span-2  lg:col-span-3 sticky top-[61px] z-40 py-[16px] h-fit">
              <Card classNames="lg:my-2">
                {/* Navigation sidebar */}
                <LeftNavigation page={page} />
              </Card>
            </div>
          </div>
          {children}
          <MobileBottomNavigation />
        </div>
      </div>
    </div>
  );
};

export default MyNetworkLayout;
