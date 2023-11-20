import FeedIcon from '../components/Icons/FeedIcon';
import MessagesIcon from '../components/Icons/MessagesIcon';
import MyNetworkIcon from '../components/Icons/MyNetworkIcon';
import NotificationIcon from '../components/Icons/NotificationIcon';
import SettingsIcon from '../components/Icons/SettingsIcon';
import { PRIVATE_NAVIGATION_LABELS } from './lang';
import { PATHS } from './urlPaths';

const { NAVLBL_FEED, NAVLBL_MY_NETWORK, NAVLBL_MESSAGES, NAVLBL_NOTIFICATIONS, NAVLBL_SETTINGS } =
  PRIVATE_NAVIGATION_LABELS;
const { MYNETWORK, HOME, MY_NOTIFICATION, SETTINGS } = PATHS;

const navigationItems = [
  {
    label: NAVLBL_FEED,
    action: () => {},
    navPath: HOME,
    icon: (props) => <FeedIcon {...props} />,
  },
  {
    label: NAVLBL_MY_NETWORK,
    action: () => {},
    navPath: MYNETWORK,
    icon: (props) => <MyNetworkIcon {...props} />,
  },
  {
    label: NAVLBL_MESSAGES,
    action: () => {},
    icon: (props) => <MessagesIcon {...props} />,
  },
  {
    label: NAVLBL_NOTIFICATIONS,
    navPath: MY_NOTIFICATION,
    action: () => {},
    icon: (props) => <NotificationIcon {...props} />,
  },

  {
    label: NAVLBL_SETTINGS,
    navPath: SETTINGS,
    action: () => {},
    icon: (props) => <SettingsIcon {...props} />,
  },
];

export default navigationItems;
