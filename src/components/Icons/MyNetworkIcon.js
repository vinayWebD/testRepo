import myNetworkInactiveImage from '../../assets/images/my-network-inactive-navbar.svg';
import myNetworkInactiveMobileImage from '../../assets/images/my-network-mobile-inactive-navbar.svg';
import myNetworkActiveImage from '../../assets/images/my-network-active-navbar.svg';

const MyNetworkIcon = ({ isActive = false, isMobile = false }) => {
  if (isActive) {
    return <img src={myNetworkActiveImage} />;
  } else if (isMobile) {
    return <img src={myNetworkInactiveMobileImage} />;
  }

  return <img src={myNetworkInactiveImage} />;
};

export default MyNetworkIcon;
