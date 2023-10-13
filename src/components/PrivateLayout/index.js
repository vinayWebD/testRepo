import React from 'react';
import PrivateHeader from '../common/PrivateHeader';
import Background from '../../assets/images/private-background.svg';
import ProfileContainer from './ProfileContainer';
import LeftNavigation from './LeftNavigation';
import Card from '../common/Card';
import AddFriendIcon from '../../components/Icons/AddFriendIcon';
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
          <div className="col-span-7 md:col-span-8 lg:col-span-6 overflow-y-auto py-[14px] ">
            {children}
          </div>
          <div className="col-span-3 py-[14px] h-fit sticky top-[61px] z-40">
            <Card>
              <div className="rounded-t-lg flex flex-col gap-2 blue-white-gradient p-3 text-white">
                <div className="flex items-center gap-2">
                  <AddFriendIcon />
                  <p className="font-semibold text-xl">Invite People</p>
                </div>
                <p className="text-sm">Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <div className="p-3 text-blueprimary text-base font-semibold text-center cursor-pointer hover:opacity-70">
                Invite Now
              </div>
            </Card>

            <Card classNames="p-3 mt-[14px]">
              <p className="font-semibold text-base">Notification</p>

              <div className="border-b border-[#DFDFDF] mt-1 py-2">
                <p className="greydark text-sm">Lorem ipsum dolor sit amet consectetur.</p>
                <p className="text-greymedium text-xs">2 Hours ago</p>
              </div>
              <div className="border-b border-[#DFDFDF] mt-1 py-2">
                <p className="greydark text-sm">
                  Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.
                </p>
                <p className="text-greymedium text-xs">2 Hours ago</p>
              </div>
              <div className="border-b border-[#DFDFDF] mt-1 py-2">
                <p className="greydark text-sm">Lorem ipsum dolor sit amet consectetur.</p>
                <p className="text-greymedium text-xs">2 Hours ago</p>
              </div>

              <div className="pt-3 text-blueprimary text-base font-semibold text-center cursor-pointer hover:opacity-70">
                View All
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
