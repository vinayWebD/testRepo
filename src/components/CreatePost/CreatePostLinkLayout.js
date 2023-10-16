import React from 'react';
import InputLinkImage from '../../assets/images/link-input.svg';
import { LANG } from '../../constants/lang';
import { REGEX } from '../../constants/constants';
import { ToastNotifyError } from '../Toast/ToastNotify';
import { TOASTMESSAGES } from '../../constants/messages';
import AddBlueBgIcon from '../Icons/AddBlueBgIcon';
import RemoveIcon from '../Icons/RemoveIcon';

const { LANG_HTTPS } = LANG.PAGES.CREATE_POST;
const { LINK_PATTERN } = REGEX;
const {
  errorToast: { TST_INVALID_LINKS = '' },
  toastid: { TST_LINK_VALIDATION_FAILED_ID },
} = TOASTMESSAGES;

const CreatePostLinkLayout = ({
  links = [],
  setLinks,
  linkInInput = '',
  setLinkInInput = () => {},
  isInputLinkOpen = false,
}) => {
  // Adding link, checking if the current link value is apt
  const addLink = () => {
    let link = linkInInput;

    if (!link.startsWith('https://')) {
      link = `https://${link}`;
    }

    if (!LINK_PATTERN.test(link)) {
      ToastNotifyError(TST_INVALID_LINKS, TST_LINK_VALIDATION_FAILED_ID);
      return;
    }

    let allLinks = [link, ...links];

    if (allLinks?.length === 5) {
      return;
    }

    setLinks(allLinks);
    setLinkInInput('');
  };

  /**
   * In the UI, we dont have to show https:// as it is in the UI of input box
   * @param {*} link
   * @returns
   */
  const linkValueViewFormat = (link) => {
    if (link?.startsWith('https://')) {
      // Remove "https://"
      link = link?.slice(8);
    }

    return link;
  };

  const handleRemoveLink = (currentIndex) => {
    const updatedLinks = links.filter((item, _i) => item && _i !== currentIndex);
    setLinks(updatedLinks);
  };

  return (
    <>
      <div className="flex flex-col mb-3">
        {isInputLinkOpen && (
          <div className="flex gap-2 items-center">
            <div className="flex rounded-md border border-greymedium w-[94%]">
              <span className="px-4 inline-flex items-center min-w-fit rounded-l-[7px] border-r-0 text-sm bg-whitelight">
                <img src={InputLinkImage} />
              </span>
              <div className="relative w-full">
                <input
                  type="text"
                  id="hs-inline-add-on"
                  name="hs-inline-add-on"
                  className="py-3 px-4 pl-[68px] block w-full border-gray-200 rounded-md text-sm"
                  value={linkValueViewFormat(linkInInput)}
                  onChange={(e) => setLinkInInput(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4 text-greylight">
                  <span className="text-sm text-gray-500">{LANG_HTTPS}</span>
                </div>
              </div>
            </div>

            <div
              onClick={addLink}
              className={`w-[6%] flex justify-end ${
                links.length === 5 || (isInputLinkOpen && links.length === 4)
                  ? 'opacity-50 cursor-not-allowed'
                  : 'text-blueprimary cursor-pointer'
              }`}
            >
              <AddBlueBgIcon />
            </div>
          </div>
        )}
        <p className="text-xs text-greylight mt-1">Click in the field to add link (Max 5)</p>

        {links?.map((link, _i) => {
          return (
            <div
              className="flex items-center w-full justify-between hover:bg-whitelighter"
              key={_i}
            >
              <div className="flex gap-1 text-blueprimary text-sm mt-4">
                <img src={InputLinkImage} />
                <a href={link}>{link}</a>
              </div>

              <div onClick={() => handleRemoveLink(_i)} className="cursor-pointer">
                <RemoveIcon />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CreatePostLinkLayout;
