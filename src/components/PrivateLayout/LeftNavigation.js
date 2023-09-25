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
    <div className="flex flex-col py-4">
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
    className={`p-4 border-l-[6px] border-white cursor-pointer flex items-center gap-2 ${
      isActive ? 'active-nav-left-side-bar bg-whitelight' : ''
    }`}
    onClick={onClickHandler}
  >
    <Icon isActive={isActive} />
    <p className="text-sm font-semibold">{label}</p>
  </div>
);
