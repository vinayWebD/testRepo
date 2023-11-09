import FeedIcon from '../components/Icons/FeedIcon';
import MessagesIcon from '../components/Icons/MessagesIcon';
import MyNetworkIcon from '../components/Icons/MyNetworkIcon';
import NotificationIcon from '../components/Icons/NotificationIcon';
import SettingsIcon from '../components/Icons/SettingsIcon';
import { PRIVATE_NAVIGATION_LABELS } from './lang';

const { NAVLBL_FEED, NAVLBL_MY_NETWORK, NAVLBL_MESSAGES, NAVLBL_NOTIFICATIONS, NAVLBL_SETTINGS } =
  PRIVATE_NAVIGATION_LABELS;

const navigationItems = [
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

export default navigationItems;
