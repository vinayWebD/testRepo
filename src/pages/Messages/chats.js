import React, { useEffect, useState } from 'react';
import { Divider, SharedLink, MediaMsg, TextMsg, Timestamp, Document, VideoMsg } from './chatTypes';
import ludgi from '../../assets/images/ludgi.svg';
import cross from '../../assets/images/cross.svg';
import documentAttachment from '../../assets/images/document-attachment.svg';

const chatHistoryData = [
  {
    type: 'msg',
    image: { ludgi },
    time: '11:24 Am',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate doloremque saepe est numquam molestiae qui tempore voluptatum dolorem amet, libero aliquid beatae repellat obcaecati, delectus autem! Adipisci quis eos, fugiat quasi laudantium, tenetur suscipit aspernatur, vel nostrum dignissimos omnis debitis iusto expedita corporis praesentium officia reiciendis enim optio repellat? Voluptates quas enim natus dolores veniam consequatur obcaecati quod corporis magnam explicabo ratione officia sint, nemo iure aliquam ipsum odio dolorum aliquid expedita delectus corrupti saepe molestiae. Tempore numquam necessitatibus, dolores, vero distinctio, dolore minus saepe doloribus reprehenderit consequatur nam! Autem dignissimos dolorem similique illo maxime ullam optio ratione quod laboriosam.',
    incoming: false,
    outgoing: true,
  },
  {
    type: 'divider',
    text: 'Today',
  },
  {
    type: 'msg',
    message: 'How are you',
    image: { ludgi },
    time: '11:24 Am',
    incoming: false,
    outgoing: true,
  },
  {
    type: 'msg',
    image: { ludgi },
    time: '11:24 Am',
    message: 'Hello',
    incoming: true,
    outgoing: false,
  },
  {
    type: 'unreadMessages',
    text: 'Unread Messages',
  },
  {
    type: 'msg',
    subType: 'img',
    image: { ludgi },
    time: '11:24 Am',
    img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    message: 'Here you go!?',
    incoming: true,
    outgoing: true,
  },
  {
    type: 'msg',
    subType: 'video',
    image: { ludgi },
    time: '11:24 Am',
    video: 'http://www.example.com/movie.ogg',
    message: 'Here you go!?',
    incoming: true,
    outgoing: true,
  },
  {
    type: 'msg',
    subType: 'link',
    image: { ludgi },
    time: '11:24 Am',
    link: 'https://www.google.com/',
    message: 'Here you Go',
    incoming: false,
    outgoing: true,
  },
  {
    type: 'msg',
    subType: 'doc',
    image: { ludgi },
    time: '11:24 Am',
    message: 'How are you',
    incoming: true,
    outgoing: true,
  },
  {
    type: 'msg',
    subType: 'doc',
    image: { ludgi },
    time: '11:24 Am',
    message: 'How are you',
    incoming: false,
    outgoing: true,
  },
  {
    type: 'msg',
    image: { ludgi },
    time: '11:24 Am',
    subType: 'reply',
    message: 'How are you',
    incoming: false,
    outgoing: true,
  },
];

const chats = (props) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [dataType, setDataType] = useState('');
  const [data, setData] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  // const [chatHistoryData, setChatHistoryData] = useState([]);

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
    // setChatHistoryData(props.chatHistoryData);
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
                  <div>{data[0].name}</div>
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
          {chatHistoryData?.map((element) => {
            switch (element.type) {
              case 'divider':
                return <Timestamp element={element} />;
              case 'unreadMessages':
                return <Divider element={element} />;
              case 'msg':
                switch (element.subType) {
                  case 'img':
                    return <MediaMsg element={element} />;
                  case 'doc':
                    return <Document element={element} />;
                  case 'link':
                    return <SharedLink element={element} />;
                  case 'video':
                    return <VideoMsg element={element} />;
                  case 'reply':
                    //reply
                    break;
                  default:
                    return <TextMsg element={element} />;
                }
                break;

              default:
                return <React.Fragment key={element.type}></React.Fragment>;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default chats;
