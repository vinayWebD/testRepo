import React, { useState } from 'react';
import Card from '../../components/common/Card';
import SearchInput from '../../components/common/SearchInput';
import { Button } from '../../components/common/Button';
import { Colors } from '../../constants/colors';
import CrossIcon from '../../components/Icons/Cross';
import UserCard from '../../components/MyNetworkLayout/UserCard';
import Modal from '../../components/Modal';
import { BUTTON_LABELS } from '../../constants/lang';
import InvitePeopleLayout from './InvitePeopleLayout';
import Pagination from '../../components/common/Pagination';
const { BTNLBL_INVITE_PEOPLE } = BUTTON_LABELS;

const MyNetworkTabSection = ({ selectedTab }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchOnFocus, setSearchOnFocus] = useState(false);
  const [isInvitePeopleModalOpen, setIsInvitePeopleModalOpen] = useState(false);

  const searchInputChangeHandler = (value) => {
    setSearchValue(value);
  };

  return (
    <Card classNames="md:mt-0 md:py-3 lg:mt-2 lg:py-2 min-[320px]:mt-0  min-[320px]:rounded-t-none lg:rounded-t-lg min-[320px]:py-5">
      <div className=" w-[100%] ">
        <div className="lg:flex  md:flex md:justify-between lg:justify-between mx-9 items-center">
          <div className="font-medium lg:block md:block min-[320px]:hidden ">
            {selectedTab} (100)
          </div>
          <div className="flex justify-between items-center sm:gap-4 min-[320px]:gap-0">
            <div
              className={`${
                searchOnFocus
                  ? 'border-[darkgray] flex border-b-[1px] border-0 min-[320px]:w-full md:w-[197.7px]'
                  : ''
              } `}
            >
              <SearchInput
                iconColor={Colors.grayDark}
                onChange={searchInputChangeHandler}
                value={searchValue}
                isFocusIn={searchOnFocus}
                onBlur={() => setSearchOnFocus(false)}
                onFocus={() => setSearchOnFocus(true)}
                textColor="text-black"
                className={` md:w-[100%] min-[320px]:w-[100px]  min-[300px]:w-[0px] ${
                  searchOnFocus ? 'py-1 min-[320px]:w-[100px] md:w-[100%] ' : ''
                } `}
              />
              {searchOnFocus && (
                <div
                  className="min-[320px]:block sm:hidden cursor-pointer"
                  onClick={() => setSearchOnFocus(false)}
                >
                  <CrossIcon />
                </div>
              )}
            </div>

            <Button
              label={BTNLBL_INVITE_PEOPLE}
              additionalClassNames={` md:px-[24px] sm:h-[0px] md:h-[50px] md:py-[14px] items-center text-xs min-[320px]:p-4 ${
                searchOnFocus
                  ? 'min-[320px]:hidden  md:px-[24px] md:py-[15px] items-center text-xs sm:block'
                  : ''
              } `}
              showArrowIcon={false}
              onClick={() => setIsInvitePeopleModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <div className="my-5 mx-9 mb-4 pr-3">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
          <UserCard key={item} selectedTab={selectedTab} />
        ))}
        <Pagination />
      </div>
      <Modal
        isOpen={isInvitePeopleModalOpen}
        onClose={() => setIsInvitePeopleModalOpen(false)}
        isTitle={true}
        title={BTNLBL_INVITE_PEOPLE}
        childrenClassNames="overflow-y-auto"
        padding="p-0"
        titleClassNames=""
        titleParentClassNames="md:m-3 m-0"
        height=" max-h-[100dvh] md:h-auto"
      >
        <InvitePeopleLayout onCloseHandler={() => setIsInvitePeopleModalOpen(false)} />
      </Modal>
    </Card>
  );
};

export default MyNetworkTabSection;
