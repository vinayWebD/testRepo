import MessagesInactiveImage from '../../assets/images/message-inactive-navbar.svg';
import MessagesActiveImage from '../../assets/images/message-active-navbar.svg';

const MessagesIcon = ({ isActive = false }) => {
  if (isActive) {
    return <img src={MessagesActiveImage} />;
  }

  return <img src={MessagesInactiveImage} />;
};

export default MessagesIcon;
