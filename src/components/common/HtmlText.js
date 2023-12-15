import React from 'react';
import { getHTML } from '../../utils/helper';

const HtmlText = ({ text = '', className = '' }) => {
  return <span dangerouslySetInnerHTML={{ __html: getHTML(text) }} className={className} />;
};

export default HtmlText;
