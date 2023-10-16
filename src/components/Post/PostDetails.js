/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Header from './Header';
import CaptionLinkContainer from './CaptionLinkContainer';
import ActionButtons from './ActionButtons';
import Slider from 'react-slick';
import { POST_IMAGE_EXTENSIONS } from '../../constants/constants';
import { getFileExtension } from '../../utils/helper';
import LeftChevron from '../Icons/LeftChevron';
import RightChevron from '../Icons/RightChevron';
import { CloseIcon } from '../Icons/CloseIcon';
import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';

const PostDetails = ({
  post = {},
  reloadPostDetails = () => {},
  customActiveIndex = 0,
  onCloseHandler = () => {},
}) => {
  const [sliderRef, setSliderRef] = useState(null);
  const refPlayerWrap = useRef();
  const refPlayer = useRef();
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: customActiveIndex,
  };

  useEffect(() => {
    if (post?.post_id) {
      reloadPostDetails({ postId: post?.post_id });
    }
  }, [post?.post_id]);

  useEffect(() => {
    if (refPlayerWrap.current) {
      let options = {
        rootMargin: '-30% 0px -10% 0px',
        threshold: 1.0,
      };
      / eslint-disable no-unused-vars /;
      let handlePlay = (entries) => {
        entries.forEach((entry) => {
          // if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.5) {
            refPlayer?.current?.actions?.play();
            // }
          } else {
            refPlayer?.current?.actions?.pause();
          }
        });
      };

      let observer = new IntersectionObserver(handlePlay, options);

      observer.observe(refPlayerWrap?.current);
    }
  });

  const postHeader = useMemo(() => {
    return (
      <Header
        createdAt={post?.created_at}
        creatorName={post?.created_by}
        creatorProfilePicUrl={post?.profile_image_url}
        showThreeDots={false}
      />
    );
  }, []);

  return (
    <div className="post-details flex  min-h-[65vh] max-h-[75vh]">
      <div className="w-[65%] relative bg-greydark">
        <Slider {...settings} arrows={false} ref={setSliderRef}>
          {post?.media.map(({ url, path }, _i) => {
            return (
              <div
                className={`w-full !flex justify-center items-center outline-0 ${
                  !POST_IMAGE_EXTENSIONS.includes(getFileExtension(path)?.toLowerCase()) &&
                  'video-preview'
                }`}
                key={_i}
              >
                {POST_IMAGE_EXTENSIONS.includes(getFileExtension(path)?.toLowerCase()) ? (
                  <img src={url} />
                ) : (
                  // <div className='video-preview'>
                  <Player>
                    <source src={url} className="video-preview" />
                    <BigPlayButton
                      position="center"
                      className="!border-none !text-[#000000b8] !bg-[#fffaf7bd] !text-[3.4em] !rounded-full !w-[50px] !h-[50px] !top-[40%] !left-[45%] !mt-0 !ml-0"
                    />
                  </Player>

                  // </div>
                )}
              </div>
            );
          })}
        </Slider>

        {post?.media.length > 1 ? (
          <>
            <div
              className="absolute top-1 left-1 flex justify-center items-center h-full"
              style={{ height: '90%' }}
            >
              <div
                className="w-14 h-14 rounded-full flex justify-center items-center bg-[#0000003d] hover:bg-[#1715153d] cursor-pointer"
                onClick={sliderRef?.slickPrev}
              >
                <span className="ml-1">
                  <LeftChevron fill="#ffffff" width={30} height={30} />
                </span>
              </div>
            </div>

            <div
              className="absolute top-1 right-1 flex justify-center items-center h-full"
              style={{ height: '90%' }}
            >
              <div
                className="w-14 h-14 rounded-full flex justify-center items-center bg-[#0000003d] hover:bg-[#1715153d] cursor-pointer"
                onClick={sliderRef?.slickNext}
              >
                <span className="mr-1">
                  <RightChevron fill="#ffffff" width={30} height={30} />
                </span>
              </div>
            </div>
          </>
        ) : (
          ''
        )}
      </div>

      <div className="w-[35%] flex flex-col py-5 px-[10px] overflow-y-auto">
        <div className="w-full flex justify-between">
          {postHeader}
          <div className="cursor-pointer" onClick={onCloseHandler}>
            <CloseIcon />
          </div>
        </div>
        <CaptionLinkContainer caption={post?.caption} links={post?.links} />

        <div className="!text-sm">
          <ActionButtons
            commentCount={post?.comment_count}
            likeCount={post?.like_count}
            shareCount={post?.share_count}
            isLikedByMe={post?.is_liked_by_me}
            className="justify-between"
            isCommentSectionOpenDefault={true}
            postId={post?.post_id}
            reloadPostDetails={reloadPostDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
