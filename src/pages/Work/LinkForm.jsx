import React, { useState } from 'react';
import InputLinkImage from '../../assets/images/link-input.svg';
import { LANG } from '../../constants/lang';
import { REGEX } from '../../constants/constants';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import { TOASTMESSAGES } from '../../constants/messages';
import InputBox from '../../components/InputBox';
import RemoveIcon from '../../components/Icons/RemoveIcon';

const { LANG_HTTPS } = LANG.PAGES.CREATE_POST;
const { LINK_PATTERN } = REGEX;
const {
  toastid: { TST_LINK_VALIDATION_FAILED_ID },
} = TOASTMESSAGES;

const LinkForm = ({
  links = [],
  setLinks,
  linkInInput: newLink = {},
  setLinkInInput: setNewLink = () => {},
}) => {
  const [showNewLink, setShowNewLink] = useState(false);

  const addLink = () => {
    document.getElementsByClassName('modal-children')?.[0]?.scroll(0, 0);
    let allLinks = [...links];

    // If the add new links fields class is there, means the add new link is already open
    // then only we need to check the below
    if (document?.getElementsByClassName('add-new-link-fields')?.[0]) {
      let link = newLink?.url?.trim();
      const domain = newLink?.domain?.trim();

      if (!link.startsWith('https://')) {
        link = `https://${link}`;
      }

      if (!LINK_PATTERN.test(link)) {
        ToastNotifyError('Invalid URL', TST_LINK_VALIDATION_FAILED_ID);
        return;
      }

      if (!domain) {
        ToastNotifyError('Domain is required', TST_LINK_VALIDATION_FAILED_ID);
        return;
      }

      allLinks = [{ url: link, domain }, ...allLinks];
    }

    if (allLinks.length >= 5) {
      ToastNotifyError('You can only add up to 5 links.', TST_LINK_VALIDATION_FAILED_ID);
      return;
    }

    setLinks(allLinks);
    setNewLink({ url: '', domain: '' });
    setShowNewLink(true);
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
    const updatedLinks = links.filter((item, i) => i !== currentIndex);
    setLinks(updatedLinks);
  };

  // Disable the "Add New" button when there are already 5 links (including the new link)
  const isAddNewDisabled = links.length + (newLink.url.trim() ? 1 : 0) >= 5;

  return (
    <div className="flex flex-col mb-3">
      {links?.length === 0 || showNewLink ? (
        <>
          <div className="flex flex-col gap-2 w-full add-new-link-fields">
            <InputBox
              name="domain"
              label="Domain"
              placeholder="Enter Domain"
              value={newLink.domain}
              initialValue={newLink.domain}
              parentClassName="w-full"
              className="h-[50px]"
              onChange={(e) => setNewLink({ ...newLink, domain: e.target.value })}
            />

            <div className="mt-[-13px]">
              <label>URL</label>
              <div className="flex rounded-md border border-greymedium w-full h-[50px]">
                <span className="px-4 inline-flex items-center min-w-fit rounded-l-[7px] border-r-0 text-sm bg-whitelight">
                  <img src={InputLinkImage} alt="Input Link" />
                </span>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="hs-inline-add-on"
                    name="hs-inline-add-on"
                    className="py-3 px-4 pl-[68px] h-[48px] block w-full border-gray-200 rounded-md text-sm"
                    value={linkValueViewFormat(newLink.url)}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4 text-greylight">
                    <span className="text-sm text-gray-500">{LANG_HTTPS}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {links?.length > 0 ? (
            <div className="py-[18px]">
              <div className="bg-greymedium h-[1px] w-full" />
            </div>
          ) : (
            ''
          )}
        </>
      ) : (
        ''
      )}

      {links?.map((link, index) => (
        <div key={index}>
          <div className="flex items-center w-full justify-between hover:bg-whitelighter">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex gap-2 items-center">
                <InputBox
                  name="domain"
                  label="Domain"
                  placeholder="Enter Domain"
                  value={link.domain}
                  initialValue={link?.domain}
                  parentClassName="w-full"
                  className="h-[50px]"
                  onChange={(e) => {
                    const updatedLinks = [...links];
                    updatedLinks[index].domain = e.target.value;
                    setLinks(updatedLinks);
                  }}
                />
                <div onClick={() => handleRemoveLink(index)} className="cursor-pointer">
                  <RemoveIcon />
                </div>
              </div>

              <div className="mt-[-13px]">
                <label>URL</label>
                <div className="flex rounded-md border border-greymedium w-full h-[50px]">
                  <span className="px-4 inline-flex items-center min-w-fit rounded-l-[7px] border-r-0 text-sm bg-whitelight">
                    <img src={InputLinkImage} alt="Input Link" />
                  </span>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="hs-inline-add-on"
                      name="hs-inline-add-on"
                      className="py-3 px-4 pl-[68px] h-[48px] block w-full border-gray-200 rounded-md text-sm"
                      value={linkValueViewFormat(link.url)}
                      onChange={(e) => {
                        const updatedLinks = [...links];
                        updatedLinks[index].url = e.target.value;
                        setLinks(updatedLinks);
                      }}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4 text-greylight">
                      <span className="text-sm text-gray-500">{LANG_HTTPS}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {index !== links?.length - 1 ? (
            <div className="py-[18px]">
              <div className="bg-greymedium h-[1px] w-full" />
            </div>
          ) : (
            ''
          )}
        </div>
      ))}
      <div className="py-[18px]">
        <div
          onClick={addLink}
          className={`w-full flex justify-end text-[14px] font-semibold ${
            isAddNewDisabled ? 'opacity-50 cursor-not-allowed' : 'text-blueprimary cursor-pointer'
          }`}
        >
          Add New
        </div>
        <div className="bg-greymedium h-[1px] w-full mt-5" />
      </div>
    </div>
  );
};

export default LinkForm;
