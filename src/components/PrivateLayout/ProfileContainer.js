import React from 'react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import { Button } from '../common/Button';
import { useSelector } from 'react-redux';

const ProfileContainer = () => {
  const userData = useSelector((state) => state.auth.user || {});

  return (
    <Card classNames="hidden lg:block py-8 px-4">
      <div className="flex gap-3 justify-center lg:justify-normal">
        <Avatar
          classNames="w-[40%] h-[40%] max-w-[72px] max-h-[72px]"
          image={userData?.profile_picture_url}
          name={`${userData?.first_name} ${userData?.last_name}`}
        />

        <div className="flex flex-col gap-1 overflow-hidden">
          <p className="text-greydark text-[14px] md:text-[20px] font-medium overflow-hidden truncate capitalize">
            {userData?.first_name} {userData?.last_name}
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
