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
  origin = 'create-edit-post',
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

  if (isPreviewOpen && origin === 'create-edit-post') {
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
      let mediaType = POST_IMAGE_EXTENSIONS.includes(getFileExtension(media[0].path)?.toLowerCase())
        ? 'photo'
        : 'video';

      if (mediaType === 'photo') {
        return (
          <div
            key={media.path}
            className="w-full max-h-[400px] overflow-hidden rounded-lg relative"
          >
            <img src={media[0].url} className="object-cover w-full rounded-lg" />
            {origin === 'create-edit-post' ? (
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => handleRemoveMedia(customActiveIndex)}
              >
                <span>
                  <RemoveIcon />
                </span>
              </div>
            ) : (
              ''
            )}
          </div>
        );
      } else {
        return (
          <div
            key={media.path}
            className="w-full max-h-[400px] overflow-hidden rounded-lg relative"
          >
            <video src={media[0].url} className="w-full rounded-lg" />
            {origin === 'create-edit-post' ? (
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => handleRemoveMedia(customActiveIndex)}
              >
                <span>
                  <RemoveIcon />
                </span>
              </div>
            ) : (
              ''
            )}
          </div>
        );
      }
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
              allowOnlyView={origin !== 'create-edit-post'}
              isParentHalf={media.length === 4}
            />
          ))}
        </div>
      );
    } else if (media.length === 3) {
      return (
        <div className="flex gap-1 w-full">
          <div className="w-[60%] max-h-[400px]">
            <MediaItem
              url={media[0].url}
              index={0}
              path={media[0].path}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
              allowOnlyView={origin !== 'create-edit-post'}
              className="max-h-none min-h-[-webkit-fill-available]"
            />
          </div>
          <div className="flex gap-1 w-[40%] flex-col max-h-[400px]">
            <MediaItem
              url={media[1].url}
              path={media[1].path}
              index={1}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
              allowOnlyView={origin !== 'create-edit-post'}
            />
            <MediaItem
              url={media[2].url}
              path={media[2].path}
              index={2}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
              allowOnlyView={origin !== 'create-edit-post'}
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
              allowOnlyView={origin !== 'create-edit-post'}
              isParentHalf={true}
            />
            <MediaItem
              url={media[1].url}
              path={media[1].path}
              index={1}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
              allowOnlyView={origin !== 'create-edit-post'}
              isParentHalf={true}
            />
          </div>
          <div className="w-full flex gap-1">
            <MediaItem
              url={media[2].url}
              path={media[2].path}
              index={2}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
              allowOnlyView={origin !== 'create-edit-post'}
              isParentHalf={true}
            />
            <MediaItem
              url={media[3].url}
              path={media[3].path}
              index={3}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
              allowOnlyView={origin !== 'create-edit-post'}
              isParentHalf={true}
            />
            <MediaItem
              url={media[4].url}
              path={media[4].path}
              showMoreOverlay={media.length - 5}
              index={4}
              onClick={handleClick}
              removeMedia={handleRemoveMedia}
              allowOnlyView={origin !== 'create-edit-post'}
              isParentHalf={true}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`media-layout ${media.length !== 1 ? '' : ''} rounded-lg max-h-[400px]`}>
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
  isParentHalf = false,
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
      <div
        className={`h-auto relative w-full media-item ${
          isParentHalf ? 'max-h-[200px]' : 'h-[100%]'
        }`}
      >
        <video
          src={url}
          className={`w-full min-h-full min-w-full rounded-lg ${className}`}
          controls={true}
          height={'100%'}
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
  } else {
    return (
      <div
        className={`relative w-full overflow-hidden media-item ${
          isParentHalf ? 'max-h-[200px]' : 'h-[100%]'
        }`}
      >
        <img
          src={url}
          alt="media"
          className={`w-full ${className} rounded-lg h-[100%]`}
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
