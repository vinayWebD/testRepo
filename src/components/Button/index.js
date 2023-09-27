import './style.scss';
import PropTypes from 'prop-types';
import { ArrowIcon } from '../Icons/ArrowIcon';

export const NormalButton = ({ label, isIcon = false, onClick = { onClick } }) => {
  return (
    <button className="primary-btn" onClick={onClick}>
      {isIcon && (
        <span className="arrow-icon">
          <ArrowIcon />
        </span>
      )}
      {label}
    </button>
  );
};

NormalButton.propTypes = {
  label: PropTypes.string,
  isIcon: PropTypes.bool,
};
export const TransparentButton = ({ label, className, onClick }) => {
  return (
    <button className={`trans-btn ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

TransparentButton.propTypes = {
  label: PropTypes.string,
};
