import React from 'react';
import PrivateHeader from '../common/PrivateHeader';
import Background from '../../assets/images/private-background.svg';

/**
 * This component is the layout for the authenticated pages
 * @param {*} param0
 * @returns
 */
const ProfileLayout = ({ children }) => {
  return (
    <div>
      <div
        className="flex w-full flex-col min-h-[100vh] bg-fixed bg-bottom"
        style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover' }}
      >
        {/* The header component */}
        <PrivateHeader />

        <div className="add-blur-after-search px-[3%] md:px-[5%] flex-grow grid md:grid-cols-12 gap-5 mt-[61px]">
          {/* This is a common sidebar that should be on all private authenticated pages */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
