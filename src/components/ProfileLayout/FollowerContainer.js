/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Card from '../common/Card';

const FollowerContainer = () => {
  return (
    <Card classNames="lg:block py-6 px-1 md:px-4 my-5">
      <div className="block gap-4">

        <div className="flex justify-around gap-4 overflow-hidden text-center">
          <div className='block'>
            <div className='font-normal text-greydark text-[11px] font-semibold md:text-[12px] xl:text-[13px]'>53</div>
            <div className='font-normal text-greylight text-[11px] md:text-[12px] xl:text-[13px]'>Followers</div>
          </div>
          <div className='block border-r border-greymedium'></div>
          <div className='block'>
            <div className='font-normal text-greydark text-[11px] font-semibold md:text-[12px] xl:text-[13px]'>76</div>
            <div className='font-normal text-greylight text-[11px] md:text-[12px] xl:text-[13px]'>Following</div>
          </div>
          <div className='block border-greymedium border-l'></div>
          <div className='block'>
            <div className='font-normal text-greydark text-[11px] font-semibold md:text-[12px] xl:text-[13px]'>23</div>
            <div className='font-normal text-greylight text-[11px] md:text-[12px] xl:text-[13px]'>Connection</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FollowerContainer;
