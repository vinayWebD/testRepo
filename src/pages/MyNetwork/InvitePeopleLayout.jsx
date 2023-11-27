import React, { useState } from 'react';
import TextArea from '../../components/TextArea';
import { Button } from '../../components/common/Button';
import EmailInputWithIcon from '../../components/common/EmailInputWithIcon';
import Divider from '../../components/common/Divider';

import { BUTTON_LABELS } from '../../constants/lang';
import { useDispatch } from 'react-redux';
import { invitePeopleDispatcher } from '../../redux/dispatchers/myNetworkDispatcher';
import { REGEX } from '../../constants/constants';
import { ToastNotifyError, ToastNotifySuccess } from '../../components/Toast/ToastNotify';
import { getErrorMessage, successStatus } from '../../common';
const { BTNLBL_SEND_INVITE } = BUTTON_LABELS;

const { EMAIL_PATTERN } = REGEX;

const InvitePeopleLayout = ({ onCloseHandler = () => {} }) => {
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const onClickHandler = async () => {
    if (!EMAIL_PATTERN.test(email)) {
      setError('A valid email is required');
    } else {
      setError('');
      const { status, data } = await dispatch(invitePeopleDispatcher({ email, description }));
      if (!successStatus(status)) {
        const errormsg = getErrorMessage(data);
        if (errormsg) {
          ToastNotifyError(errormsg);
        }
      } else {
        ToastNotifySuccess('Invitation sent successfully!');
        onCloseHandler();
      }
    }
  };

  return (
    <div className="relative">
      <div className=" max-h-[83dvh] md:h-auto md:max-h-[70vh] overflow-y-auto">
        <div className="relative px-[18px] flex flex-col gap-2">
          <EmailInputWithIcon
            label="Email"
            placeholder="@gmail.com"
            value={email}
            handleInputChange={setEmail}
            isRequired={true}
            error={error}
          />
          <TextArea
            placeholder="Hello there! I'd love for you to join me on this fantastic platform."
            label="Description"
            height="h-[150px]"
            value={description}
            handleChange={(val) => setDescription(val)}
          />
        </div>
      </div>
      <Divider />
      <div className="text-end flex justify-end mr-4">
        <Button
          label={BTNLBL_SEND_INVITE}
          additionalClassNames=" sm:px-[24px] sm:py-[15px] mt-4  items-center text-xs min-[320px]:px-[30px] min-[320px]:py-[15px] "
          showArrowIcon={false}
          onClick={onClickHandler}
        />
      </div>
    </div>
  );
};

export default InvitePeopleLayout;
