import React, { useState } from 'react';
import SectionLayout from '../../components/PrivateLayout/SectionLayout';
import SearchIcon from '../../assets/images/searchIcon.svg';
import cross from '../../assets/images/cross.svg';
import noMessage from '../../assets/images/No-Messages.svg';
import messageVector from '../../assets/images/Message-vector.svg';
import ludgi from '../../assets/images/ludgi.svg';
import Avatar from '../../components/common/Avatar';
import TextSeen from '../../components/Icons/TestSeen';
import Chats from './chats';
import ThreeDots from '../../components/Icons/ThreeDots';
import Dropdown from '../../components/common/Dropdown';
import BackAvatar from '../../assets/images/Back-vector.svg';
import InputTextaria from './InputTextaria';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';

const Messages = () => {
  const contacts = [
    {
      name: 'Harry',
      lastMessage: 'Lorem ipsum, dolor',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Rohit',
      lastMessage:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque nisi explicabo consectetur eius obcaecati quae.',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Samay',
      lastMessage: 'Lorem, ipsum dolor sit amet consectetur adip',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];
  const followers = [
    {
      name: 'Guru',
      lastMessage:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque nisi explicabo consectetur eius obcaecati quae.',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Rohit',
      lastMessage:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque nisi explicabo consectetur eius obcaecati quae.',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Biswa',
      lastMessage:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque nisi explicabo consectetur eius obcaecati quae.',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Qwerty',
      lastMessage:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque nisi explicabo consectetur eius obcaecati quae.',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Hello',
      lastMessage:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque nisi explicabo consectetur eius obcaecati quae.',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Harry',
      lastMessage: 'Lorem ipsum, dolor',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Rohit',
      lastMessage:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque nisi explicabo consectetur eius obcaecati quae.',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Samay',
      lastMessage: 'Lorem, ipsum dolor sit amet consectetur adip',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  const [searchedContacts, setSearchedContacts] = useState(contacts);
  const [searchedFollwers, setSearchedFollwers] = useState(followers);
  const [searchQuery, setSearchQuery] = useState('');
  const [addContact, setAddContact] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [readMessage, setReadMessage] = useState(Array(contacts.length).fill(false));
  const [fileData, setFileData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

  const handleFileInputChange = (selectedFile) => {
    setFileData(selectedFile);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredContacts = contacts.filter((element) =>
      element.name.toLowerCase().includes(query.toLowerCase()),
    );
    setSearchedContacts(filteredContacts);
  };
  const handleFollowersSearch = (query) => {
    setSearchQuery(query);
    const filteredFollower = followers.filter((element) =>
      element.name.toLowerCase().includes(query.toLowerCase()),
    );
    setSearchedFollwers(filteredFollower);
  };
  const clearSearch = () => {
    setSearchQuery('');
    setSearchedContacts(contacts);
    setSearchedFollwers(followers);
  };
  const handleSelected = (index) => {
    setIsActive(index === isActive ? null : index);
    if (!readMessage[index]) {
      const newReadMessages = readMessage.map((value, i) => (i === index ? true : value));
      setReadMessage(newReadMessages);
    }
  };

  return (
    <SectionLayout activeTab={2}>
      <div className=" relative flex justify-between bg-white rounded-lg shadow-card lg:mt-6 h-[100vh] md:h-[calc(100vh-120px)] overflow-hidden ">
        <div className="border-r-2 border-lightgrey w-full md:w-4/12 overflow-y-auto scrollbar-custom">
          <div>
            <div className=" text-[20px] font-semibold flex justify-between m-4">
              {addContact ? <span>Messages</span> : <span>New Chat</span>}
              <span
                className={
                  addContact
                    ? 'inline-flex items-center justify-center bg-gradient-to-r from-buttongradientfrom to-buttongradientto h-8 w-8 rounded-full cursor-pointer'
                    : 'inline-flex items-center justify-center cursor-pointer'
                }
              >
                {addContact ? (
                  <span
                    className="text-white"
                    onClick={() => {
                      setAddContact(false);
                      setIsActive(null);
                    }}
                  >
                    +
                  </span>
                ) : (
                  <img
                    src={cross}
                    alt=""
                    onClick={() => {
                      setAddContact(true);
                      setIsActive(null);
                    }}
                  />
                )}
              </span>
            </div>
            <div className=" mt-6 relative flex items-center border-b border-lightgrey m-4">
              <img src={SearchIcon} alt="" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  addContact ? handleSearch(e.target.value) : handleFollowersSearch(e.target.value);
                }}
                className="py-1 pr-3 outline-none focus:border-blueprimary transition-all duration-300 w-full"
              />
              {searchQuery && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={clearSearch}
                >
                  <img src={cross} alt="" />
                </button>
              )}
            </div>
            <div className="items-center w-full mt-6 ">
              {searchedContacts.length === 0 || searchedFollwers.length === 0 ? (
                <p className="text-center text-darkgrey mt-4">No Results</p>
              ) : (
                (addContact ? searchedContacts : searchedFollwers).map((element, index) => (
                  <div
                    key={index}
                    className={` p-2 py-3 pr-[5px] border-l-[6px] box-border border-white cursor-pointer flex items-center border-b border-b-lightgrey w-full ${
                      isActive === index ? 'active-message-left-side-bar bg-lightbluebg' : ''
                    }`}
                    onClick={() => handleSelected(index)}
                  >
                    <div>
                      <Avatar name={element.name} image={ludgi} classNames="w-[40px] h-[40px]" />
                    </div>
                    {addContact ? (
                      <div className="ml-2 w-full mr-2">
                        <div className="flex justify-between">
                          <h3 className="text-[16px] font-semibold">{element.name}</h3>
                          <p>5s</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-[14px] font-medium text-greydark">
                            {element.lastMessage.length > 18
                              ? `${element.lastMessage.substring(0, 18)}...`
                              : element.lastMessage}
                          </p>
                          {/* {newMessage ? (
                            <span className="inline-flex items-center justify-center bg-gradient-to-r from-buttongradientfrom to-buttongradientto h-4 w-4 rounded-full">
                              <span className="text-white text-[12px]">2</span>
                            </span>
                          ) : ( */}
                          <TextSeen />
                          {/* )} */}
                        </div>
                      </div>
                    ) : (
                      <div className="ml-2 mr-2 w-full">
                        <div className="flex justify-between">
                          <h3 className="text-[16px] font-semibold">{element.name}</h3>
                          <img src={messageVector} alt="" />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="relative md:w-8/12 overflow-hidden hidden md:block w-full">
          {isActive !== null ? (
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between items-center border-b-2 border-whitelight w-full h-fit p-4">
                <div className="flex items-center">
                  <img src={BackAvatar} alt="" className="block md:hidden" />
                  <Avatar image={ludgi} classNames="w-[52px] h-[52px] ml-4 md:ml-0" />
                  <div className="ml-2">
                    <span className="text-[20px] font-semibold">
                      {addContact
                        ? isActive !== null && searchedContacts[isActive]
                          ? searchedContacts[isActive].name
                          : isActive !== null && searchedFollwers[isActive]
                            ? searchedFollwers[isActive].name
                            : 'Name'
                        : searchedFollwers[isActive].name}
                    </span>
                    <div className="flex items-center">
                      <div className="w-[8px] h-[8px] rounded-full bg-blueprimary"></div>
                      <span className="ml-2 text-[16px] text-greylight">Online</span>
                    </div>
                  </div>
                </div>
                <div className="mr-[10px]">
                  <Dropdown
                    parentClassName="rounded-lg"
                    optionItemClassName="hover:bg-greylighter"
                    options={[
                      {
                        name: 'Delete Chat',
                        action: () => setIsDeleteModalOpen(true),
                      },
                      { name: 'Report User', action: () => setIsReportModalOpen(true) },
                      { name: 'Block', action: () => setIsBlockModalOpen(true) },
                    ]}
                    IconComponent={() => <ThreeDots className="w-[4.8px] h-[24px] rotate-90" />}
                  />
                </div>
              </div>
              <div className=" overflow-auto scrollbar-custom h-full">
                <Chats fileData={fileData} />
              </div>
              <InputTextaria onFileInputChange={handleFileInputChange} />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <div className="w-fit text-center">
                <img src={noMessage} alt="" className="m-auto" />
                <span>Select a chat or start a new conversation</span>
              </div>
            </div>
          )}
        </div>
        <ConfirmationModal
          title="Delete Chat"
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          primaryButtonTitle="No"
          primaryButtonAction={() => setIsDeleteModalOpen(false)}
          secondaryButtonTitle="Yes"
          // secondaryButtonAction={() => dispatch(logoutDispatcher())}
        >
          Are you sure you want to delete chat?
        </ConfirmationModal>
        <ConfirmationModal
          title="Report User"
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          primaryButtonTitle="Report"
          // primaryButtonAction={() => setIsReportModalOpen(false)}
          secondaryButtonTitle="Cancel"
          secondaryButtonAction={() => setIsReportModalOpen(false)}
        >
          <div>
            <div>Are you sure you want to Report this user?</div>
            <div className="mt-6 flex flex-col">
              <label htmlFor="reportReason" className="flex">
                Please type the reason*
              </label>
              <textarea
                id="reportReason"
                placeholder="Please type the reason why you want to report the user."
              />
            </div>
          </div>
        </ConfirmationModal>
        <ConfirmationModal
          title="Block User"
          isOpen={isBlockModalOpen}
          onClose={() => setIsBlockModalOpen(false)}
          primaryButtonTitle="No"
          primaryButtonAction={() => setIsBlockModalOpen(false)}
          secondaryButtonTitle="Yes"
          // secondaryButtonAction={() => dispatch(logoutDispatcher())}
        >
          Are you sure you want to block “
          {addContact
            ? isActive !== null && searchedContacts[isActive]
              ? searchedContacts[isActive]?.name || 'Name'
              : isActive !== null && searchedFollwers[isActive]
                ? searchedFollwers[isActive]?.name || 'Name'
                : 'Name'
            : searchedFollwers[isActive]?.name || 'Name'}
          ”?
        </ConfirmationModal>
      </div>
    </SectionLayout>
  );
};

export default Messages;
