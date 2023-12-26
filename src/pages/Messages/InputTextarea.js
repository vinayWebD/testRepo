import React, { useEffect, useRef, useState } from 'react';
import EmojieIcon from '../../components/Icons/EmojieIcon';
import AttachmentIcon from '../../components/Icons/AttachmentIcon';
import SendIcon from '../../components/Icons/SendIcon';
import EmojiPicker from 'emoji-picker-react';
import PhotoIcon from '../../components/Icons/PhotoIcon';
import VideoIcon from '../../components/Icons/VideoIcon';
import DocumentIcon from '../../components/Icons/DocumentIcon';
import { POST_IMAGE_TYPES, POST_VIDEO_TYPES, POST_DOCUMENT_TYPES } from '../../constants/constants';
import { collection, setDoc, doc } from 'firebase/firestore';
import db from '../../firebase';
import { useSelector } from 'react-redux';

const InputTextarea = ({ onFileInputChange, toId, contacts, isActive, selectedId }) => {
  const [emojiToggle, setEmojiToggle] = useState(false);
  const [attachmentToggle, setAttachmentToggle] = useState(false);
  const [mediaTypeToUpload, setMediaTypeToUpload] = useState('photo');
  const [openFileBrowser, setOpenFileBrowser] = useState(0);
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);
  const emojieContainerRef = useRef(null);
  const attachmentContainerRef = useRef(null);
  const mediaInput = useRef(null);
  const myProfile = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (openFileBrowser) {
      mediaInput?.current?.click();
    }
  }, [openFileBrowser]);

  const autoExpand = () => {
    const textarea = textareaRef.current;
    const textAreaActualHeight = parseInt(textarea.style.height);

    textarea.style.height = 'inherit';
    const computed = window.getComputedStyle(textarea);
    const height =
      parseInt(computed.getPropertyValue('padding-top'), 10) +
      textarea.scrollHeight +
      parseInt(computed.getPropertyValue('padding-bottom'), 10) -
      14;

    if (height < 180) {
      textarea.style.height = height + 'px';
    } else {
      textarea.style.height = textAreaActualHeight + 'px';
    }
  };

  const handleFileBrowser = (type) => {
    if (type === 'Photos') {
      setMediaTypeToUpload('photo');
    } else if (type === 'Video') {
      setMediaTypeToUpload('video');
    } else {
      setMediaTypeToUpload('document');
    }
    setOpenFileBrowser((prev) => prev + 1);
  };

  const onEmojiClick = (emojiObject) => {
    handleChange((prevText) => {
      if (prevText.length + emojiObject.emoji?.length) {
        return prevText + emojiObject.emoji;
      } else {
        return prevText;
      }
    });
  };
  const handleChange = (newText) => {
    setInput(newText);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojieContainerRef.current && !emojieContainerRef.current.contains(event.target)) {
        setEmojiToggle(false);
      }
      if (
        attachmentContainerRef.current &&
        !attachmentContainerRef.current.contains(event.target)
      ) {
        setAttachmentToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const onSend = async () => {
    textareaRef.current.style.height = 'inherit';
    let collectionId;
    const numericToId = parseInt(toId, 10);
    const numericMyProfileId = parseInt(myProfile?.id, 10);

    if (numericToId < numericMyProfileId) {
      collectionId = `${numericToId}_${numericMyProfileId}`;
    } else {
      collectionId = `${numericMyProfileId}_${numericToId}`;
    }
    let foundUser;
    contacts.some((user) => {
      if (!user?.lastMessage && user?.id === isActive) {
        foundUser = user?.User;
        return true;
      } else if (user?.lastMessage?.id === isActive) {
        const userIdIndex = user?.userIds?.findIndex((id) => id !== myProfile?.id);
        if (userIdIndex !== -1) {
          foundUser = user?.userDetails[userIdIndex];
        }
        return true;
      }
      return false;
    });

    const testMessagesCollectionRef = collection(db, 'test_messages');
    const documentRef = doc(testMessagesCollectionRef, collectionId);

    const timestampInSeconds = Math.floor(Date.now() / 1000);
    setDoc(documentRef, {
      chatId: collectionId,
      lastMessage: {
        content: input,
        idFrom: myProfile?.id,
        idTo: toId,
        read: false,
        timestamp: timestampInSeconds,
        id: selectedId,
      },
      read: false,
      timestamp: timestampInSeconds,
      userIds: [myProfile?.id, toId],
      userDetails: [myProfile, foundUser],
      unReadCount: 0,
    });

    const DocumentRef = collection(documentRef, collectionId);
    const timestampDocumentRef = doc(DocumentRef, timestampInSeconds.toString());

    setDoc(timestampDocumentRef, {
      type: 'msg',
      message: input,
      idFrom: myProfile?.id,
      idTo: toId,
      read: false,
      timestamp: timestampInSeconds,
    });
    setInput('');
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !input.trim()) {
      e.preventDefault();
    }

    if (e.key === 'Enter' && !e.shiftKey && input.trim()) {
      e.preventDefault();
      onSend();
    }
  };
  const data = [
    { icon: <PhotoIcon fill="#0071BC" />, text: 'Photos' },
    { icon: <VideoIcon fill="#0071BC" />, text: 'Video' },
    { icon: <DocumentIcon fill="#0071BC" />, text: 'Document' },
  ];
  return (
    <>
      <div className=" relative flex items-center border border-lightgrey rounded-xl w-[90%] mx-auto m-2 pr-4 pl-4 mb-[20px] ">
        <div className="flex  items-center ml-2 cursor-pointer">
          <div onClick={() => setEmojiToggle(!emojiToggle)}>
            <EmojieIcon />
          </div>
          <div className="ml-2" onClick={() => setAttachmentToggle(!attachmentToggle)}>
            <AttachmentIcon />
          </div>
        </div>
        <textarea
          value={input}
          placeholder="Type a message..."
          className=" p-[9px] min-h-10 outline-none w-full text-m border-none  placeholder:text-greylight"
          autoComplete={'true'}
          rows={1}
          onInput={autoExpand}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          ref={textareaRef}
        />
        <div
          className={`cursor-pointer ${!input.trim() ? 'opacity-60' : ''}`}
          onClick={() => {
            if (input.trim()) {
              onSend();
            }
          }}
        >
          <SendIcon />
        </div>
        {emojiToggle && (
          <div
            className="absolute top-[-356px] left-[20px] z-[1000] max-h-[320px]"
            ref={emojieContainerRef}
          >
            <EmojiPicker
              width={'300px'}
              height={'350px'}
              onEmojiClick={onEmojiClick}
              searchDisabled={true}
              skinTonesDisabled={true}
              previewConfig={{
                showPreview: false,
                defaultEmoji: '1f60a',
              }}
            />
          </div>
        )}
        {attachmentToggle && (
          <div
            className="absolute bottom-[45px] left-[50px] w-fit h-fit bg-white rounded-lg shadow-lg"
            ref={attachmentContainerRef}
          >
            <ul className="flex flex-col justify-evenly">
              {data.map((element, index) => (
                <div key={index}>
                  <li
                    className="flex p-4 cursor-pointer hover:bg-greylighter"
                    onClick={() => {
                      handleFileBrowser(element?.text);
                      setAttachmentToggle(false);
                    }}
                  >
                    <div>{element?.icon}</div>
                    <div className="ml-2">{element?.text}</div>
                  </li>
                  <hr className="text-greylighter" />
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
      <input
        ref={mediaInput}
        type="file"
        multiple={true}
        // onInput={() => uploadMedia()}
        onClick={(e) => {
          e.target.value = null;
        }}
        onInput={() => onFileInputChange(mediaInput?.current?.files)}
        className="contents w-0 h-0 "
        accept={
          mediaTypeToUpload === 'photo'
            ? POST_IMAGE_TYPES
            : mediaTypeToUpload === 'video'
            ? POST_VIDEO_TYPES
            : POST_DOCUMENT_TYPES
        }
      />
    </>
  );
};

export default InputTextarea;
