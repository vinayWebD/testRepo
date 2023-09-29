import SettingsInactiveImage from '../../assets/images/settings-inactive-navbar.svg';
import SettingsActiveImage from '../../assets/images/settings-active-navbar.svg';

const SettingsIcon = ({ isActive = false }) => {
  if (isActive) {
    return <img src={SettingsActiveImage} />;
  }

  return <img src={SettingsInactiveImage} />;
};

export default SettingsIcon;
