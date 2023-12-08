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
import { db } from '../../firebase';

const InputTextarea = ({ onFileInputChange, fromId, toId, contacts }) => {
  const [emojiToggle, setEmojiToggle] = useState(false);
  const [attachmentToggle, setAttachmentToggle] = useState(false);
  const [mediaTypeToUpload, setMediaTypeToUpload] = useState('photo');
  const [openFileBrowser, setOpenFileBrowser] = useState(0);
  const [collectionIds, setCollectionIds] = useState('');
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);
  const emojieContainerRef = useRef(null);
  const attachmentContainerRef = useRef(null);
  const mediaInput = useRef(null);
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

  // const onEmojiClick = (emojiObject) => {
  //   handleChange((prevText) => {
  //     if (prevText.length + emojiObject.emoji?.length) {
  //       return prevText + emojiObject.emoji;
  //     } else {
  //       return prevText;
  //     }
  //   });
  // };
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
    console.log(collectionIds);
    console.log('TextidTo', toId);
    console.log('TextidFrom', fromId);
    let collectionId;
    if (toId < fromId) {
      collectionId = `${toId}_${fromId}`;
      setCollectionIds(collectionId);
    } else {
      collectionId = `${fromId}_${toId}`;
      setCollectionIds(collectionId);
    }

    const testMessagesCollectionRef = collection(db, 'test_messages');
    const documentRef = doc(testMessagesCollectionRef, collectionId);

    const timestampInSeconds = Math.floor(Date.now() / 1000);
    setDoc(documentRef, {
      chatId: collectionId,
      lastMessage: {
        content: input,
        idFrom: fromId,
        idTo: toId,
        read: true,
        timestamp: timestampInSeconds,
      },
      timestamp: timestampInSeconds,
      userIds: [fromId, toId],
      userDetails: ['myInfo', contacts.find((user) => user.id === toId) || 'wrong concept'],
    });

    const DocumentRef = collection(documentRef, collectionId);
    const timestampDocumentRef = doc(DocumentRef, timestampInSeconds.toString());

    setDoc(timestampDocumentRef, {
      type: 'msg',
      message: input,
      idFrom: fromId,
      idTo: toId,
      read: true,
      timestamp: timestampInSeconds,
    });
    setInput('');
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
          className=" p-[9px] outline-none w-full text-m border-none  placeholder:text-greylight"
          autoComplete={'true'}
          rows={1}
          onInput={autoExpand}
          ref={(el) => {
            textareaRef.current = el;
          }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <div className="cursor-pointer" onClick={() => onSend()}>
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
              // onEmojiClick={onEmojiClick}
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
                      handleFileBrowser(element.text);
                      setAttachmentToggle(false);
                    }}
                  >
                    <div>{element.icon}</div>
                    <div className="ml-2">{element.text}</div>
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
        }} // We are setting this to null because we want to be able to select the same file simultaneously
        onInput={() => onFileInputChange(mediaInput.current.files)}
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
