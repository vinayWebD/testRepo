import React, { useEffect, useState } from 'react';
import { Divider, SharedLink, MediaMsg, TextMsg, Timestamp, Document, VideoMsg } from './chatTypes';
import cross from '../../assets/images/cross.svg';
import documentAttachment from '../../assets/images/document-attachment.svg';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import db from '../../firebase';
import { useSelector } from 'react-redux';

const chats = (props) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [dataType, setDataType] = useState('');
  const [data, setData] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  const [messages, setMessages] = useState([]);
  const [textSeen, setTextSeen] = useState();
  const [unreadMessages, setUnreadMeassages] = useState(false);
  const myProfile = useSelector((state) => state.auth.user);
  const fetchData = async () => {
    try {
      const q = query(
        collection(db, 'test_messages', props.retrievedDocumentId, props.retrievedDocumentId),
        orderBy('timestamp'),
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let messagesData = [];
        querySnapshot.forEach((doc) => {
          messagesData.push({ ...doc.data(), id: doc.id });
        });
        setMessages(messagesData);
        const lastMessage = messagesData[messagesData?.length - 1];
        const hasUnread = lastMessage && !lastMessage?.read;
        setUnreadMeassages(hasUnread);
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error getting messages: ', error);
      setTextSeen(true);
    }
  };

  useEffect(() => {
    let unsubscribeFunction;
    const fetchDataAndSubscribe = async () => {
      unsubscribeFunction = await fetchData();
    };
    fetchDataAndSubscribe();
    return () => {
      if (unsubscribeFunction) {
        unsubscribeFunction();
      }
    };
  }, [props.retrievedDocumentId]);
  useEffect(() => {
    props.scrollChatContainer();
  }, [messages]);

  useEffect(() => {
    if (props.fileData && props.fileData.length > 0) {
      const selectedType = props.fileData[0]?.type.split('/')[0];
      if (selectedType === 'image') {
        setDataType(1);
        const reader = new FileReader();
        reader.onload = (event) => {
          setImageSrc(event.target.result);
        };

        reader.readAsDataURL(props.fileData[0]);
      } else if (selectedType === 'video') {
        setDataType(2);
        const reader = new FileReader();
        reader.onload = (event) => {
          setVideoSrc(event.target.result);
        };

        reader.readAsDataURL(props.fileData[0]);
      } else {
        setData(props.fileData);
        setDataType(3);
      }
      setOpenPopup(true);
    }
  }, [props.fileData]);

  return (
    <div className="h-full">
      {openPopup ? (
        <div className="h-full overflow-hidden">
          <div className="pt-2 pr-4 pl-4 pb-2 h-full">
            <div className="flex justify-between">
              <div></div>
              {dataType === 3 ? <div>Document</div> : ''}
              <img
                src={cross}
                alt=""
                className="cursor-pointer"
                onClick={() => {
                  setOpenPopup(false);
                }}
              />
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full">
              {dataType === 3 ? (
                <>
                  <img src={documentAttachment} alt="" />
                  <div>{data[0]?.name}</div>
                  <div>{Math.floor(data[0].size / 1024)} KB · PDF</div>
                </>
              ) : dataType === 1 ? (
                <img src={imageSrc} alt="" className="max-w-[80%] max-h-[90%]" />
              ) : (
                <video src={videoSrc} controls className="max-w-[80%] max-h-[90%]" />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {messages?.map((element, index) => {
            switch (element?.type) {
              case 'divider':
                return <Timestamp key={index} element={element} />;
              case 'msg':
                switch (element?.subType) {
                  case 'img':
                    return <MediaMsg key={element?.id} element={element} />;
                  case 'doc':
                    return <Document key={element?.id} element={element} />;
                  case 'link':
                    return <SharedLink key={element?.id} element={element} />;
                  case 'video':
                    return <VideoMsg key={element?.id} element={element} />;
                  case 'reply':
                    //reply
                    break;
                  default:
                    return (
                      <>
                        {myProfile.id !== messages[messages.length - 1]?.idFrom &&
                          unreadMessages &&
                          index === messages.length - 1 && <Divider key={index} />}
                        <TextMsg
                          key={element?.id}
                          element={element}
                          selected={props.selected}
                          textSeen={textSeen}
                        />
                      </>
                    );
                }
                break;

              default:
                return <React.Fragment key={element?.type}></React.Fragment>;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default chats;
