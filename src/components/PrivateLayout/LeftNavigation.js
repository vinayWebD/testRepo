// import { NavLink } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import navigationItems from '../../constants/navigationItems';

const navbarItems = navigationItems;

const LeftNavigation = ({ page }) => {
  return (
    <div className="flex flex-col py-4 gap-4 lg:gap-0 md:items-center">
      {navbarItems.map(({ label, action, navPath, icon }, _i) => {
        return (
          <NavBarItem
            label={label}
            onClickHandler={action}
            key={_i}
            isActive={label === page}
            Icon={icon}
            navPath={navPath}
          />
        );
      })}
    </div>
  );
};

export default LeftNavigation;

const NavBarItem = ({
  onClickHandler = () => {},
  label = '',
  isActive = false,
  navPath,
  Icon = () => <></>,
}) => (
  <NavLink to={navPath} className="w-[-webkit-fill-available]">
    <div
      className={`
      w-full p-1 lg:p-4 pr-[5px] md:pr-[8px] border-l-[3px] md:border-l-4 lg:border-l-[6px] box-border border-white cursor-pointer flex items-center justify-center lg:justify-normal gap-4 ${
        isActive ? 'active-nav-left-side-bar bg-whitelight' : ''
      }`}
      onClick={onClickHandler}
    >
      <Icon isActive={isActive} />
      <p className="text-sm font-semibold hidden lg:block">{label}</p>
    </div>
  </NavLink>
);
