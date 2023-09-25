import myNetworkInactiveImage from '../../assets/images/my-network-inactive-navbar.svg';
import myNetworkActiveImage from '../../assets/images/my-network-active-navbar.svg';

const MyNetworkIcon = ({ isActive = false }) => {
  if (isActive) {
    return <img src={myNetworkActiveImage} />;
  }

  return <img src={myNetworkInactiveImage} />;
};

export default MyNetworkIcon;
