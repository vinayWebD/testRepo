import React from 'react';
import RemoveIcon from './Icons/RemoveIcon';

const MediaItem = ({ type, src = '', showMoreOverlay = 0 }) => {
  if (type === 'video') {
    return (
      <div className="h-auto relative">
        <video src={src} className="w-full min-h-full min-w-full" controls={true} height={'100%'} />
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
        <img src={src} alt="media" className="w-full" />
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

const MediaLayout = ({ media = [] }) => {
  if (!media.length) return null;

  const getMedia = () => {
    if (media.length === 1) {
      return <MediaItem src={media[0].src} type={media[0].type} />;
    } else if ([2, 4].includes(media.length)) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-w-screen-lg mx-auto ">
          {media.map(({ src, type }, index) => (
            <MediaItem src={src} type={type} key={index} />
          ))}
        </div>
      );
    } else if (media.length === 3) {
      return (
        <div className="flex gap-1 w-full">
          <div className="w-[50%]">
            <MediaItem src={media[0].src} type={media[0].type} />
          </div>
          <div className="flex gap-1 w-[50%] flex-col">
            <MediaItem src={media[1].src} type={media[1].type} />
            <MediaItem src={media[2].src} type={media[2].type} />
          </div>
        </div>
      );
    } else if (media.length > 5) {
      return (
        <div className="flex-col flex gap-1 ">
          <div className="w-full flex gap-1 ">
            <MediaItem src={media[0].src} type={media[0].type} />
            <MediaItem src={media[1].src} type={media[1].type} />
          </div>
          <div className="w-full flex gap-1">
            <MediaItem src={media[2].src} type={media[2].type} />
            <MediaItem src={media[3].src} type={media[3].type} />
            <MediaItem src={media[4].src} type={media[4].type} showMoreOverlay={media.length - 5} />
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
