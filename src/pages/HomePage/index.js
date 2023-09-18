import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      Welcome {user?.first_name} {user?.last_name}!
    </div>
  );
};

export default HomePage;
