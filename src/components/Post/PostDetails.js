import React, { useEffect, useMemo, useState } from 'react';
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
import { useSelector } from 'react-redux';

const PostDetails = ({
  post = {},
  reloadPostDetails = () => {},
  customActiveIndex = 0,
  onCloseHandler = () => {},
}) => {
  const [sliderRef, setSliderRef] = useState(null);
  const userData = useSelector((state) => state?.auth?.user) || {};

  // Pause video when moving to another slide
  const handleBeforeChange = (currentSlide) => {
    if (post?.postMedia?.length > 1) {
      // If the media length > 1, then only we have to pause the video of the current slide when moving to next or previous slide
      const currentVideo = document.querySelector(
        `.slick-slide[data-index="${currentSlide}"] .video-react-controls-enabled.video-react video`,
      );

      currentVideo?.pause();
    }
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: customActiveIndex,
    beforeChange: (currentSlide) => handleBeforeChange(currentSlide),
  };

  useEffect(() => {
    if (post?.id) {
      reloadPostDetails({ postId: post?.id });
    }
  }, [post?.id]);

  // The slider should work when the post details component is loaded
  useEffect(() => {
    const handleKeyDown = async (e) => {
      if (e?.target?.tagName?.toLowerCase() !== 'textarea') {
        if (e.key === 'ArrowLeft') {
          // Left arrow should take us to the prev slide
          sliderRef?.slickPrev();
        } else if (e.key === 'ArrowRight') {
          // Right arrow should take us to the next slide
          sliderRef?.slickNext();
        } else if (e.key === 'Space' || e.key === ' ') {
          // If the current slide consists of video, then we shall play or pause it on the basis of Space key
          const currentVideo = document.querySelector(
            '.slick-slide.slick-active.slick-current .video-react-controls-enabled.video-react video',
          );

          if (currentVideo) {
            // If the current is a video, then we shall check if the video is paused based on the class name
            e.preventDefault();
            if (
              document.querySelector(
                '.slick-slide.slick-active.slick-current .video-react-play-control.video-react-paused',
              )
            ) {
              await currentVideo?.play();
            } else {
              await currentVideo?.pause();
            }
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [sliderRef]);

  const postHeader = useMemo(() => {
    return (
      <Header
        createdAt={post?.createdAt}
        creatorName={`${post?.User?.firstName} ${post?.User?.lastName}`}
        creatorProfilePicUrl={post?.User?.profilePictureUrl}
        showThreeDots={false}
        isCreatedByMe={post?.UserId === userData?.id}
      />
    );
  }, []);

  return (
    <div className="post-details flex flex-col md:flex-row h-[100dvh] max-h-[100dvh]  md:min-h-[50vh] md:max-h-[70vh] lg:min-h-[65vh] lg:max-h-[75vh] relative">
      <div
        className="flex md:hidden bg-[#fefefe1a] rounded-full justify-end p-3 absolute right-[10px] top-1 z-10"
        onClick={onCloseHandler}
      >
        <CloseIcon fill={'#ffffff'} />
      </div>
      <div className="w-full md:w-[53%] lg:w-[65%] relative bg-greydark min-h-[50dvh] max-h-[65dvh] md:max-h-none md:min-h-full">
        <Slider {...settings} arrows={false} ref={setSliderRef}>
          {post?.postMedia?.map(({ key, path }, _i) => {
            return (
              <div
                className={`w-full !flex justify-center items-center outline-0 ${
                  !POST_IMAGE_EXTENSIONS?.includes(getFileExtension(path)?.toLowerCase()) &&
                  'video-preview'
                }`}
                key={_i}
              >
                {POST_IMAGE_EXTENSIONS?.includes(getFileExtension(path)?.toLowerCase()) ? (
                  <img src={key} />
                ) : (
                  <Player className="w-full h-full !p-0">
                    <source src={key} className="w-full h-full video-preview" />
                    <BigPlayButton
                      position="center"
                      className="!border-none !text-[#000000b8] !bg-[#fffaf7bd] !text-[3.4em] !rounded-full !w-[50px] !h-[50px] !left-[45%] !ml-0"
                    />
                  </Player>
                )}
              </div>
            );
          })}
        </Slider>

        {post?.postMedia.length > 1 ? (
          <>
            <div className="absolute top-1 left-1 flex justify-center items-center h-[90%] mt-[5%]">
              <div
                className="w-14 h-14 rounded-full flex justify-center items-center bg-[#0000003d] hover:bg-[#1715153d] cursor-pointer"
                onClick={sliderRef?.slickPrev}
              >
                <span className="ml-1">
                  <LeftChevron fill="#ffffff" width={30} height={30} />
                </span>
              </div>
            </div>

            <div className="absolute top-1 right-1 flex justify-center items-center h-[90%] mt-[5%]">
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

      <div className="w-full md:w-[47%] lg:w-[35%] flex flex-col py-5 px-[15px] overflow-y-auto">
        <div className="w-full flex justify-between">
          {postHeader}
          <div className="cursor-pointer hidden md:block" onClick={onCloseHandler}>
            <CloseIcon />
          </div>
        </div>
        <CaptionLinkContainer caption={post?.caption} links={post?.links} />

        <div className="!text-sm">
          <ActionButtons
            commentCount={post?.commentCount}
            likeCount={post?.likeCount}
            shareCount={post?.shareCount}
            isLikedByMe={post?.isLikedByMe}
            className="justify-between"
            isCommentSectionOpenDefault={true}
            postId={post?.id}
            reloadPostDetails={reloadPostDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
