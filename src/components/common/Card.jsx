import React from 'react';

const Card = ({ children, classNames = '', bottomNotRound }) => {
  return <div
    className={`bg-white ${bottomNotRound ? 'rounded-t-lg' : 'rounded-lg'} shadow-card ${classNames}`}
  >{children}</div>;
};

export default Card;
