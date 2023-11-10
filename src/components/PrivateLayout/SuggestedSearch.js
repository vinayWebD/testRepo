import React, { useCallback, useEffect, useState } from 'react';
import SuggestedUser from './SuggestedUser';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserDispatcher } from '../../redux/dispatchers/searchUserDispatcher';
import { successStatus } from '../../common';
import SearchIcon from '../Icons/SearchIcon';
import debounce from '../../utils/debounce';
import PostSkeleton from '../common/PostSkeleton';

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
  onClose,
  width = '',
  height = 'h-auto',
  titleParentClassNames = '',
  searchValue = '',
}) {
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState([]);
  const isGlobalTransparentLoadingPrivate = useSelector(
    (state) => state?.auth?.globalTransparentLoadingPrivate,
  );

  useEffect(() => {
    if (isOpen) {
      incrementModalCounter();
    }

    // Set overflow only once when first modal opens or when the last modal closes.
    if (getModalCounter() === 1 && isOpen) {
      document.body.style.overflow = 'hidden';
      document
        ?.querySelector('.add-blur-after-search')
        ?.classList?.add('blur-[1.5px]', 'pointer-events-none');
    } else if (getModalCounter() === 0 && !isOpen) {
      document.body.style.overflow = 'scroll';
      document
        ?.querySelector('.add-blur-after-search')
        ?.classList?.remove('blur-[1.5px]', 'pointer-events-none');
    }

    return () => {
      if (isOpen) {
        decrementModalCounter();
        if (getModalCounter() === 0) {
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
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="bg-white items-start flex-wrap absolute top-[27px] left-0 w-full h-fit flex rounded-md z-50 shadow-lg"
      onClick={onClose}
    >
      <div
        className={`overflow-x-hidden overflow-y-auto max-h-[70vh] lg:max-h-[60vh] py-3 ${width} ${height} ${titleParentClassNames}`}
      >
        {searchResult?.length ? (
          searchResult?.map((result) => {
            return (
              <SuggestedUser
                key={result?.email}
                userFullName={`${result?.firstName} ${result?.lastName}`}
                userBio=" UiUx Designer | Media Composer | Founder of Lumina"
                userImg={result?.profilePictureUrl}
              />
            );
          })
        ) : (
          <div className="flex gap-2 p-3 cursor-pointer">
            {!isGlobalTransparentLoadingPrivate ? (
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
              <div>
                <PostSkeleton showCaption={false} showMedia={false} />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="border-t w-full font-medium border-[#DFDFDF] p-4 flex justify-center text-blueprimary cursor-pointer">
        See All
      </div>
    </div>
  );
}

export default SuggestedSearch;
