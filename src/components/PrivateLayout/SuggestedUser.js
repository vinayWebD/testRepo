import React from 'react';
import SearchIcon from '../Icons/SearchIcon';
import Avatar from '../common/Avatar';

const SuggestedUser = ({ userName, userImg, userBio }) => {
  return (
    <div className="flex gap-2 p-2 px-3 pb-3 hover:bg-greylight cursor-pointer">
      <div>
        <SearchIcon color="black" />
      </div>
      <div>
        <h4 className="text-bold font-medium leading-4 ">{userName}</h4>
        <h6 className="text-xs leading-4 font-normal">{userBio}</h6>
      </div>
      <div className="flex items-center">
        <Avatar image={userImg} classNames="h-[34px] w-[34px]" />
      </div>
    </div>
  );
};

export default SuggestedUser;
