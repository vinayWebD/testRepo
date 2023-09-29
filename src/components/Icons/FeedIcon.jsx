import FeedInactiveImage from '../../assets/images/feed-inactive-navbar.svg';
import FeedActiveImage from '../../assets/images/feed-active-navbar.svg';

const FeedIcon = ({ isActive = false }) => {
  if (isActive) {
    return <img src={FeedActiveImage} />;
  }

  return <img src={FeedInactiveImage} />;
};

export default FeedIcon;
