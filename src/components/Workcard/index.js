import './style.scss';
import PropTypes from 'prop-types';

const WorkCard = ({ titleLeft, titleRight, content }) => {
  return (
    <div className="work-card-wrap">
      <div className="card-title">
        <span className="left mr-1">{titleLeft}</span>
        <span className="right">{titleRight}</span>
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
