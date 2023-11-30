import React from 'react';
import SearchIcon from '../Icons/SearchIcon';
import Avatar from '../common/Avatar';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';
import { updateSearch } from '../../redux/slices/appSearchSlice';
import { useDispatch } from 'react-redux';

const { OTHER_USER_PROFILE } = PATHS;

const SuggestedUser = ({
  userFullName,
  userImg,
  userBio,
  userId,
  closePopupHandler = () => {},
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickHandler = async () => {
    await navigate(`${OTHER_USER_PROFILE}${userId}`);
    await closePopupHandler();
    await dispatch(updateSearch({ searchValue: '' }));
    await window.location.reload();
  };

  return (
    <div className="flex gap-2 p-3 hover:bg-greylighter cursor-pointer" onClick={onClickHandler}>
      <div>
        <SearchIcon color="black" />
      </div>
      <div>
        <h4 className="text-bold font-medium leading-4 ">{userFullName}</h4>
        <h6 className="text-xs leading-4 font-normal">{userBio}</h6>
      </div>
      <div className="flex items-center">
        <Avatar image={userImg} name={userFullName} classNames="h-[34px] w-[34px]" />
      </div>
    </div>
  );
};

export default SuggestedUser;
