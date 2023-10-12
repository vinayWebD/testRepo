import { useDispatch, useSelector } from 'react-redux';
import useDeviceType from '../../hooks/useDeviceType';
import HeaderLogoIcon from '../Icons/HeaderLogoIcon';
import Avatar from './Avatar';
import SearchInput from './SearchInput';
import { updateSearch } from '../../redux/slices/appSearchSlice';
import Dropdown from './Dropdown';
import DownCaret from '../Icons/DownCaret';
import { logoutDispatcher } from '../../redux/dispatchers/authDispatcher';
import { DROPDOWN_OPTION_LABELS } from '../../constants/lang';
import AddFriendIcon from '../Icons/AddFriendIcon';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';

const { DDLBL_LOGOUT } = DROPDOWN_OPTION_LABELS;
const { HOME } = PATHS;

const DropDownParent = ({ userData = {} }) => {
  const { first_name = '', last_name = '', profile_picture_url = '' } = userData;

  return (
    <div className="flex items-center gap-1 cursor-pointer">
      <Avatar name={`${first_name} ${last_name}`} image={profile_picture_url} />
      <DownCaret />
    </div>
  );
};

const PrivateHeader = () => {
  const deviceType = useDeviceType();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchValue = '' } = useSelector((state) => state?.appSearch || {});
  const userData = useSelector((state) => state?.auth?.user) || {};

  const searchInputChangeHandler = (val) => {
    dispatch(updateSearch({ searchValue: val }));
  };

  const OPTIONS = [
    {
      name: DDLBL_LOGOUT,
      action: () => dispatch(logoutDispatcher()),
    },
  ];

  return (
    <div className="bg-darkblue py-[14px] h-[61px] flex px-[5%] justify-between items-center fixed top-0 w-full left-0 z-50">
      <span onClick={() => navigate(HOME)} className="cursor-pointer">
        <HeaderLogoIcon />
      </span>
      <div className="flex gap-7 items-center">
        {
          // Hide the search input bar on mobile
          deviceType !== 'mobile' ? (
            <SearchInput
              className="h-[32px] w-[290px]"
              onChange={searchInputChangeHandler}
              value={searchValue}
            />
          ) : (
            ''
          )
        }

        <AddFriendIcon />

        <Dropdown options={OPTIONS} IconComponent={() => <DropDownParent userData={userData} />} />
      </div>
    </div>
  );
};

export default PrivateHeader;
