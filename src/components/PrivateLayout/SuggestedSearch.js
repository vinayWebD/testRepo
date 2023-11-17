import React, { useCallback, useEffect, useState } from 'react';
import SuggestedUser from './SuggestedUser';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserDispatcher } from '../../redux/dispatchers/searchUserDispatcher';
import { successStatus } from '../../common';
import SearchIcon from '../Icons/SearchIcon';
import debounce from '../../utils/debounce';
import PostSkeleton from '../common/PostSkeleton';
import SearchInput from '../common/SearchInput';
import useDeviceType from '../../hooks/useDeviceType';
import backIcon from '../../assets/images/backIcon.svg';
import { useNavigate } from 'react-router-dom';

let globalModalCounter = 0;

export const incrementModalCounter = () => {
  globalModalCounter++;
};

export const decrementModalCounter = () => {
  if (globalModalCounter > 0) {
    globalModalCounter--;
  }
};

export const getModalCounter = () => {
  return globalModalCounter;
};

function SuggestedSearch({
  isOpen,
  onClose = () => {},
  width = '',
  height = 'h-auto',
  titleParentClassNames = '',
  searchValue = '',
  onValueChange = () => {},
}) {
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(true);
  const deviceType = useDeviceType();
  const isGlobalTransparentLoadingPrivate = useSelector(
    (state) => state?.auth?.globalTransparentLoadingPrivate,
  );
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    const suggestedSearchElement = document.getElementById('suggested-search');
    if (suggestedSearchElement && !suggestedSearchElement.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      incrementModalCounter();
    }

    // Set overflow only once when first modal opens or when the last modal closes.
    if ((getModalCounter() === 1 && isOpen) || document.querySelector('#suggested-search')) {
      document.body.style.overflow = 'hidden';
      document
        ?.querySelector('.add-blur-after-search')
        ?.classList?.add('blur-[1.5px]', 'pointer-events-none');
    } else if (getModalCounter() === 0 && !isOpen && !document.querySelector('#suggested-search')) {
      document.body.style.overflow = 'scroll';
      document
        ?.querySelector('.add-blur-after-search')
        ?.classList?.remove('blur-[1.5px]', 'pointer-events-none');
    }

    return () => {
      if (isOpen) {
        decrementModalCounter();
        if (getModalCounter() === 0 && !document.querySelector('#suggested-search')) {
          document
            ?.querySelector('.add-blur-after-search')
            ?.classList?.remove('blur-[1.5px]', 'pointer-events-none');
          document.body.style.overflow = 'auto';
        }
      }
    };
  }, [isOpen]);

  const updateSearchVal = useCallback(
    debounce((val) => {
      fetchUsers(val);
    }, 400),
    [],
  );

  useEffect(() => {
    setIsSearching(true);
    updateSearchVal(searchValue);

    if (!searchValue) {
      setSearchResult([]);
    }
  }, [searchValue]);

  const fetchUsers = async (searchValue) => {
    if (searchValue !== null && searchValue !== undefined && searchValue?.trim()?.length) {
      const { status, data } = await dispatch(searchUserDispatcher({ search: searchValue }));

      if (successStatus(status)) {
        setSearchResult(data?.data?.users);
      }
      setIsSearching(false);
    }
  };
  const onCloseHandler = () => {
    if (deviceType !== 'mobile') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="suggested-search"
      className=" bg-white items-start content-start flex-wrap left-0 fixed md:absolute w-[100vw] h-[calc(100vh-60px)] top-[61px] md:top-[27px] md:w-full md:h-fit flex md:rounded-md z-50 shadow-lg"
      onClick={onCloseHandler}
    >
      <div className="relative w-full h-full">
        <div className="flex flex-col gap-1 md:hidden w-full px-[5%]">
          <div
            className="flex text-[15px] md:text-[18px] lg:text-[24px] pt-4 pb-2 sticky cursor-pointer font-medium"
            onClick={() => {
              navigate(-1);
              onClose();
            }}
          >
            <img src={backIcon} alt="backIcon" className="w-[20px] lg:w-[30px]" />
            Search
          </div>

          <SearchInput
            className="placeholder:text-greylight !text-greylight h-[32px] w-[290px]"
            onChange={onValueChange}
            value={searchValue}
            iconColor="#A1A0A0"
            bottomBorderColorClass={'border-[#A1A0A0]'}
          />
        </div>
        <div
          className={`overflow-x-hidden overflow-y-auto max-h-[70vh] lg:max-h-[60vh] py-3 pb-[50px] md:pb-3 ${width} ${height} ${titleParentClassNames}`}
        >
          {searchResult?.length ? (
            searchResult?.map((result) => {
              return (
                <SuggestedUser
                  key={result?.email}
                  userFullName={`${result?.firstName} ${result?.lastName}`}
                  userBio=" UiUx Designer | Media Composer | Founder of Lumina"
                  userImg={result?.profilePictureUrl}
                  userId={result?.id}
                  closePopupHandler={onClose}
                />
              );
            })
          ) : (
            <div className="flex gap-2 p-3 cursor-pointer">
              {!isGlobalTransparentLoadingPrivate && !isSearching ? (
                <>
                  <div>
                    <SearchIcon color="black" />
                  </div>
                  <div>
                    <h4 className="text-bold font-medium leading-4 ">No result found</h4>
                    <h6 className="text-[10px] leading-4 font-normal text-greydark">
                      Search another way
                    </h6>
                  </div>
                </>
              ) : (
                <div className="flex flex-col w-full gap-4">
                  <PostSkeleton showCaption={false} showMedia={false} />
                  <PostSkeleton showCaption={false} showMedia={false} />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="absolute top-[83%] md:top-[91%] bg-white left-0 border-t w-full font-medium border-[#DFDFDF] p-4 flex justify-center text-blueprimary cursor-pointer">
          See All
        </div>
      </div>
    </div>
  );
}

export default SuggestedSearch;
