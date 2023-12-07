import React from 'react';
import Card from '../common/Card';

const FollowerContainer = ({
  followerCount = 0,
  followingCount = 0,
  connectionCount = 0,
  onFollowersClick = () => {},
  onFollowingClick = () => {},
  onConnectionsClick = () => {},
}) => {
  return (
    <Card classNames="lg:block py-6 px-1 md:px-4 my-5">
      <div className="block gap-4">
        <div className="flex justify-around gap-4 overflow-hidden text-center">
          <div className="block cursor-pointer" onClick={onFollowersClick}>
            <div className="font-normal text-greydark text-[11px] md:text-[12px] xl:text-[13px]">
              {followerCount}
            </div>
            <div className="font-normal text-greylight text-[11px] md:text-[12px] xl:text-[13px]">
              {followerCount > 1 ? 'Followers' : 'Follower'}
            </div>
          </div>
          <div className="block border-r border-greymedium"></div>
          <div className="block cursor-pointer" onClick={onFollowingClick}>
            <div className="font-normal text-greydark text-[11px] md:text-[12px] xl:text-[13px]">
              {followingCount}
            </div>
            <div className="font-normal text-greylight text-[11px] md:text-[12px] xl:text-[13px]">
              Following
            </div>
          </div>
          <div className="block border-greymedium border-l"></div>
          <div className="block cursor-pointer" onClick={onConnectionsClick}>
            <div className="font-normal text-greydark text-[11px] md:text-[12px] xl:text-[13px]">
              {connectionCount}
            </div>
            <div className="font-normal text-greylight text-[11px] md:text-[12px] xl:text-[13px]">
              {connectionCount > 1 ? 'Connections' : 'Connection'}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FollowerContainer;
