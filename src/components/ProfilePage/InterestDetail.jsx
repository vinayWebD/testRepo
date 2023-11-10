/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Card from '../common/Card';
import OutlinedButton from '../common/OutlinedButton';
import edit from '../../assets/images/editIcon.svg';
import dummy from '../../assets/images/dummy.svg';

function InterestDetail() {
  return (
    <Card classNames="mt-4">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div
            className="text-blueprimary text-[15px] md:text-[20px]"
            style={{ fontWeight: '500' }}
          >
            About Interest
          </div>
          <div className="bg-iconBackground p-1 rounded w-fit">
            <img src={edit} alt="edit" />
          </div>
        </div>
        <div className="font-normal text-greydark text-[10px] md:text-[14px] my-2">
          I contributed to diverse projects by crafting compelling visual assets in alignment with
          the brand's identity. I collaborated closely with cross-functional teams to conceptualize
          and refine user interfaces, enhancing overall user experience. I played a key role in
          producing impactful marketing materials, including social media graphics and promotional
          visuals. Through mentorship, I refined my proficiency in design tools and gained practical
          insights into design best practices. Active engagement in brainstorming sessions allowed
          me to offer innovative ideas and incorporate feedback iteratively. This experience
          deepened my understanding of the end-to-end design process, allowing me to effectively
          balance creativity with strategic goals.
        </div>
      </div>
      <div className="text-center mx-auto flex mb-3 p-4 justify-end">
        <OutlinedButton label={'Add Interests'} showArrowIcon={false} add />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div
            className="text-white p-2 px-6 pl-4 rounded-r-lg text-[12px] md:text-[18px] bg-gradient-button-button"
            style={{ fontWeight: '500' }}
          >
            Bowling
          </div>
          <div className="bg-iconBackground p-1 rounded w-fit mx-4">
            <img src={edit} alt="edit" />
          </div>
        </div>
        <div className="p-4">
          <div className="font-normal text-greydark text-[10px] md:text-[14px] ">
            Photos (10/15)
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-11 2xl:grid-cols-12 gap-0 pt-2">
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
          </div>
        </div>
        <div className="p-4 pt-0">
          <div className="font-normal text-greydark text-[10px] md:text-[14px] ">
            Videos (10/15)
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-11 2xl:grid-cols-12 gap-0 pt-2">
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div
            className="text-white p-2 px-6 pl-4 rounded-r-lg text-[12px] md:text-[18px] bg-gradient-button-button"
            style={{ fontWeight: '500' }}
          >
            Ice Hockey
          </div>
          <div className="bg-iconBackground p-1 rounded w-fit mx-4">
            <img src={edit} alt="edit" />
          </div>
        </div>
        <div className="p-4">
          <div className="font-normal text-greydark text-[10px] md:text-[14px] ">
            Photos (10/15)
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-11 2xl:grid-cols-12 gap-0 pt-2">
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
          </div>
        </div>
        <div className="p-4 pt-0">
          <div className="font-normal text-greydark text-[10px] md:text-[14px] ">
            Videos (10/15)
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-11 2xl:grid-cols-12 gap-0 pt-2">
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div
            className="text-white p-2 px-6 pl-4 rounded-r-lg text-[12px] md:text-[18px] bg-gradient-button-button"
            style={{ fontWeight: '500' }}
          >
            Dancing
          </div>
          <div className="bg-iconBackground p-1 rounded w-fit mx-4">
            <img src={edit} alt="edit" />
          </div>
        </div>
        <div className="p-4">
          <div className="font-normal text-greydark text-[10px] md:text-[14px] ">
            Photos (10/15)
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-11 2xl:grid-cols-12 gap-0 pt-2">
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
          </div>
        </div>
        <div className="p-4 pt-0">
          <div className="font-normal text-greydark text-[10px] md:text-[14px] ">
            Videos (10/15)
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-11 2xl:grid-cols-12 gap-0 pt-2">
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
            <img src={dummy} alt="photo" className="mb-3 w-[70%]" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default InterestDetail;
