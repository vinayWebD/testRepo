import React, { useEffect, useState } from 'react';
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
import InputTextarea from './InputTextarea';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import {
  // addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  getDocs,
  // where,
  // serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { AllUsers } from '../../services/messageService';
import ReportUser from '../../components/Post/ReportUser';

const Messages = () => {
  const allFollowers = [
    {
      id: '01',
      FollowingUserId: '41',
      name: 'Guru',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '03',
      FollowingUserId: '41',
      name: 'Biswa',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '04',
      FollowingUserId: '41',
      name: 'Qwerty',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '05',
      FollowingUserId: '41',
      name: 'Hello',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '06',
      FollowingUserId: '41',
      name: 'Harry',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '77',
      FollowingUserId: '41',
      name: 'Rohit',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '08',
      FollowingUserId: '41',
      name: 'Samay',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];
  const followers = [
    {
      id: '01',
      FollowingUserId: '41',
      name: 'Guru',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '03',
      FollowingUserId: '41',
      name: 'Biswa',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '04',
      FollowingUserId: '41',
      name: 'Qwerty',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '05',
      FollowingUserId: '41',
      name: 'Hello',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '06',
      FollowingUserId: '41',
      name: 'Harry',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '77',
      FollowingUserId: '41',
      name: 'Rohit',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '08',
      FollowingUserId: '41',
      name: 'Samay',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];
  const [contacts, setContacts] = useState([]);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [searchedFollwers, setSearchedFollwers] = useState(followers);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addContact, setAddContact] = useState(true);
  const [isActive, setIsActive] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');
  const [newMessage, setNewMessage] = useState(false);
  const [retrievedDocumentId, setRetrievedDocumentId] = useState('');
  const [mobileChat, setMobileChats] = useState(false);

  const fetchFollowersList = async () => {
    const { status, data } = await AllUsers();
    if (status) {
      console.log('FinalData', data.data.Networks);
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    fetchFollowersList();
  }, []);
  useEffect(() => {
    if (isActive !== null) {
      setMobileChats(true);
    }
  }, [isActive]);
  console.log('isActive', isActive);
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
    setSearchedContacts((prevContacts) => [...prevContacts]);
    setSearchedFollwers(followers);
  };
  const handleSelected = (id) => {
    setNewMessage(false);
    setIsActive((prevId) => (prevId === id ? null : id));
    setAddContact(true);
    fetchData();
    const selectedFollower = allFollowers.find((follower) => follower.id === id);
    if (!addContact) {
      const isAlreadyAdded = contacts.some((contact) => contact.id === selectedFollower.id);

      if (!isAlreadyAdded) {
        setContacts((prevContacts) => {
          const updatedContacts = [...prevContacts, selectedFollower];
          setIsActive(selectedFollower.id);
          return updatedContacts;
        });
        setSearchedFollwers((prevFollowers) =>
          prevFollowers.filter((follower) => follower.id !== selectedFollower.id),
        );
      }
    }

    if (selectedFollower && selectedFollower.id && selectedFollower.FollowingUserId) {
      const { id, FollowingUserId } = selectedFollower;
      setFromId(FollowingUserId);
      setToId(id);

      let collectionId;
      if (id < FollowingUserId) {
        collectionId = `${id}_${FollowingUserId}`;
      } else {
        collectionId = `${FollowingUserId}_${id}`;
      }

      setRetrievedDocumentId(collectionId);
    }
  };
  console.log('messages: ', messages);
  const fetchData = async () => {
    try {
      const q = query(
        collection(db, 'test_messages', retrievedDocumentId, retrievedDocumentId),
        orderBy('timestamp'),
      );
      const querySnapshot = await getDocs(q);
      let messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesData);
    } catch (error) {
      console.error('Error getting messages: ', error);
    }
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'test_messages'), orderBy('timestamp')),
      (querySnapshot) => {
        let messagesData = [];
        querySnapshot.forEach((doc) => {
          messagesData.push({ ...doc.data(), id: doc.id });
        });
        // messagesData.forEach((element) => {
        //   const exists = contacts.some((contact) => contact.id === element.id);
        //   if (!exists) {
        //     contacts.push(element);
        //   }
        // });
        const updatedContacts = contacts.map((contact) => {
          const lastMessageIdTo = messagesData.find(
            (message) => message.lastMessage.idTo === contact.id,
          );
          if (lastMessageIdTo) {
            return {
              ...contact,
              lastMessage: {
                content: lastMessageIdTo.lastMessage.content,
                idFrom: lastMessageIdTo.lastMessage.idFrom,
                idTo: lastMessageIdTo.lastMessage.idTo,
                read: lastMessageIdTo.lastMessage.read,
                timestamp: lastMessageIdTo.timestamp,
              },
            };
          }
          return contact;
        });

        setContacts(updatedContacts);
      },
      (error) => {
        console.error('Error getting real-time updates: ', error);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [retrievedDocumentId]);
  return (
    <SectionLayout activeTab={2}>
      <div className="relative flex justify-between bg-white rounded-lg shadow-card lg:mt-4 h-[100vh] md:h-[calc(100vh-120px)] overflow-hidden ">
        <div
          className={`border-r-2 border-lightgrey w-full md:w-4/12 overflow-y-auto scrollbar-custom md:block ${
            mobileChat ? 'hidden' : 'block'
          } `}
        >
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
            <div className=" md:mt-6 md:mb-4 relative flex items-center border-b border-lightgrey m-4 mb-2 mt-2">
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
            <div className="items-center w-full md:mt-6">
              {(addContact ? contacts : searchedFollwers).map((element, index) => (
                <div
                  key={index}
                  className={` box-border border-l-[6px] border-white cursor-pointer  w-full ${
                    isActive === element?.id ? 'active-message-left-side-bar bg-lightbluebg' : ''
                  }`}
                  onClick={() => handleSelected(element?.id)}
                >
                  <div className="border-b border-b-lightgrey w-[95%] flex items-center py-3 ml-[3px] ">
                    <div>
                      <Avatar
                        name={element?.userDetails?.[1]?.name || element?.name}
                        image={ludgi}
                        classNames="w-[40px] h-[40px]"
                      />
                    </div>
                    {addContact ? (
                      <div className="ml-2 w-full mr-2">
                        <div className="flex justify-between">
                          <h3 className="text-[16px] font-semibold">
                            {element?.userDetails?.[1]?.name || element?.name}
                          </h3>
                          <p>5s</p>
                        </div>
                        <div className="flex justify-between">
                          <p
                            className={`text-[14px] font-medium text-greydark ${
                              newMessage ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {element?.lastMessage?.content
                              ? element?.lastMessage.content.length > 18
                                ? `${element?.lastMessage.content.substring(0, 10)}...`
                                : element?.lastMessage.content
                              : ''}
                          </p>
                          {newMessage ? (
                            <span className="inline-flex items-center justify-center bg-gradient-to-r from-buttongradientfrom to-buttongradientto h-4 w-4 rounded-full">
                              <span className="text-white text-[12px]">2</span>
                            </span>
                          ) : (
                            <TextSeen />
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="ml-2 mr-2 w-full">
                        <div className="flex justify-between items-center">
                          <h3 className="text-[16px] font-semibold">{element?.name}</h3>
                          <img src={messageVector} alt="" className="w-[24px] h-[24px]" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`relative md:w-8/12 overflow-hidden md:block w-full ${
            mobileChat ? 'block' : 'hidden'
          }`}
        >
          {isActive !== null ? (
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between items-center border-b-2 border-whitelight w-full h-fit p-4">
                <div className="flex items-center">
                  <img
                    src={BackAvatar}
                    alt=""
                    className="block md:hidden"
                    onClick={() => {
                      setMobileChats(false);
                      setIsActive(null);
                    }}
                  />
                  <Avatar image={ludgi} classNames="w-[52px] h-[52px] ml-4 md:ml-0" />
                  <div className="ml-2">
                    <span className="text-[20px] font-semibold">
                      {isActive !== null
                        ? addContact
                          ? contacts.find((contact) => contact.id === isActive)?.name || 'Name'
                          : searchedFollwers.find((follower) => follower.id === isActive)?.name ||
                            'Name'
                        : 'Name'}
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
                <Chats fileData={fileData} chatHistoryData={messages} />
              </div>
              <InputTextarea
                onFileInputChange={handleFileInputChange}
                fromId={fromId}
                toId={toId}
                contacts={contacts}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <div className="w-fit text-center">
                <img src={noMessage} alt="" className="m-auto" />
                <span className="text-base font-semibold text-greydark">
                  Select a chat or start a new conversation
                </span>
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
          <div className="w-[286px] mx-auto ">
            <span className="text-[18px] font-medium">Are you sure you want to delete chat?</span>
          </div>
        </ConfirmationModal>

        <ReportUser
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          userId=""
        />

        <ConfirmationModal
          title="Block User"
          isOpen={isBlockModalOpen}
          onClose={() => setIsBlockModalOpen(false)}
          primaryButtonTitle="No"
          primaryButtonAction={() => setIsBlockModalOpen(false)}
          secondaryButtonTitle="Yes"
          // secondaryButtonAction={() => dispatch(logoutDispatcher())}
        >
          <div className="text-[18px] tx-greydark font-medium">
            Are you sure you want to block “
            {addContact
              ? isActive !== null && searchedContacts[isActive]
                ? searchedContacts[isActive]?.name || 'Name'
                : isActive !== null && searchedFollwers[isActive]
                ? searchedFollwers[isActive]?.name || 'Name'
                : 'Name'
              : searchedFollwers[isActive]?.name || 'Name'}
            ”?
          </div>
        </ConfirmationModal>
      </div>
    </SectionLayout>
  );
};

export default Messages;
