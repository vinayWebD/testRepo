import React from 'react';
import Avatar from '../../components/common/Avatar';
import ludgi from '../../assets/images/ludgi.svg';
import TestSeen from '../../components/Icons/TestSeen';
import DocumentIcon from '../../components/Icons/DocumentIcon';
import { Link } from 'react-router-dom';

const MediaMsg = ({ element }) => {
  return (
    <div
      className={`flex items-center flex-row ml-2 mt-4 m-6 ${
        !element?.incoming ? 'flex-row-reverse' : 'justify-start'
      }`}
    >
      <div>
        <div
          className={`flex items-end ${!element?.incoming ? 'flex-row-reverse' : 'justify-start'}`}
        >
          <Avatar image={ludgi} />
          <div className="ml-2 mr-2">
            <div
              className={`max-w-[340px] p-[5px] ${
                element?.incoming === true
                  ? 'bg-whitemedium rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'
                  : 'bg-blueprimary rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl text-white'
              }`}
            >
              <img
                src={element?.img}
                alt=""
                className={`max-h-[210px] ${
                  !element?.incoming
                    ? 'rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
                    : 'rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'
                } `}
              />
              <div className="mt-[2px]">{element?.message ? element?.message : ''}</div>
            </div>
          </div>
        </div>
        <div
          className={`flex items-center ${
            element?.incoming === true ? 'justify-start ml-[40px] mt-1' : 'justify-end mr-[40px]'
          }`}
        >
          <div>{!element?.incoming ? <TestSeen seen /> : ''}</div>
          <div className="text-[12px] text-greydark ml-1">{element?.time}</div>
        </div>
      </div>
    </div>
  );
};
const VideoMsg = ({ element }) => {
  return (
    <div
      className={`flex items-center flex-row ml-2 mt-4 m-6 ${
        !element?.incoming ? 'flex-row-reverse' : 'justify-start'
      }`}
    >
      <div>
        <div
          className={`flex items-end ${!element?.incoming ? 'flex-row-reverse' : 'justify-start'}`}
        >
          <Avatar image={ludgi} />
          <div className="ml-2 mr-2">
            <div
              className={`max-w-[340px] p-[5px] ${
                element?.incoming === true
                  ? 'bg-whitemedium rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'
                  : 'bg-blueprimary rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl text-white'
              }`}
            >
              <video
                src={element?.video}
                alt=""
                className={`max-h-[210px] ${
                  !element?.incoming
                    ? 'rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
                    : 'rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'
                } `}
                controls
              />
              <div className="mt-[2px]">{element?.message ? element?.message : ''}</div>
            </div>
          </div>
        </div>
        <div
          className={`flex items-center ${
            element?.incoming === true ? 'justify-start ml-[40px] mt-1' : 'justify-end mr-[40px]'
          }`}
        >
          <div>{!element?.incoming ? <TestSeen seen /> : ''}</div>
          <div className="text-[12px] text-greydark ml-1">{element?.time}</div>
        </div>
      </div>
    </div>
  );
};

const TextMsg = ({ element }) => {
  return (
    <div
      className={`flex items-center flex-row ml-2 mt-4 m-6 ${
        !element?.incoming ? 'flex-row-reverse' : 'justify-start'
      }`}
    >
      <div>
        <div
          className={`flex items-end ${!element?.incoming ? 'flex-row-reverse' : 'justify-start'}`}
        >
          <Avatar image={ludgi} />
          <div className="ml-2 mr-2">
            <div
              className={`max-w-[340px] p-4 ${
                element?.incoming === true
                  ? 'bg-whitemedium rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'
                  : 'bg-blueprimary rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
              }`}
            >
              <div
                className={`text-[14px] ${
                  element?.incoming === true ? 'text-greydark' : 'text-white'
                }`}
              >
                {element?.message}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex items-center ${
            element?.incoming === true ? 'justify-start ml-[40px] mt-1' : 'justify-end mr-[40px]'
          }`}
        >
          <div>{!element?.incoming ? <TestSeen seen /> : ''}</div>
          <div className="text-[12px] text-greydark ml-1">{element?.time}</div>
        </div>
      </div>
    </div>
  );
};

const Timestamp = ({ element }) => {
  return (
    <div className="flex justify-center">
      <div className=" bg-greymedium w-[60px] h-[24px] rounded-[20px] flex items-center justify-center">
        <div className="text-greydark text-[12px] font-normal">{element?.text}</div>
      </div>
    </div>
  );
};
const Divider = ({ element }) => {
  return (
    <div className="flex justify-center">
      <div className=" bg-whitelight w-full h-[34px] flex items-center justify-center">
        <div className="text-greydark text-[12px] font-medium">{element?.text}</div>
      </div>
    </div>
  );
};
const Document = ({ element }) => {
  return (
    <div
      className={`flex items-center flex-row ml-2 mt-4 m-6 ${
        !element?.incoming ? 'flex-row-reverse' : 'justify-start'
      }`}
    >
      <div>
        <div
          className={`flex items-end ${!element?.incoming ? 'flex-row-reverse' : 'justify-start'}`}
        >
          <Avatar image={ludgi} />
          <div className="ml-2 mr-2">
            <div
              className={`max-w-[340px] p-4 ${
                element?.incoming === true
                  ? 'bg-whitemedium rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'
                  : 'bg-blueprimary rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
              }`}
            >
              <div className={'text-[14px] text-blueprimary'}>
                <div className="flex items-center cursor-pointer bg-lightbluebg p-4 rounded-lg">
                  <div className="flex items-center">
                    <DocumentIcon fill="#0071BC" className="h-[20px] w-[20px]" />
                    <div className="text-[14px] ml-1">Document File</div>
                  </div>
                  <div className="ml-6">
                    <div className="text-[10px]">20 KB · PDF</div>
                  </div>
                </div>
                {element?.message ? (
                  <div
                    className={`mt-2 text-[14px] ${
                      element?.incoming === true ? 'text-greydark' : 'text-white'
                    }`}
                  >
                    {element?.message}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex items-center ${
            element?.incoming === true ? 'justify-start ml-[40px] mt-1' : 'justify-end mr-[40px]'
          }`}
        >
          <div>{!element?.incoming ? <TestSeen seen /> : ''}</div>
          <div className="text-[12px] text-greydark ml-1">{element?.time}</div>
        </div>
      </div>
    </div>
  );
};
const SharedLink = ({ element }) => {
  return (
    <div
      className={`flex items-center flex-row ml-2 mt-4 m-6 ${
        !element?.incoming ? 'flex-row-reverse' : 'justify-start'
      }`}
    >
      <div>
        <div
          className={`flex items-end ${!element?.incoming ? 'flex-row-reverse' : 'justify-start'}`}
        >
          <Avatar image={ludgi} />
          <div className="ml-2 mr-2">
            <div
              className={`max-w-[340px] p-4 ${
                element?.incoming === true
                  ? 'bg-whitemedium rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'
                  : 'bg-blueprimary rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl text-white'
              }`}
            >
              <div>
                <Link className="underline" target="_blank" to={element?.link}>
                  {element?.link}
                </Link>
                <div>{element?.message ? element?.message : ''}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex items-center ${
            element?.incoming === true ? 'justify-start ml-[40px] mt-1' : 'justify-end mr-[40px]'
          }`}
        >
          <div>{!element?.incoming ? <TestSeen seen /> : ''}</div>
          <div className="text-[12px] text-greydark ml-1">{element?.time}</div>
        </div>
      </div>
    </div>
  );
};

export { Timestamp, TextMsg, MediaMsg, SharedLink, Divider, Document, VideoMsg };
