import { useDispatch, useSelector } from 'react-redux';
import useDeviceType from '../../hooks/useDeviceType';
import DownCaret from '../Icons/DownCaret';
import HeaderLogoIcon from '../Icons/HeaderLogoIcon';
import Avatar from './Avatar';
import SearchInput from './SearchInput';
import { updateSearch } from '../../redux/slices/appSearchSlice';

const PrivateHeader = () => {
  const deviceType = useDeviceType();
  const dispatch = useDispatch();
  const { searchValue = '' } = useSelector((state) => state?.appSearch || {});

  const searchInputChangeHandler = (val) => {
    dispatch(updateSearch({ searchValue: val }));
  };

  return (
    <div className="bg-darkblue py-[14px] h-[61px] flex px-[5%] justify-between items-center ">
      <HeaderLogoIcon />
      <div className="flex gap-[20px]">
        {
          // Hide the search input bar on mobile
          deviceType !== 'mobile' ? (
            <SearchInput
              className="h-[32px]"
              onChange={searchInputChangeHandler}
              value={searchValue}
            />
          ) : (
            ''
          )
        }

        <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
          <Avatar
            name="Purdriven"
            image="https://images.unsplash.com/photo-1580483046931-aaba29b81601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnVzc2lhbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          />
          <DownCaret />
        </div>
      </div>
    </div>
  );
};

export default PrivateHeader;
