import React, { useEffect, useRef, useState } from 'react';
import SectionLayout from '../../components/PrivateLayout/SectionLayout';
import SearchIcon from '../../assets/images/searchIcon.svg';
import cross from '../../assets/images/cross.svg';
import noMessage from '../../assets/images/No-Messages.svg';
import messageVector from '../../assets/images/Message-vector.svg';
import Avatar from '../../components/common/Avatar';
import TextSeen from '../../components/Icons/TestSeen';
import Chats from './chats';
import ThreeDots from '../../components/Icons/ThreeDots';
import Dropdown from '../../components/common/Dropdown';
import BackAvatar from '../../assets/images/Back-vector.svg';
import InputTextarea from './InputTextarea';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import db from '../../firebase';
import { AllUsers } from '../../services/messageService';
import ReportUser from '../../components/Post/ReportUser';
import TimeAgo from './TimeAgo';
import { useDispatch, useSelector } from 'react-redux';
import { ToastNotifyError, ToastNotifySuccess } from '../../components/Toast/ToastNotify';
import { blockUserDispatcher } from '../../redux/dispatchers/otherUserDispatcher';
import { getErrorMessage, successStatus } from '../../common';

const Messages = () => {
  const [allFollowers, setAllFollowers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [searchedFollwers, setSearchedFollwers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addContact, setAddContact] = useState(true);
  const [isActive, setIsActive] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [originalSearchedFollowers, setOriginalSearchedFollowers] = useState([]);
  const [toId, setToId] = useState('');
  const [newMessage, setNewMessage] = useState(false);
  const [retrievedDocumentId, setRetrievedDocumentId] = useState('');
  const [mobileChat, setMobileChats] = useState(false);
  const [selected, setSelected] = useState([]);
  const [originalContacts, setOriginalContacts] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [selectedElement, setSelectedElement] = useState(null);
  const [userId, setUserId] = useState('');
  const myProfile = useSelector((state) => state.auth.user);
  const chatContainerRef = useRef(null);
  const dispatch = useDispatch();

  const fetchFollowersList = async () => {
    const { status, data } = await AllUsers();
    if (status) {
      let allowedContacts = [];
      let allData = data?.data?.Networks;
      allData.map((element) => {
        if (element?.User?.PrivacySettings[0]?.chatSetting === 'chatAnyone') {
          allowedContacts.push(element);
        } else if (
          element?.User?.PrivacySettings[0]?.chatSetting === 'chatConnection' &&
          element?.User?.PrivacySettings[0]?.isConnection
        ) {
          allowedContacts.push(element);
        }
      });
      setAllFollowers(allowedContacts);
      const newFollowers = allowedContacts.filter((newFollower) => {
        const followerId = newFollower?.User?.username;
        const isDuplicate = contacts.some((contact) => {
          let userIndex = contact?.userIds?.findIndex((user) => {
            return user !== myProfile?.id;
          });
          const contactUsername =
            contact?.User?.username || contact?.userDetails[userIndex]?.username;
          return contactUsername === followerId;
        });
        return !isDuplicate;
      });
      setSearchedFollwers(newFollowers);
      setOriginalSearchedFollowers(newFollowers);
    }
  };

  const scrollChatContainer = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isActive !== null) {
      setMobileChats(true);
    }
  }, [isActive]);

  const handleFileInputChange = (selectedFile) => {
    setFileData(selectedFile);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.trim());
    if (query.trim() === '') {
      setContacts([...originalContacts]);
    } else {
      const filteredContacts = contacts.filter((element) => {
        let UserIndex = element?.userIds?.findIndex((user) => {
          return user !== myProfile?.id;
        });
        const searchItem =
          element?.User?.firstName?.toLowerCase() ||
          element?.userDetails[UserIndex]?.firstName?.toLowerCase();
        return searchItem.includes(query.toLowerCase());
      });
      setContacts(filteredContacts);
    }
  };

  const handleFollowersSearch = (query) => {
    setSearchQuery(query.trim());
    if (query.trim() === '') {
      setSearchedFollwers([...originalSearchedFollowers]);
    } else {
      const filteredFollowers = originalSearchedFollowers.filter((follower) =>
        follower?.User?.firstName.toLowerCase().includes(query.toLowerCase()),
      );
      setSearchedFollwers(filteredFollowers);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setContacts([...originalContacts]);
    setSearchedFollwers([...originalSearchedFollowers]);
  };

  const handleSelected = (id, element) => {
    setSelectedId(id);
    setSelectedElement(element);
    setIsActive((prevId) => (prevId === id ? null : id));
    setAddContact(true);
    const selectedFollower = allFollowers.find(
      (follower) => follower?.id === id || follower?.User?.id === id,
    );
    setSelected(selectedFollower);
    if (!addContact) {
      const isAlreadyAdded = contacts.some((contact) => contact?.id === selectedFollower?.id);
      if (!isAlreadyAdded) {
        setContacts((prevContacts) => {
          const updatedContacts = [...prevContacts, selectedFollower];
          setIsActive(selectedFollower?.id);
          return updatedContacts;
        });
        setSearchedFollwers((prevFollowers) =>
          prevFollowers.filter((follower) => follower?.id !== selectedFollower?.id),
        );
      }
    }

    if (selectedFollower && selectedFollower?.id && selectedFollower?.FollowingUserId) {
      const { UserId, FollowingUserId } = selectedFollower;
      const newToId = myProfile?.id !== FollowingUserId ? FollowingUserId : UserId;
      setToId(newToId);
      let collectionId;
      const numericToId = parseInt(newToId, 10);
      const numericMyProfileId = parseInt(myProfile?.id, 10);

      if (numericToId < numericMyProfileId) {
        collectionId = `${numericToId}_${numericMyProfileId}`;
      } else {
        collectionId = `${numericMyProfileId}_${numericToId}`;
      }

      setRetrievedDocumentId((prevId) => (prevId !== collectionId ? collectionId : prevId));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'test_messages'), orderBy('timestamp'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let messagesData = [];
          querySnapshot.forEach((doc) => {
            messagesData.push({ ...doc.data() });
          });

          const filteredMessages = messagesData.filter((element) => {
            return element?.userIds?.includes(myProfile?.id);
          });
          const sortedContacts = filteredMessages.sort((a, b) => {
            const timestampA = a.lastMessage ? a.lastMessage.timestamp : 0;
            const timestampB = b.lastMessage ? b.lastMessage.timestamp : 0;
            return timestampB - timestampA;
          });
          setNewMessage(Math.random());
          setContacts(sortedContacts);
          setContacts([...filteredMessages]);
          setOriginalContacts([...filteredMessages]);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error('Error getting messages: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchFollowersList();
  }, [contacts]);

  useEffect(() => {
    if (isActive && contacts[0]?.lastMessage?.idFrom !== myProfile?.id) {
      updateRead();
    }
  }, [selectedElement, newMessage]);
  useEffect(() => {
    unreadMessageCount();
  }, [newMessage]);

  const updateRead = async () => {
    let selectedCollectionId = selectedElement?.chatId || contacts[0]?.chatId;
    try {
      const subcollectionRef = collection(
        db,
        'test_messages',
        selectedCollectionId,
        selectedCollectionId,
      );
      const allDocsQuerySnapshot = await getDocs(subcollectionRef);
      const updatePromises = [];
      allDocsQuerySnapshot.forEach((subcollectionDoc) => {
        const subcollectionDocRef = doc(subcollectionRef, subcollectionDoc.id);
        updatePromises.push(updateDoc(subcollectionDocRef, { read: true }));
      });
      const mainDocRef = doc(db, 'test_messages', selectedCollectionId);
      updatePromises.push(updateDoc(mainDocRef, { read: true }));

      await Promise.all(updatePromises);
    } catch (error) {
      console.error('Error updating read status for messages: ', error);
    }
  };
  const unreadMessageCount = async () => {
    let selectedCollectionId = selectedElement?.chatId || contacts[0]?.chatId;
    try {
      const subcollectionRef = collection(
        db,
        'test_messages',
        selectedCollectionId,
        selectedCollectionId,
      );
      let unreadCount = 0;
      const allDocsQuerySnapshot = await getDocs(subcollectionRef);
      allDocsQuerySnapshot.forEach((subcollectionDoc) => {
        const isRead = subcollectionDoc.data().read || false;
        if (!isRead) {
          unreadCount++;
        }
      });
      const mainDocRef = doc(db, 'test_messages', selectedCollectionId);
      await updateDoc(mainDocRef, { unReadCount: unreadCount });

      return unreadCount;
    } catch (error) {
      console.error('Error counting unread messages: ', error);
    }
  };

  const deleteChat = async () => {
    const subcollectionRef = collection(
      db,
      'test_messages',
      retrievedDocumentId,
      retrievedDocumentId,
    );
    const documentRef = doc(db, 'test_messages', retrievedDocumentId);
    try {
      const allDocsQuerySnapshot = await getDocs(subcollectionRef);
      await updateDoc(documentRef, {
        lastMessage: {
          content: '',
          id: '',
          idFrom: '',
          idTo: '',
          read: '',
          timestamp: '',
        },
      });
      allDocsQuerySnapshot.forEach(async (doc) => {
        deleteDoc(doc.ref)
          .then(() => {
            ToastNotifySuccess('The user has been blocked');
            setIsDeleteModalOpen(false);
          })
          .catch((error) => {
            console.error(`Error deleting document ${doc.id}: `, error);
          });
      });
    } catch (error) {
      console.error('Error getting documents from subcollection: ', error);
    }
  };

  useEffect(() => {
    let ChatId = retrievedDocumentId?.split('_');
    let firstPart = ChatId[0];
    let secondPart = ChatId[1];
    let userId = '';
    if (firstPart !== myProfile?.id) {
      userId = firstPart;
    } else if (secondPart !== myProfile?.id) {
      userId = secondPart;
    }
    setUserId(userId);
  }, [retrievedDocumentId]);

  const blockClickHandler = async () => {
    const { status, data } = await dispatch(
      blockUserDispatcher({ userId: userId, showLoader: true }),
    );

    if (successStatus(status)) {
      ToastNotifySuccess('The user has been blocked');
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    }
  };

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
                      setSelectedElement(null);
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
                      setSelectedElement(null);
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
              {(addContact ? contacts : searchedFollwers).map((element, index) => {
                let elementId = element?.id || element?.lastMessage?.id;
                let UserIndex = element?.userIds?.findIndex((user) => {
                  return user !== myProfile?.id;
                });
                return (
                  <div
                    key={index}
                    className={` box-border border-l-[6px] border-white cursor-pointer  w-full ${
                      isActive === element?.id || isActive === element?.lastMessage?.id
                        ? 'active-message-left-side-bar bg-lightbluebg'
                        : ''
                    }`}
                    onClick={() => handleSelected(elementId, element)}
                  >
                    <div className="border-b border-b-lightgrey w-[95%] flex items-center py-3 ml-[3px] ">
                      <div>
                        <Avatar
                          name={
                            element?.User?.firstName || element?.userDetails[UserIndex]?.firstName
                          }
                          image={
                            element?.User?.profilePicture ||
                            (element?.userDetails &&
                              element?.userDetails[UserIndex]?.profilePictureUrl) ||
                            (element?.userDetails &&
                              element?.userDetails[UserIndex]?.profilePicture)
                          }
                          classNames="w-[40px] h-[40px]"
                        />
                      </div>
                      {addContact ? (
                        <div className="ml-2 w-full mr-2">
                          <div className="flex justify-between">
                            <h3 className="text-[16px] font-semibold">
                              {element?.User?.firstName ||
                                element?.userDetails[UserIndex]?.firstName}
                            </h3>
                            <TimeAgo timestamp={element?.lastMessage?.timestamp} />
                          </div>
                          <div className="flex justify-between">
                            <p
                              className={`text-[14px] font-medium text-greydark ${
                                element?.unReadCount > 0 ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {element?.lastMessage?.content
                                ? element?.lastMessage?.content?.length > 18
                                  ? `${element?.lastMessage?.content.substring(0, 10)}...`
                                  : element?.lastMessage?.content
                                : ''}
                            </p>
                            {element?.unReadCount > 0 ? (
                              element?.lastMessage?.idFrom !== myProfile?.id ? (
                                <span className="inline-flex items-center justify-center bg-gradient-to-r from-buttongradientfrom to-buttongradientto h-4 w-4 rounded-full">
                                  <span className="text-white text-[12px]">
                                    {element?.unReadCount}
                                  </span>
                                </span>
                              ) : (
                                <TextSeen seen={element?.read} />
                              )
                            ) : (
                              <TextSeen seen={element?.read} />
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="ml-2 mr-2 w-full">
                          <div className="flex justify-between items-center">
                            <h3 className="text-[16px] font-semibold">
                              {element?.User?.firstName}
                            </h3>
                            <img src={messageVector} alt="" className="w-[24px] h-[24px]" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
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
                      setSelectedElement(null);
                    }}
                  />
                  <Avatar
                    name={
                      contacts
                        .find((contact) => contact?.lastMessage?.id === isActive)
                        ?.userIds.findIndex((user) => user !== myProfile?.id) !== -1
                        ? contacts.find((contact) => contact?.lastMessage?.id === isActive)
                            ?.userDetails?.[
                            contacts
                              .find((contact) => contact?.lastMessage?.id === isActive)
                              ?.userIds.findIndex((user) => user !== myProfile?.id)
                          ]?.firstName ||
                          contacts.find((contact) => contact?.id === isActive)?.User?.firstName ||
                          'DefaultName'
                        : ''
                    }
                    image={
                      contacts
                        .find((contact) => contact?.lastMessage?.id === isActive)
                        ?.userIds.findIndex((user) => user !== myProfile?.id) !== -1
                        ? contacts.find((contact) => contact?.lastMessage?.id === isActive)
                            ?.userDetails?.[
                            contacts
                              .find((contact) => contact?.lastMessage?.id === isActive)
                              ?.userIds.findIndex((user) => user !== myProfile?.id)
                          ]?.profilePictureUrl ||
                          contacts.find((contact) => contact?.lastMessage?.id === isActive)
                            ?.userDetails?.[
                            contacts
                              .find((contact) => contact?.lastMessage?.id === isActive)
                              ?.userIds.findIndex((user) => user !== myProfile?.id)
                          ]?.profilePicture ||
                          contacts.find((contact) => contact?.id === isActive)?.User
                            ?.profilePicture ||
                          ''
                        : ''
                    }
                    classNames="w-[52px] h-[52px] ml-4 md:ml-0"
                  />
                  <div className="ml-2">
                    <span className="text-[20px] font-semibold">
                      {isActive !== null
                        ? contacts
                            .find((contact) => contact?.lastMessage?.id === isActive)
                            ?.userIds.findIndex((user) => user !== myProfile?.id) !== -1
                          ? contacts.find((contact) => contact?.lastMessage?.id === isActive)
                              ?.userDetails?.[
                              contacts
                                .find((contact) => contact?.lastMessage?.id === isActive)
                                ?.userIds.findIndex((user) => user !== myProfile?.id)
                            ]?.firstName ||
                            contacts.find((contact) => contact?.id === isActive)?.User?.firstName ||
                            'DefaultName'
                          : ''
                        : ''}
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
              <div className=" overflow-auto scrollbar-custom h-full" ref={chatContainerRef}>
                <Chats
                  fileData={fileData}
                  retrievedDocumentId={retrievedDocumentId}
                  scrollChatContainer={scrollChatContainer}
                  selected={selected}
                />
              </div>
              <InputTextarea
                onFileInputChange={handleFileInputChange}
                toId={toId}
                contacts={contacts}
                isActive={isActive}
                selectedId={selectedId}
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
          secondaryButtonAction={() => {
            deleteChat();
          }}
        >
          <div className="w-[286px] mx-auto ">
            <span className="text-[18px] font-medium">Are you sure you want to delete chat?</span>
          </div>
        </ConfirmationModal>

        <ReportUser
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          userId={userId}
        />

        <ConfirmationModal
          title="Block User"
          isOpen={isBlockModalOpen}
          onClose={() => setIsBlockModalOpen(false)}
          primaryButtonTitle="No"
          primaryButtonAction={() => setIsBlockModalOpen(false)}
          secondaryButtonTitle="Yes"
          secondaryButtonAction={() => blockClickHandler()}
        >
          <div className="text-[18px] tx-greydark font-medium">
            Are you sure you want to block “
            {isActive !== null
              ? contacts
                  .find((contact) => contact?.lastMessage?.id === isActive)
                  ?.userIds.findIndex((user) => user !== myProfile?.id) !== -1
                ? contacts.find((contact) => contact?.lastMessage?.id === isActive)?.userDetails?.[
                    contacts
                      .find((contact) => contact?.lastMessage?.id === isActive)
                      ?.userIds.findIndex((user) => user !== myProfile?.id)
                  ]?.firstName ||
                  contacts.find((contact) => contact?.id === isActive)?.User?.firstName ||
                  'DefaultName'
                : ''
              : ''}
            ”?
          </div>
        </ConfirmationModal>
      </div>
    </SectionLayout>
  );
};

export default Messages;
