import React from 'react';
import InputLinkImage from '../../assets/images/link-input.svg';
import { LANG } from '../../constants/lang';
import { REGEX } from '../../constants/constants';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import { TOASTMESSAGES } from '../../constants/messages';
import InputBox from '../../components/InputBox';

const { LANG_HTTPS } = LANG.PAGES.CREATE_POST;
const { LINK_PATTERN } = REGEX;
const {
  errorToast: { TST_INVALID_LINKS = '' },
  toastid: { TST_LINK_VALIDATION_FAILED_ID },
} = TOASTMESSAGES;

const LinkForm = ({
  links = [],
  setLinks,
  linkInInput = '',
  setLinkInInput = () => {},
  isInputLinkOpen = false,
}) => {
  // Adding link, checking if the current link value is apt
  const addLink = () => {
    let link = linkInInput?.url;

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
    setLinkInInput({
      url: '',
      domain: '',
    });
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
        <div className="flex flex-col gap-2 w-full">
          <InputBox
            name="domain"
            label="Domain"
            placeholder="Enter Domain"
            value={''}
            parentClassName="w-full"
            className="h-[50px]"
            // onChange={(e) => formikLinks.setFieldValue('domain', e.target.value)}
            // error={tuc_domain && err_domain}
            // helperText={tuc_domain && err_domain}
          />

          <div>
            <label>URL</label>
            <div className="flex rounded-md border border-greymedium w-full h-[50px]">
              <span className="px-4 inline-flex items-center min-w-fit rounded-l-[7px] border-r-0 text-sm bg-whitelight">
                <img src={InputLinkImage} />
              </span>
              <div className="relative w-full">
                <input
                  type="text"
                  id="hs-inline-add-on"
                  name="hs-inline-add-on"
                  className="py-3 px-4 pl-[68px] h-[48px] block w-full border-gray-200 rounded-md text-sm"
                  value={linkValueViewFormat(linkInInput?.url)}
                  onChange={(e) => setLinkInInput({ ...linkInInput, url: e.target.value })}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4 text-greylight">
                  <span className="text-sm text-gray-500">{LANG_HTTPS}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-[24px]">
          <div className="bg-greymedium h-[1px] w-full" />
        </div>

        {links?.map((link, _i) => {
          return (
            <React.Fragment key={_i}>
              <div className="flex items-center w-full justify-between hover:bg-whitelighter">
                <div className="flex flex-col gap-2 w-full">
                  <InputBox
                    name="domain"
                    label="Domain"
                    placeholder="Enter Domain"
                    value={link?.domain}
                    parentClassName="w-full"
                    className="h-[50px]"
                    // onChange={(e) => formikLinks.setFieldValue('domain', e.target.value)}
                    // error={tuc_domain && err_domain}
                    // helperText={tuc_domain && err_domain}
                  />

                  <div>
                    <label>URL</label>
                    <div className="flex rounded-md border border-greymedium w-full h-[50px]">
                      <span className="px-4 inline-flex items-center min-w-fit rounded-l-[7px] border-r-0 text-sm bg-whitelight">
                        <img src={InputLinkImage} />
                      </span>
                      <div className="relative w-full">
                        <input
                          type="text"
                          id="hs-inline-add-on"
                          name="hs-inline-add-on"
                          className="py-3 px-4 pl-[68px] h-[48px] block w-full border-gray-200 rounded-md text-sm"
                          value={link?.url || linkValueViewFormat(linkInInput?.url)}
                          onChange={(e) => setLinkInInput({ ...linkInInput, url: e.target.value })}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4 text-greylight">
                          <span className="text-sm text-gray-500">{LANG_HTTPS}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {_i !== links?.length - 1 ? (
                  <div onClick={() => handleRemoveLink(_i)} className="cursor-pointer">
                    X
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="py-[24px]">
                <div className="bg-greymedium h-[1px] w-full" />
              </div>
            </React.Fragment>
          );
        })}

        <div
          onClick={addLink}
          className={`w-full flex justify-end text-[14px] font-semibold ${
            links.length === 5 || (isInputLinkOpen && links.length === 4)
              ? 'opacity-50 cursor-not-allowed'
              : 'text-blueprimary cursor-pointer'
          }`}
        >
          Add New
        </div>
      </div>
    </>
  );
};

export default LinkForm;
