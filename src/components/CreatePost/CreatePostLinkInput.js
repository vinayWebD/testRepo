import React from 'react';
import InputLinkImage from '../../assets/images/link-input.svg';
import { LANG } from '../../constants/lang';

const { LANG_URL, LANG_HTTPS } = LANG.PAGES.CREATE_POST;

const CreatePostLinkInput = () => {
  return (
    <div>
      <label>{LANG_URL}</label>
      <div className="flex rounded-md border border-greymedium">
        <span className="px-4 inline-flex items-center min-w-fit rounded-l-[7px] border-r-0 text-sm bg-whitelight">
          <img src={InputLinkImage} />
        </span>
        <div className="relative w-full">
          <input
            type="text"
            id="hs-inline-add-on"
            name="hs-inline-add-on"
            className="py-3 px-4 pl-[68px] block w-full border-gray-200 rounded-md text-sm"
            placeholder="www.example.com"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4 text-greylight">
            <span className="text-sm text-gray-500">{LANG_HTTPS}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostLinkInput;
