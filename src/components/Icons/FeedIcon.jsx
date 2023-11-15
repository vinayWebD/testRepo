import FeedInactiveImage from '../../assets/images/feed-inactive-navbar.svg';
import FeedActiveImage from '../../assets/images/feed-active-navbar.svg';
import FeedMobileInactiveImage from '../../assets/images/feed-inactive-mobile-navbar.svg';

const FeedIcon = ({ isActive = false, isMobile = false }) => {
  if (isActive) {
    return <img src={FeedActiveImage} />;
  } else if (isMobile) {
    return <img src={FeedMobileInactiveImage} />;
  }

  return <img src={FeedInactiveImage} />;
};

export default FeedIcon;
