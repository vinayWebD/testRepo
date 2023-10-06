import React, { useState } from 'react';
import RemoveIcon from './Icons/RemoveIcon';
import Modal from './Modal';
import CreatePostMediaPreview from './CreatePost/CreatePostMediaPreview';
import { getFileExtension } from '../utils/helper';
import { POST_IMAGE_EXTENSIONS } from '../constants/constants';

const MediaLayout = ({
  media = [],
  forcedPreview = false,
  updateMedia = () => {},
  allowOnlyView = true,
}) => {
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

  if (isPreviewOpen && !allowOnlyView) {
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
          path={media[0].path}
          index={0}
          onClick={handleClick}
          removeMedia={handleRemoveMedia}
          allowOnlyView={allowOnlyView}
        />
      );
    } else if (media.length === 2 || media.length === 4) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-w-screen-lg mx-auto ">
          {media.map(({ url, path }, index) => (
            <MediaItem
              url={url}
              key={index}
              path={path}
              index={index}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
              allowOnlyView={allowOnlyView}
            />
          ))}
        </div>
      );
    } else if (media.length === 3) {
      return (
        <div className="flex gap-1 w-full">
          <div className="w-[60%]">
            <MediaItem
              url={media[0].url}
              index={0}
              path={media[0].path}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
              allowOnlyView={allowOnlyView}
              className="max-h-none min-h-[-webkit-fill-available]"
            />
          </div>
          <div className="flex gap-1 w-[40%] flex-col">
            <MediaItem
              url={media[1].url}
              path={media[1].path}
              index={1}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
              allowOnlyView={allowOnlyView}
            />
            <MediaItem
              url={media[2].url}
              path={media[2].path}
              index={2}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
              allowOnlyView={allowOnlyView}
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
              path={media[0].path}
              index={0}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
              allowOnlyView={allowOnlyView}
            />
            <MediaItem
              url={media[1].url}
              path={media[1].path}
              index={1}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
              allowOnlyView={allowOnlyView}
            />
          </div>
          <div className="w-full flex gap-1">
            <MediaItem
              url={media[2].url}
              path={media[2].path}
              index={2}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
              allowOnlyView={allowOnlyView}
            />
            <MediaItem
              url={media[3].url}
              path={media[3].path}
              index={3}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
              allowOnlyView={allowOnlyView}
            />
            <MediaItem
              url={media[4].url}
              path={media[4].path}
              showMoreOverlay={media.length - 5}
              index={4}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
              allowOnlyView={allowOnlyView}
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
  url = '',
  path = '',
  showMoreOverlay = 0,
  index = 0,
  onClick = () => {},
  removeMedia = () => {},
  allowOnlyView = true,
  className = '',
}) => {
  let mediaType = POST_IMAGE_EXTENSIONS.includes(getFileExtension(path)?.toLowerCase())
    ? 'photo'
    : 'video';

  const removeIconContainer = () => {
    if (!allowOnlyView) {
      return (
        <div className="absolute top-2 right-2 cursor-pointer" onClick={() => removeMedia(index)}>
          <span>
            <RemoveIcon />
          </span>
        </div>
      );
    } else null;
  };

  if (mediaType === 'video') {
    return (
      <div className="h-auto relative w-full media-item">
        <video
          src={url}
          className={`w-full min-h-full min-w-full rounded-lg ${className}`}
          controls={true}
          height={'100%'}
          onClick={() => onClick(index)}
        />
        {showMoreOverlay ? (
          <div className="absolute cursor-pointer" onClick={() => onClick(index)}>
            + {showMoreOverlay}
          </div>
        ) : (
          removeIconContainer()
        )}
      </div>
    );
  } else {
    return (
      <div className="relative w-full overflow-hidden media-item ">
        <img
          src={url}
          alt="media"
          className={`w-full ${className}`}
          onClick={() => onClick(index)}
        />
        {showMoreOverlay ? (
          <div
            className="cursor-pointer absolute top-0 left-0 text-white text-lg w-full h-full bg-[#0000008a] rounded-lg font-medium flex justify-center text-center items-center"
            onClick={() => onClick(index)}
          >
            + {showMoreOverlay}
          </div>
        ) : (
          removeIconContainer()
        )}
      </div>
    );
  }
};
