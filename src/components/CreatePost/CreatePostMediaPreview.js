import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LeftChevron from '../Icons/LeftChevron';
import RightChevron from '../Icons/RightChevron';
import { POST_IMAGE_EXTENSIONS } from '../../constants/constants';
import { getFileExtension } from '../../utils/helper';
import RemoveIcon from '../Icons/RemoveIcon';
import { Button } from '../common/Button';

const CreatePostMediaPreview = ({
  media = [],
  customActiveIndex = 0,
  removeMedia = () => {},
  closeModal = () => {},
}) => {
  const [sliderRef, setSliderRef] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(customActiveIndex || 0);

  const handleRemoveMedia = (index) => {
    if (activeSlideIndex + 1 === media.length) {
      setActiveSlideIndex((prev) => prev - 1);
    }
    removeMedia(index);
  };

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
      <div className="overflow-hidden media-preview">
        <Slider {...settings} ref={setSliderRef} customPaging={activeSlideIndex}>
          {media.map(({ url, path }, _i) => {
            return (
              <div className="h-auto relative" key={_i}>
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
                <div
                  className="absolute right-2 top-2"
                  onClick={() => handleRemoveMedia(activeSlideIndex)}
                >
                  <RemoveIcon />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      <div className="flex gap-2 w-full justify-center mt-2 relative h-[50px] items-center">
        <div className="flex justify-center gap-3 items-center">
          <button onClick={sliderRef?.slickPrev}>
            <LeftChevron />
          </button>
          {activeSlideIndex + 1} of {media.length}
          <button onClick={sliderRef?.slickNext}>
            <RightChevron />
          </button>
        </div>
        <div className="absolute right-0">
          <Button label={'Next'} onClick={closeModal} showArrowIcon={false} />
        </div>
      </div>
    </>
  );
};

export default CreatePostMediaPreview;
