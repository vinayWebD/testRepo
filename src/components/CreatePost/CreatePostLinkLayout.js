import React, { useEffect, useState } from 'react';
import CreatePostLinkInput from './CreatePostLinkInput';
import { BUTTON_LABELS, LANG } from '../../constants/lang';
import { REGEX } from '../../constants/constants';
import { ToastNotifyError } from '../Toast/ToastNotify';
import { TOASTMESSAGES } from '../../constants/messages';
import OutlinedButton from '../common/OutlinedButton';

const { BTNLBL_SAVE } = BUTTON_LABELS;
const { LANG_ADD_NEW } = LANG.PAGES.CREATE_POST;
const { LINK_PATTERN } = REGEX;
const {
  errorToast: { TST_INVALID_LINKS = '' },
  toastid: { TST_LINK_VALIDATION_FAILED_ID },
} = TOASTMESSAGES;

const CreatePostLinkLayout = ({ links = [], setLinks, closePopupHandler = () => {} }) => {
  const [_links, _setLinks] = useState(!links?.length ? [''] : [...links]);

  useEffect(() => {
    _setLinks(!links?.length ? [''] : [...links]);
  }, [links]);

  const addLink = () => {
    if (_links.length === 5) return;
    _setLinks([..._links, '']);
  };

  const isLinkButtonDisabled = () => {
    return !_links.length;
  };

  const handleSave = () => {
    let hasError = false;
    const modifiedLinks = [..._links]; // Create a copy to hold modified links

    for (let i = 0; i < _links.length; i++) {
      let link = _links[i];

      if (!link.startsWith('https://')) {
        link = `https://${link}`;
        modifiedLinks[i] = link; // Update the modified link
      }

      if (!LINK_PATTERN.test(link)) {
        hasError = true;
        ToastNotifyError(TST_INVALID_LINKS, TST_LINK_VALIDATION_FAILED_ID);
        break;
      }
    }

    if (!hasError) {
      setLinks(modifiedLinks); // Set modified links with "https://" prefixed
      closePopupHandler();
    }
  };

  return (
    <>
      <div className="overflow-auto mb-3 px-6 flex flex-col gap-2">
        <CreatePostLinkInput links={_links} setLinks={_setLinks} />
        <div className="mt-6 mb-2">
          <p
            className={`${
              _links.length === 5
                ? 'text-greylight cursor-not-allowed'
                : 'text-blueprimary cursor-pointer'
            }  font-semibold text-sm text-right `}
            onClick={addLink}
          >
            {LANG_ADD_NEW}
          </p>
        </div>
      </div>
      <div className="flex justify-end px-6 border-greymedium border-t pt-5">
        <OutlinedButton
          label={BTNLBL_SAVE}
          disabled={isLinkButtonDisabled()}
          onClick={handleSave}
        />
      </div>
    </>
  );
};

export default CreatePostLinkLayout;
