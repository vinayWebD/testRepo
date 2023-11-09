import React from 'react';
import { getHTML } from '../../utils/helper';

const HtmlText = ({ text = '' }) => {
  return <span dangerouslySetInnerHTML={{ __html: getHTML(text) }} />;
};

export default HtmlText;
