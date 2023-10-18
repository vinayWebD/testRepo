import SettingsInactiveImage from '../../assets/images/settings-inactive-navbar.svg';
import SettingsInactiveMobileImage from '../../assets/images/settings-inactive-mobile-navbar.svg';
import SettingsActiveImage from '../../assets/images/settings-active-navbar.svg';

const SettingsIcon = ({ isActive = false, isMobile = false }) => {
  if (isActive) {
    return <img src={SettingsActiveImage} />;
  } else if (isMobile) {
    return <img src={SettingsInactiveMobileImage} />;
  }

  return <img src={SettingsInactiveImage} />;
};

export default SettingsIcon;
