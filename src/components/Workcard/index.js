import { CardGradientDivider } from '../Icons/CardGradientDivider';
import './style.scss';
import PropTypes from 'prop-types';

const WorkCard = ({ title, content }) => {
  return (
    <div className="work-card-wrap">
      <div className="card-title">{title}</div>
      <div className="card-divider">
        <span>
          <CardGradientDivider />
        </span>
      </div>
      <div className="card-content">{content}</div>
    </div>
  );
};

WorkCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};
export default WorkCard;
