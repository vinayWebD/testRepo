import NotificationsInactiveImage from '../../assets/images/notifications-inactive-navbar.svg';
import NotificationsInactiveMobileImage from '../../assets/images/notifications-inactive-mobile-navbar.svg';
import NotificationsActiveImage from '../../assets/images/notifications-active-navbar.svg';

const NotificationIcon = ({ isActive = false, isMobile = false }) => {
  if (isActive) {
    return <img src={NotificationsActiveImage} />;
  } else if (isMobile) {
    return <img src={NotificationsInactiveMobileImage} />;
  }

  return <img src={NotificationsInactiveImage} />;
};

export default NotificationIcon;
