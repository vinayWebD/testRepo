import React from 'react';
import EmojiTextarea from '../common/EmojieTextarea';
import { LANG } from '../../constants/lang';
import { LIMITS } from '../../constants/constants';

const { LANG_TEXT_AREA_PLACEHOLDER } = LANG.PAGES.CREATE_POST;
const { POST_CAPTION_MAX_LIMIT } = LIMITS;

const CreatePostTextInput = ({ updateTextValue = () => {} }) => {
  return (
    <EmojiTextarea
      placeholder={LANG_TEXT_AREA_PLACEHOLDER}
      maxLength={POST_CAPTION_MAX_LIMIT}
      updateTextValue={updateTextValue}
    />
  );
};

export default CreatePostTextInput;
