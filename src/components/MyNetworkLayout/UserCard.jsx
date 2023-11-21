import React from 'react';
import Avatar from '../common/Avatar';
import OutlinedButton from '../common/OutlinedButton';
import userimg from '../../assets/images/user.png';
import LocationIcon from '../Icons/LocationIcon';
import ChatIcon from '../Icons/ChatIcon';
import { Button } from '../common/Button';
// import { useNavigate } from 'react-router-dom';
// import { PATHS } from '../../constants/urlPaths';
import { BUTTON_LABELS, TABS_NAME } from '../../constants/lang';
import CrossIcon from '../Icons/Cross';
// const { PROFILE } = PATHS;
const { FOLLOWERS } = TABS_NAME;
const { BTNLBL_FOLLOW, BTNLBL_UNFOLLOW, BTNLBL_ACCEPT } = BUTTON_LABELS;

const UserCard = ({
  selectedTab,
  className = '',
  onClick = () => { },
  isFriendRequest,
  userName = 'Stev Jobs',
  location = 'San Fransico, CA',
  userImage = userimg,
  userBio = 'UiUx Designer| Media Composer | Founder of Lumina',
}) => {
  // const navigate = useNavigate();

  const handleRedirect = () => {
    /*  navigate(PROFILE); */
    console.log('navigate user profile');
  };

  return (
    <div
      className={`${className} mb-3 flex sm:justify-start min-[320px]:items-start sm:items-start gap-2 relative w-[100%] border border-borderColor rounded-lg p-2 py-5 pr-6 items-center`}
    >
      <div className=" sm:flex sm:justify-start sm:items-start ">
        <Avatar name="Stev" image={userImage} classNames="h-[52px] w-[52px] " />
      </div>
      <div className="flex justify-between   md:w-[-webkit-fill-available] md:flex-row sm:flex-col  lg:gap-x-10 relative xl:w-[-webkit-fill-available] min-[320px]:flex-col min-[320px]:gap-y-3 ">
        <div
          className="flex justify-between cursor-pointer gap-9 md:flex-row sm:flex-col sm:flex-col min-[320px]:flex-col min-[320px]:gap-y-2"
          onClick={handleRedirect}
        >
          <div>
            <h3 className="text-base text-gray-950  font-medium">{userName}</h3>
            <div className="flex gap-1">
              <LocationIcon />
              <span className="text-xs font-normal">{location}</span>
            </div>
          </div>
          <div className="font-sm md:font-medium lg:font-medium xl:w-[268px] lg:w-[150px] md:w-[268px] relative text-greydark md:font-light w-[auto] min-[320px]:font-normal min-[320px]:text-xs">
            <span>{userBio}</span>
          </div>
        </div>

        <div className="flex md:gap-5 xl:gap-x-16 lg:gap-x-6 md:gap-x-16 items-center min-[320px]:gap-x-9 ">
          <div className="cursor-pointer flex items-center">
            {isFriendRequest ? <CrossIcon /> : <ChatIcon />}
          </div>
          {selectedTab === FOLLOWERS ? (
            <Button
              label={BTNLBL_FOLLOW}
              additionalClassNames=" sm:px-[30px] sm:h-[0px] md:h-[0px] sm:py-[19px] items-center text-xs min-[320px]:p-4"
              showArrowIcon={false}
              onClick={onClick}
            />
          ) : isFriendRequest ? (
            <Button
              label={BTNLBL_ACCEPT}
              additionalClassNames=" sm:px-[30px] sm:h-[0px] md:h-[0px] sm:py-[19px] md:h-[37px] items-center text-xs min-[320px]:p-4"
              showArrowIcon={false}
              onClick={onClick}
            />
          ) : (
            <OutlinedButton
              isIcon={false}
              label={BTNLBL_UNFOLLOW}
              additionalClassNames=" sm:h-[37px] sm:p-[15px] min-[320px]:px-2 "
              onClick={onClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
