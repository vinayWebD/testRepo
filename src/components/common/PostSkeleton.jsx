import React from 'react';

const PostSkeleton = ({ showHeader = true, showCaption = true, showMedia = true }) => {
  return (
    <div role="status" className="w-full animate-pulse">
      {showHeader && (
        <div className="flex items-center space-x-3">
          <svg
            className="w-10 h-10 text-greymedium"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div>
            <div className="h-2.5 bg-greymedium rounded-full w-32 mb-2"></div>
            <div className="w-48 h-2 bg-greymedium rounded-full"></div>
          </div>
        </div>
      )}

      {showCaption && (
        <>
          <div className="h-2.5 bg-greymedium rounded-full w-48 my-4"></div>
          <div className="h-2 bg-greymedium rounded-full mb-2.5"></div>
          <div className="h-2 bg-greymedium rounded-full mb-4"></div>
        </>
      )}

      {showMedia && (
        <div className="flex items-center gap-2 justify-between mb-4 rounded">
          <div className="bg-greymedium w-[50%] h-48 flex items-center justify-center rounded-lg">
            <svg
              className=" text-white w-12"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="bg-greymedium w-[50%] h-48 flex items-center justify-center rounded-lg">
            <svg
              className=" text-white w-12"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
        </div>
      )}

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default PostSkeleton;
