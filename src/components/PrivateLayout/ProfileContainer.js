import React from 'react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import { Button } from '../common/Button';

const ProfileContainer = () => {
  return (
    <Card classNames="py-8 px-4">
      <div className="flex gap-3">
        <Avatar
          classNames="w-[72px] h-[72px]"
          image="https://images.unsplash.com/photo-1580483046931-aaba29b81601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnVzc2lhbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
        />

        <div className="flex flex-col gap-1 overflow-hidden">
          <p className="text-greydark text-[14px] md:text-[20px] font-medium overflow-hidden truncate">
            Toshi Medatwal
          </p>
          <h4 className="font-normal text-greylight text-[12px] md:text-[14px]">
            UI/UX Designer | Influencer at Masco{' '}
          </h4>

          <Button
            label="View Profile"
            additionalClassNames="mt-2 pl-0 pr-0"
            showArrowIcon={false}
          />
        </div>
      </div>
    </Card>
  );
};

export default ProfileContainer;
