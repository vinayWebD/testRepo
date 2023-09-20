import './style.scss';
import PropTypes from 'prop-types';
import { ArrowIcon } from '../Icons/ArrowIcon';

export const NormalButton = ({ label, isIcon = false }) => {
  return (
    <button className="primary-btn">
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
export const TransparentButton = ({ label, className }) => {
  return <button className={`trans-btn ${className}`}>{label}</button>;
};

TransparentButton.propTypes = {
  label: PropTypes.string,
};
