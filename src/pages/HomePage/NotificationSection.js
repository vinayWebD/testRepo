import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import AddFriendIcon from '../../components/Icons/AddFriendIcon';
import { PATHS } from '../../constants/urlPaths';

const NotificationSection = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Card>
        <div className="rounded-t-lg flex flex-col gap-2 blue-white-gradient p-3 text-white">
          <div className="flex items-center gap-2">
            <AddFriendIcon />
            <p className="font-semibold text-xl">Invite People</p>
          </div>
          <p className="text-sm">Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <div className="p-3 text-blueprimary text-base font-semibold text-center cursor-pointer hover:opacity-70">
          Invite Now
        </div>
      </Card>

      <Card classNames="p-3 mt-[14px]">
        <p className="font-semibold text-base">Notification</p>

        <div className="border-b border-[#DFDFDF] mt-1 py-2">
          <p className="greydark text-sm">Lorem ipsum dolor sit amet consectetur.</p>
          <p className="text-greymedium text-xs">2 Hours ago</p>
        </div>
        <div className="border-b border-[#DFDFDF] mt-1 py-2">
          <p className="greydark text-sm">
            Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.
          </p>
          <p className="text-greymedium text-xs">2 Hours ago</p>
        </div>
        <div className="border-b border-[#DFDFDF] mt-1 py-2">
          <p className="greydark text-sm">Lorem ipsum dolor sit amet consectetur.</p>
          <p className="text-greymedium text-xs">2 Hours ago</p>
        </div>

        <div
          className="pt-3 text-blueprimary text-base font-semibold text-center cursor-pointer hover:opacity-70"
          onClick={() => navigate(PATHS.MY_NOTIFICATION)}
        >
          View All
        </div>
      </Card>
    </div>
  );
};

export default NotificationSection;
