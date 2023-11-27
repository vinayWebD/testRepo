import React from 'react';
import PrivateHeader from '../common/PrivateHeader';
import Background from '../../assets/images/private-background.svg';
import { useSelector } from 'react-redux';
import Loader from '../common/Loader';

/**
 * This component is the layout for the authenticated pages
 * @param {*} param0
 * @returns
 */
const ProfileLayout = ({ children }) => {
  const isGlobalTransparentLoadingPrivate = useSelector(
    (state) => state?.auth?.globalTransparentLoadingPrivate,
  );

  return (
    <div className="relative">
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

export default ProfileLayout;
