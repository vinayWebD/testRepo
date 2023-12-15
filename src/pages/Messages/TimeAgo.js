import React, { useEffect, useState } from 'react';

const TimeAgo = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      if (!timestamp) {
        setTimeAgo('');
        return;
      }
      const now = Math.floor(Date.now() / 1000);
      const difference = now - timestamp;

      if (difference < 60) {
        setTimeAgo(`${difference}s`);
      } else if (difference < 3600) {
        const minutes = Math.floor(difference / 60);
        setTimeAgo(`${minutes}m`);
      } else if (difference < 86400) {
        const hours = Math.floor(difference / 3600);
        setTimeAgo(`${hours}h`);
      } else if (difference < 172800) {
        setTimeAgo('Yesterday');
      } else {
        const date = new Date(timestamp * 1000);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
        setTimeAgo(formattedDate);
      }
    };
    calculateTimeAgo();
    const intervalId = setInterval(() => {
      calculateTimeAgo();
    }, 60000);
    return () => clearInterval(intervalId);
  }, [timestamp]);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
