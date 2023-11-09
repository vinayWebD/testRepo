/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import location from '../../assets/images/location.svg';
import mail from '../../assets/images/mail.svg';
import edit from '../../assets/images/editIcon.svg';
import ThreeDots from '../Icons/ThreeDots';
import Dropdown from '../common/Dropdown';
import OutlinedButton from '../common/OutlinedButton';

const ProfileContainer = ({ userData, isOtherUser = false }) => {
  return (
    <Card classNames="lg:block py-4 px-2 md:px-4 relative">
      <div className="block gap-4">
        {!isOtherUser ? (
          <div className="bg-iconBackground p-1 rounded w-fit absolute right-[5%]">
            <img src={edit} alt="edit" className="cursor-pointer" />
          </div>
        ) : (
          <div className="p-1 rounded w-fit absolute right-[5%]">
            <Dropdown
              IconComponent={ThreeDots}
              options={[
                { name: 'Report', action: () => {} },
                { name: 'Block', action: () => {} },
              ]}
            />
          </div>
        )}

        <Avatar
          classNames="w-[40%] h-[40%] max-w-[100px] max-h-[100px] m-auto"
          image={userData?.profilePictureUrl}
          name={`${userData?.firstName} ${userData?.lastName}`}
        />
        <div className="flex flex-col gap-1 overflow-hidden text-center pt-2">
          <p className="text-greydark text-[14px] md:text-[20px] font-semibold overflow-hidden truncate capitalize">
            {userData?.firstName} {userData?.lastName}
          </p>
          <h4 className="font-normal text-greydark text-[12px] md:text-[14px]">
            {userData?.designation}
          </h4>
          {userData?.location && (
            <h6 className="flex font-normal text-greydark text-[8px] md:text-[10px] justify-center items-center">
              <img src={location} alt="location" className="pr-1" />
              {userData?.location}
            </h6>
          )}
          <h6 className="flex font-normal text-greydark text-[8px] md:text-[10px] justify-center items-center">
            <img src={mail} alt="mail" className="pr-1" />
            {userData?.email}
          </h6>
          <div
            className="font-medium text-[8px] md:text-[10px] leading-3"
            style={{ color: '#A1A0A0' }}
          >
            {userData?.description}
          </div>
          {isOtherUser && (
            <div className="flex gap-[7%] justify-center mt-2">
              <OutlinedButton label={'Message'} />
              <OutlinedButton
                label={'Follow'}
                additionalClassNames="!bg-blueprimary text-white text-[16px]"
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProfileContainer;
