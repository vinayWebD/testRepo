import React, { useState } from 'react';
import RemoveIcon from './Icons/RemoveIcon';
import Modal from './Modal';
import CreatePostMediaPreview from './CreatePost/CreatePostMediaPreview';

const MediaLayout = ({ media = [] }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [customActiveIndex, setCustomActiveIndex] = useState(null);

  const handleClick = (currentIndex) => {
    setIsPreviewOpen(true);
    setCustomActiveIndex(currentIndex);
  };

  const MediaItem = ({ type, src = '', showMoreOverlay = 0, index = 0 }) => {
    if (type === 'video') {
      return (
        <div className="h-auto relative">
          <video
            src={src}
            className="w-full min-h-full min-w-full"
            controls={true}
            height={'100%'}
            onClick={() => handleClick(index)}
          />
          {showMoreOverlay ? (
            <div className="absolute">+ {showMoreOverlay}</div>
          ) : (
            <div className="absolute top-2 right-2">
              <RemoveIcon />
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="h-full relative">
          <img src={src} alt="media" className="w-full" onClick={() => handleClick(index)} />
          {showMoreOverlay ? (
            <div className="absolute top-0 left-0 text-white text-lg w-full h-full bg-[#0000008a] rounded-lg font-medium flex justify-center text-center items-center">
              + {showMoreOverlay}
            </div>
          ) : (
            <div className="absolute top-2 right-2">
              <RemoveIcon />
            </div>
          )}
        </div>
      );
    }
  };

  if (!media.length) return null;

  if (isPreviewOpen) {
    return (
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        isTitle={true}
        title={'Create Post'}
      >
        <div className="max-w-[400px] m-auto">
          <CreatePostMediaPreview media={media} customActiveIndex={customActiveIndex} />
        </div>
      </Modal>
    );
  }

  const getMedia = () => {
    if (media.length === 1) {
      return <MediaItem src={media[0].src} type={media[0].type} index={0} />;
    } else if (media.length === 2 || media.length === 4) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-w-screen-lg mx-auto ">
          {media.map(({ src, type }, index) => (
            <MediaItem src={src} type={type} key={index} index={index} />
          ))}
        </div>
      );
    } else if (media.length === 3) {
      return (
        <div className="flex gap-1 w-full">
          <div className="w-[50%]">
            <MediaItem src={media[0].src} type={media[0].type} index={0} />
          </div>
          <div className="flex gap-1 w-[50%] flex-col">
            <MediaItem src={media[1].src} type={media[1].type} index={1} />
            <MediaItem src={media[2].src} type={media[2].type} index={2} />
          </div>
        </div>
      );
    } else if (media.length >= 5) {
      return (
        <div className="flex-col flex gap-1 ">
          <div className="w-full flex gap-1 ">
            <MediaItem src={media[0].src} type={media[0].type} index={0} />
            <MediaItem src={media[1].src} type={media[1].type} index={1} />
          </div>
          <div className="w-full flex gap-1">
            <MediaItem src={media[2].src} type={media[2].type} index={2} />
            <MediaItem src={media[3].src} type={media[3].type} index={3} />
            <MediaItem
              src={media[4].src}
              type={media[4].type}
              showMoreOverlay={media.length - 5}
              index={4}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className={`media-layout ${
        media.length !== 1 ? 'border border-greymedium p-2' : ''
      } rounded-lg`}
    >
      {getMedia()}
    </div>
  );
};

export default MediaLayout;
