import React, { useState } from 'react';
import Header from './Header';
import CaptionLinkContainer from './CaptionLinkContainer';
import ActionButtons from './ActionButtons';
import Slider from 'react-slick';
import { POST_IMAGE_EXTENSIONS } from '../../constants/constants';
import { getFileExtension } from '../../utils/helper';
import LeftChevron from '../Icons/LeftChevron';
import RightChevron from '../Icons/RightChevron';

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const PostDetailsPreview = ({ post = {} }) => {
  const [sliderRef, setSliderRef] = useState(null);

  return (
    <div className="post-details flex  min-h-[65vh] max-h-[75vh]">
      <div className="w-[65%] relative">
        <Slider {...settings} ref={setSliderRef}>
          {post?.media.map(({ url, path }, _i) => {
            return (
              <div className="w-full !flex justify-center items-center outline-0" key={_i}>
                {POST_IMAGE_EXTENSIONS.includes(getFileExtension(path)?.toLowerCase()) ? (
                  <img src={url} />
                ) : (
                  <video
                    src={url}
                    className="w-full min-h-full min-w-full"
                    controls={true}
                    height={'100%'}
                  />
                )}
              </div>
            );
          })}
        </Slider>

        {post?.media.length > 1 ? (
          <>
            <div className="absolute top-0 left-1 flex justify-center items-center h-full">
              <div
                className="w-14 h-14 rounded-full flex justify-center items-center bg-[#0000003d] hover:bg-[#1715153d] cursor-pointer"
                onClick={sliderRef?.slickPrev}
              >
                <span className="ml-1">
                  <LeftChevron fill="#ffffff" width={30} height={30} />
                </span>
              </div>
            </div>

            <div className="absolute top-0 right-1 flex justify-center items-center h-full">
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

      <div className="w-[35%] flex flex-col py-5 px-2 overflow-y-auto">
        <Header
          createdAt={post?.created_at}
          creatorName={post?.created_by}
          creatorProfilePicUrl={post?.profile_image_url}
        />
        <CaptionLinkContainer caption={post?.caption} links={post?.links} />

        <div className="!text-sm">
          <ActionButtons
            commentCount={post?.comment_count}
            likeCount={post?.like_count}
            shareCount={post?.share_count}
            isLikedByMe={post?.is_liked_by_me}
            className="gap-[7%]"
            isCommentSectionOpenDefault={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPreview;
