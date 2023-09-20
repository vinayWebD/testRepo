import React from 'react';
import Avatar from '../../components/common/Avatar';
import SearchInput from '../../components/common/SearchInput';
import DownCaret from '../../components/Icons/DownCaret';
import HeaderLogoIcon from '../../components/Icons/HeaderLogoIcon';
import useDeviceType from '../../hooks/useDeviceType';

const HomePage = () => {
  const deviceType = useDeviceType();

  return (
    <div>
      <div className="bg-darkblue py-[14px] h-[61px] flex px-[5%] justify-between items-center ">
        <HeaderLogoIcon />
        <div className="flex gap-[20px]">
          {
            // Hide the search input bar on mobile
            deviceType !== 'mobile' ? <SearchInput className="h-[32px] " /> : ''
          }

          <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
            <Avatar
              name="Purdriven"
              image="https://images.unsplash.com/photo-1580483046931-aaba29b81601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnVzc2lhbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            />
            <DownCaret />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
