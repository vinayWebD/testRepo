import NotificationsInactiveImage from '../../assets/images/notifications-inactive-navbar.svg';
import NotificationsActiveImage from '../../assets/images/notifications-active-navbar.svg';

const NotificationIcon = ({ isActive = false }) => {
  if (isActive) {
    return <img src={NotificationsActiveImage} />;
  }

  return <img src={NotificationsInactiveImage} />;
};

export default NotificationIcon;
