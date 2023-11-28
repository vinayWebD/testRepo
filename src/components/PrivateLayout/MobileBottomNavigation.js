import React from 'react';
// import { PRIVATE_NAVIGATION_LABELS } from '../../constants/lang';
import navigationItems from '../../constants/navigationItems';
import { NavLink } from 'react-router-dom';

// const { NAVLBL_NOTIFICATIONS } =
//   PRIVATE_NAVIGATION_LABELS;

const navbarItems = navigationItems;

const MobileBottomNavigation = ({ activeTab = 0 }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-49  md:hidden h-[60px] bg-darkblue flex py-4 gap-4 lg:gap-0 md:items-center">
      {navbarItems.map(({ label, action, icon, navPath }, _i) => {
        return (
          <NavBarItem
            label={label}
            onClickHandler={action}
            key={label}
            isActive={_i === activeTab}
            Icon={icon}
            navPath={navPath}
          />
        );
      })}
    </div>
  );
};

export default MobileBottomNavigation;

const NavBarItem = ({
  onClickHandler = () => { },
  label = '',
  isActive = false,
  navPath,
  Icon = () => <></>,
}) => (
  <NavLink to={navPath} className="w-[-webkit-fill-available]">
    <div
      className={`
      w-full p-1 lg:p-4 pr-[5px] md:pr-[8px] box-border cursor-pointer flex items-center justify-center lg:justify-normal gap-4`}
      onClick={onClickHandler}
    >
      <Icon isActive={isActive} isMobile={true}
      // pending={label === NAVLBL_NOTIFICATIONS && localStorage.getItem('newNotification') === 'true'} 
      />
      <p className="text-sm font-semibold hidden lg:block">{label}</p>
    </div>
  </NavLink>
);
