import React, { useState } from 'react';
import TextArea from '../../components/TextArea';
import { Button } from '../../components/common/Button';
import EmailInput from '../../components/common/EmailInput';
import Divider from '../../components/common/Divider';

//get constant
import { BUTTON_LABELS, LANG } from '../../constants/lang';
const { LANG_TEXT_AREA_PLACEHOLDER } = LANG.PAGES.CREATE_POST;
const { BTNLBL_SEND_INVITE } = BUTTON_LABELS;

const InvitePeopleLayout = () => {
  const [text, setText] = useState('');
  return (
    <div className="relative">
      <div className=" max-h-[83dvh] md:h-auto md:max-h-[70vh] overflow-y-auto">
        <div className="relative px-[18px] flex flex-col gap-2">
          <EmailInput label="Email" placeholder="name@flowbite.com" />
          <TextArea
            placeholder={LANG_TEXT_AREA_PLACEHOLDER}
            label="Description"
            height="h-[150px]"
            value={text}
            handleChange={(val) => setText(val)}
          />
        </div>
      </div>
      <Divider />
      <div className="text-end flex justify-end mr-4">
        <Button
          label={BTNLBL_SEND_INVITE}
          additionalClassNames=" sm:px-[24px] sm:py-[15px] mt-4  items-center text-xs min-[320px]:px-[30px] min-[320px]:py-[15px] "
          showArrowIcon={false}
        />
      </div>
    </div>
  );
};

export default InvitePeopleLayout;
