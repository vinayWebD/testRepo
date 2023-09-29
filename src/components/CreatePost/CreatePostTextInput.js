import React from 'react';
import EmojiTextarea from '../common/EmojieTextarea';
import { LANG } from '../../constants/lang';

const { LANG_TEXT_AREA_PLACEHOLDER } = LANG.PAGES.CREATE_POST;

const CreatePostTextInput = ({ updateTextValue = () => {} }) => {
  return (
    <EmojiTextarea
      placeholder={LANG_TEXT_AREA_PLACEHOLDER}
      maxLength={100}
      updateTextValue={updateTextValue}
    />
  );
};

export default CreatePostTextInput;
