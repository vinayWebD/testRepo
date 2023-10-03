import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LeftChevron from '../Icons/LeftChevron';
import RightChevron from '../Icons/RightChevron';

const CreatePostMediaPreview = ({ media = [], customActiveIndex = 0 }) => {
  const [sliderRef, setSliderRef] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(customActiveIndex || 0);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: activeSlideIndex,
    afterChange: (current) => setActiveSlideIndex(current),
  };

  return (
    <>
      <Slider {...settings} ref={setSliderRef}>
        {media.map(({ src, type }, _i) => {
          return (
            <div className="h-auto relative" key={_i}>
              {type === 'video' ? (
                <video
                  src={src}
                  className="w-full min-h-full min-w-full"
                  controls={true}
                  height={'100%'}
                />
              ) : (
                <img src={src} />
              )}
            </div>
          );
        })}
      </Slider>

      <div className="flex gap-2 w-full justify-center mt-2">
        <button onClick={sliderRef?.slickPrev}>
          <LeftChevron />
        </button>
        {activeSlideIndex + 1} of {media.length}
        <button onClick={sliderRef?.slickNext}>
          <RightChevron />
        </button>
      </div>
    </>
  );
};

export default CreatePostMediaPreview;
