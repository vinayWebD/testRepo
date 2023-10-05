import React from 'react';

const Card = ({ children, classNames = '' }) => {
  return <div className={`bg-white rounded-lg shadow-card ${classNames}`}>{children}</div>;
};

export default Card;
