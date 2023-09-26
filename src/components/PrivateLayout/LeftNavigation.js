import { PRIVATE_NAVIGATION_LABELS } from '../../constants/lang';
import FeedIcon from '../Icons/FeedIcon';
import MessagesIcon from '../Icons/MessagesIcon';
import MyNetworkIcon from '../Icons/MyNetworkIcon';
import NotificationIcon from '../Icons/NotificationIcon';
import SettingsIcon from '../Icons/SettingsIcon';

const { NAVLBL_FEED, NAVLBL_MY_NETWORK, NAVLBL_MESSAGES, NAVLBL_NOTIFICATIONS, NAVLBL_SETTINGS } =
  PRIVATE_NAVIGATION_LABELS;

const navbarItems = [
  {
    label: NAVLBL_FEED,
    action: () => {},
    icon: (props) => <FeedIcon {...props} />,
  },
  {
    label: NAVLBL_MY_NETWORK,
    action: () => {},
    icon: (props) => <MyNetworkIcon {...props} />,
  },
  {
    label: NAVLBL_MESSAGES,
    action: () => {},
    icon: (props) => <MessagesIcon {...props} />,
  },
  {
    label: NAVLBL_NOTIFICATIONS,
    action: () => {},
    icon: (props) => <NotificationIcon {...props} />,
  },

  {
    label: NAVLBL_SETTINGS,
    action: () => {},
    icon: (props) => <SettingsIcon {...props} />,
  },
];

const LeftNavigation = () => {
  return (
    <div className="flex flex-col py-4 gap-4 lg:gap-0 md:items-center">
      {navbarItems.map(({ label, action, icon }, _i) => {
        return (
          <NavBarItem
            label={label}
            onClickHandler={action}
            key={label}
            isActive={_i === 0}
            Icon={icon}
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
  Icon = () => <></>,
}) => (
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
);
