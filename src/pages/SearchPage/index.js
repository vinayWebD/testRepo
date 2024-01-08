import React from 'react';
import ProfileLayout from '../../components/ProfileLayout';
import SidebarSearch from '../../components/FilterComponent';
// import SidebarSearch from '../../components/sidebarSearch';

const SearchPage = () => {
  console.log('hello');
  return (
    <ProfileLayout>
      <div>
        <SidebarSearch />
      </div>
    </ProfileLayout>
  );
};

export default SearchPage;
