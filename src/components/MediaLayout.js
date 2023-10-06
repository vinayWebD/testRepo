import React, { useState } from 'react';
import RemoveIcon from './Icons/RemoveIcon';
import Modal from './Modal';
import CreatePostMediaPreview from './CreatePost/CreatePostMediaPreview';

const MediaLayout = ({ media = [], forcedPreview = false, updateMedia = () => {} }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(forcedPreview || false);
  const [customActiveIndex, setCustomActiveIndex] = useState(forcedPreview ? 0 : null);

  if (!media.length) return null;

  const handleClick = (currentIndex) => {
    setIsPreviewOpen(true);
    setCustomActiveIndex(currentIndex);
  };

  const handleRemoveMedia = (currentIndex) => {
    const updatedMedia = media.filter((item, _i) => item && _i !== currentIndex);
    updateMedia(updatedMedia);
  };

  if (isPreviewOpen) {
    return (
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        isTitle={true}
        title={'Create Post'}
        width="!w-[75vw]"
        childrenClassNames=""
      >
        <div className="m-auto pt-4">
          <CreatePostMediaPreview
            media={media}
            customActiveIndex={customActiveIndex}
            removeMedia={handleRemoveMedia}
            closeModal={() => setIsPreviewOpen(false)}
          />
        </div>
      </Modal>
    );
  }

  const getMedia = () => {
    if (media.length === 1) {
      return (
        <MediaItem
          url={media[0].url}
          type={media[0].type}
          index={0}
          onClick={handleClick}
          removeMedia={handleRemoveMedia}
        />
      );
    } else if (media.length === 2 || media.length === 4) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-w-screen-lg mx-auto ">
          {media.map(({ url, type }, index) => (
            <MediaItem
              url={url}
              type={type}
              key={index}
              index={index}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
            />
          ))}
        </div>
      );
    } else if (media.length === 3) {
      return (
        <div className="flex gap-1 w-full">
          <div className="w-[50%]">
            <MediaItem
              url={media[0].url}
              type={media[0].type}
              index={0}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
            />
          </div>
          <div className="flex gap-1 w-[50%] flex-col">
            <MediaItem
              url={media[1].url}
              type={media[1].type}
              index={1}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
            />
            <MediaItem
              url={media[2].url}
              type={media[2].type}
              index={2}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
            />
          </div>
        </div>
      );
    } else if (media.length >= 5) {
      return (
        <div className="flex-col flex gap-1 ">
          <div className="w-full flex gap-1 ">
            <MediaItem
              url={media[0].url}
              type={media[0].type}
              index={0}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
            />
            <MediaItem
              url={media[1].url}
              type={media[1].type}
              index={1}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
            />
          </div>
          <div className="w-full flex gap-1">
            <MediaItem
              url={media[2].url}
              type={media[2].type}
              index={2}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
            />
            <MediaItem
              url={media[3].url}
              type={media[3].type}
              index={3}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
            />
            <MediaItem
              url={media[4].url}
              type={media[4].type}
              showMoreOverlay={media.length - 5}
              index={4}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
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

const MediaItem = ({
  type,
  url = '',
  showMoreOverlay = 0,
  index = 0,
  onClick = () => {},
  removeMedia = () => {},
}) => {
  if (type === 'video') {
    return (
      <div className="h-auto relative w-full">
        <video
          src={url}
          className="w-full min-h-full min-w-full"
          controls={true}
          height={'100%'}
          onClick={() => onClick(index)}
        />
        {showMoreOverlay ? (
          <div className="absolute cursor-pointer" onClick={() => onClick(index)}>
            + {showMoreOverlay}
          </div>
        ) : (
          <div className="absolute top-2 right-2 cursor-pointer" onClick={() => removeMedia(index)}>
            <span>
              <RemoveIcon />
            </span>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="h-full relative max-h-[300px] w-full overflow-hidden">
        <img src={url} alt="media" className="w-full" onClick={() => onClick(index)} />
        {showMoreOverlay ? (
          <div
            className="cursor-pointer absolute top-0 left-0 text-white text-lg w-full h-full bg-[#0000008a] rounded-lg font-medium flex justify-center text-center items-center"
            onClick={() => onClick(index)}
          >
            + {showMoreOverlay}
          </div>
        ) : (
          <div className="absolute cursor-pointer top-2 right-2" onClick={() => removeMedia(index)}>
            <RemoveIcon />
          </div>
        )}
      </div>
    );
  }
};
