/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Card from '../common/Card';

const FollowerContainer = ({ followersCount = 0, followingCount = 0, connectionsCount = 0 }) => {
  return (
    <Card classNames="lg:block py-6 px-1 md:px-4 my-5">
      <div className="block gap-4">
        <div className="flex justify-around gap-4 overflow-hidden text-center">
          <div className="block">
            <div className="font-normal text-greydark text-[11px] md:text-[12px] xl:text-[13px]">
              {followersCount}
            </div>
            <div className="font-normal text-greylight text-[11px] md:text-[12px] xl:text-[13px]">
              {followersCount > 1 ? 'Followers' : 'Follower'}
            </div>
          </div>
          <div className="block border-r border-greymedium"></div>
          <div className="block">
            <div className="font-normal text-greydark text-[11px] md:text-[12px] xl:text-[13px]">
              {followingCount}
            </div>
            <div className="font-normal text-greylight text-[11px] md:text-[12px] xl:text-[13px]">
              Following
            </div>
          </div>
          <div className="block border-greymedium border-l"></div>
          <div className="block">
            <div className="font-normal text-greydark text-[11px] md:text-[12px] xl:text-[13px]">
              {connectionsCount}
            </div>
            <div className="font-normal text-greylight text-[11px] md:text-[12px] xl:text-[13px]">
              {connectionsCount > 1 ? 'Connections' : 'Connection'}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FollowerContainer;
