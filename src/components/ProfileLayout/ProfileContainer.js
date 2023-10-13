/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import location from '../../assets/images/location.svg';
import mail from '../../assets/images/mail.svg';
import edit from '../../assets/images/editIcon.svg';

const ProfileContainer = ({ userData }) => {
  return (
    <Card classNames="lg:block py-4 px-2 md:px-4 relative">
      <div className="block gap-4">
        <div className='bg-iconBackground p-1 rounded w-fit absolute right-[5%]'>
          <img src={edit} alt="edit" />
        </div>
        <Avatar
          classNames="w-[40%] h-[40%] max-w-[100px] max-h-[100px] m-auto"
          image={userData?.profile_picture_url}
        />
        <div className="flex flex-col gap-1 overflow-hidden text-center pt-2">
          <p className="text-greydark text-[14px] md:text-[20px] font-medium overflow-hidden truncate capitalize">
            {userData?.first_name} {userData?.last_name}
          </p>
          <h4 className="font-normal text-greydark text-[12px] md:text-[14px]">
            UI/UX Designer | Influencer at Masco{' '}
          </h4>
          <h6 className="flex font-normal text-greydark text-[8px] md:text-[10px] justify-center items-center">
            <img src={location} alt="location" className='pr-1' />{userData?.location}
          </h6>
          <h6 className="flex font-normal text-greydark text-[8px] md:text-[10px] justify-center items-center">
            <img src={mail} alt="mail" className='pr-1' />{userData?.email}
          </h6>
          <div className="font-normal text-greylight text-[8px] md:text-[10px] leading-3">
            LoremI contributed to diverse projects by crafting compelling visual assets in alignment with the brand's identity. I collaborated closely with cross-functional teams to conceptualize and refine user interfaces, enhancing overall user experience. I played a key role in producing impactful marketing materials, including social media graphics and promotional visuals.
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileContainer;
