import MessagesInactiveImage from '../../assets/images/message-inactive-navbar.svg';
import MessagesInactiveMobileImage from '../../assets/images/message-inactive-mobile-navbar.svg';
import MessagesActiveImage from '../../assets/images/message-active-navbar.svg';

const MessagesIcon = ({ isActive = false, isMobile = false }) => {
  if (isActive) {
    return <img src={MessagesActiveImage} />;
  } else if (isMobile) {
    return <img src={MessagesInactiveMobileImage} />;
  }

  return <img src={MessagesInactiveImage} />;
};

export default MessagesIcon;
