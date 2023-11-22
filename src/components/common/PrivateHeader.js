import { useDispatch, useSelector } from 'react-redux';
import useDeviceType from '../../hooks/useDeviceType';
import HeaderLogoIcon from '../Icons/HeaderLogoIcon';
import Avatar from './Avatar';
import SearchInput from './SearchInput';
import { updateSearch } from '../../redux/slices/appSearchSlice';
import Dropdown from './Dropdown';
import DownCaret from '../Icons/DownCaret';
import { logoutDispatcher } from '../../redux/dispatchers/authDispatcher';
import { DROPDOWN_OPTION_LABELS, BUTTON_LABELS } from '../../constants/lang';
import AddFriendIcon from '../Icons/AddFriendIcon';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';
import SearchIcon from '../Icons/SearchIcon';
import ConfirmationModal from '../Modal/ConfirmationModal';
import { useState } from 'react';
import FriendRequestsBar from './FriendRequestsBar';
import SuggestedSearch from '../PrivateLayout/SuggestedSearch';

const { DDLBL_LOGOUT, DDLBL_MY_PROFILE } = DROPDOWN_OPTION_LABELS;
const { HOME, LOGIN } = PATHS;
const { BTNLBL_FRIEND_REQUESTS } = BUTTON_LABELS;

const DropDownParent = ({ userData = {} }) => {
  const { firstName = '', lastName = '', profilePictureUrl = '' } = userData;

  return (
    <div className="flex items-center gap-1 cursor-pointer">
      <Avatar name={`${firstName} ${lastName}`} image={profilePictureUrl} />
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
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isFriendRequestModalOpen, setIsFriendRequestModalOpen] = useState(false);
  const [isSuggestUserOpen, setIsSuggestUserOpen] = useState(false);

  const searchInputChangeHandler = (val) => {
    deviceType !== 'mobile' ? (val ? setIsSuggestUserOpen(true) : setIsSuggestUserOpen(false)) : {};
    dispatch(updateSearch({ searchValue: val }));
  };

  const OPTIONS = [
    {
      name: DDLBL_MY_PROFILE,
      action: () => {
        navigate(PATHS.PROFILE);
        window.location.reload();
      },
    },
    {
      name: DDLBL_LOGOUT,
      action: () => setIsLogoutModalOpen(true),
    },
  ];

  const onClickLogoHandler = () => {
    window.scrollTo(0, 0);
    navigate(HOME);
  };

  return (
    <div
      className=" bg-darkblue py-[14px] h-[61px] flex px-[5%] justify-between items-center fixed top-0 w-full left-0 z-50"
      style={{ zIndex: 333 }}
    >
      <span onClick={() => onClickLogoHandler()} className="cursor-pointer">
        <HeaderLogoIcon />
      </span>
      <div className="flex gap-7 items-center">
        {
          // Hide the search input bar on mobile
          deviceType !== 'mobile' ? (
            <div className="relative">
              <SearchInput
                className="h-[32px] w-[290px] placeholder:text-white"
                onChange={searchInputChangeHandler}
                value={searchValue}
              />
              <SuggestedSearch
                isOpen={isSuggestUserOpen}
                onClose={() => setIsSuggestUserOpen(false)}
                searchValue={searchValue}
              />
            </div>
          ) : (
            <>
              <div className="relative">
                <span onClick={() => setIsSuggestUserOpen(true)}>
                  <SearchIcon width={28} height={28} />
                </span>

                <SuggestedSearch
                  isOpen={isSuggestUserOpen}
                  onClose={() => setIsSuggestUserOpen(false)}
                  searchValue={searchValue}
                  onValueChange={searchInputChangeHandler}
                />
              </div>
            </>
          )
        }
        <div
          className="cursor-pointer"
          onClick={() => setIsFriendRequestModalOpen(!isFriendRequestModalOpen)}
        >
          <AddFriendIcon />
        </div>

        <ConfirmationModal
          title={DDLBL_LOGOUT}
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          primaryButtonTitle="No"
          primaryButtonAction={() => setIsLogoutModalOpen(false)}
          secondaryButtonTitle="Yes"
          secondaryButtonAction={() => {
            dispatch(logoutDispatcher());
            navigate(LOGIN, { replace: true });
          }}
        >
          Are you sure you want to logout?
        </ConfirmationModal>

        <Dropdown options={OPTIONS} IconComponent={() => <DropDownParent userData={userData} />} />
      </div>

      <FriendRequestsBar
        isOpen={isFriendRequestModalOpen}
        onClose={() => setIsFriendRequestModalOpen(false)}
        isTitle={true}
        title={BTNLBL_FRIEND_REQUESTS}
        childrenClassNames="overflow-y-auto"
        padding="p-0"
        titleClassNames=""
        titleParentClassNames="md:m-3 m-0"
        height="max-h-[100vh] md:h-auto"
      ></FriendRequestsBar>
    </div>
  );
};

export default PrivateHeader;
