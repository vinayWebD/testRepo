/* eslint-disable no-dupe-else-if */
import NotificationsInactiveImage from '../../assets/images/notifications-inactive-navbar.svg';
import NotificationsInactiveMobileImage from '../../assets/images/notifications-inactive-mobile-navbar.svg';
import NotificationsActiveImage from '../../assets/images/notifications-active-navbar.svg';
import NotificationsActiveImageNew from '../../assets/images/newNotification.svg';
import NotificationsMobileNew from '../../assets/images/mobileNewNoti.svg';

const NotificationIcon = ({ isActive = false, isMobile = false, pending }) => {
  if (isActive) {
    return <img src={NotificationsActiveImage} />;
  } else if (isMobile) {
    return <img src={pending ? NotificationsMobileNew : NotificationsInactiveMobileImage} />;
  }

  return <img src={pending ? NotificationsActiveImageNew : NotificationsInactiveImage} />;
};

export default NotificationIcon;
