import React, { useEffect, useState } from 'react';
import { useScreenWidth } from '../../hooks';
import { forgotPasswordOtpValidation, sendForgotPasswordOtp } from '../../services/auth';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError, ToastNotifySuccess } from '../Toast/ToastNotify';
import OTPInput from 'react-otp-input';
import { LANG } from '../../constants/lang';
import { Button } from '../common/Button';

const { LANG_RESEND } = LANG.PAGES.VERIFY_EMAIL;

const UpdateEmail = ({ email }) => {
  const width = useScreenWidth();
  const [otp, setOtp] = useState([]);
  const [counter, setCounter] = useState(59);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const otpInputStyle = {
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 400,
    width: width > 600 ? '80px' : '60px',
    height: '50px',
    outline: 'none',
    marginRight: '24px',
    appearnce: 'none',
    backgroundColor: '#E3E6EB',
  };

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    if (otp.length === 4 || !otp) {
      setError(false);
    }
  }, [otp]);

  const resendHandler = async () => {
    setCounter(59);
    let response;
    response = await sendForgotPasswordOtp({ email });
    const { status, data } = response;

    const errormsg = getErrorMessage(data);
    if (successStatus(status)) {
      ToastNotifySuccess('OTP Sent Successfully');
    } else {
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError(true);
    } else {
      setIsLoading(true);

      const response = await forgotPasswordOtpValidation({ email, code: otp });
      setIsLoading(false);
      const { status, data } = response;
      if (!successStatus(status)) {
        const errormsg = getErrorMessage(data);

        if (errormsg) {
          ToastNotifyError(errormsg, '');
        }
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <div className="flex flex-col items-center pt-3 pb-5 px-[18px] text-greydark ">
        <div className="text-[14px] mb-4 pb-2">
          Enter OTP sent to <span className="font-semibold">{email}</span>
        </div>

        <OTPInput
          inputType="tel"
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span />}
          renderInput={(props) => <input {...props} />}
          inputStyle={otpInputStyle}
          shouldAutoFocus={true}
        />
        <span className="mt-1 error">{error && 'Verification Code is required'}</span>

        <div
          className={`flex gap-2 text-greydark items-center justify-center mt-4 ${
            counter <= 0 ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
          onClick={() => (counter > 0 ? null : resendHandler())}
        >
          <span className="underline">
            <strong>{LANG_RESEND}</strong>
          </span>
          {counter > 0 && <div>in {`0:${counter}`} sec</div>}
        </div>
      </div>
      <div className="border-greymedium border-t w-full flex justify-end py-5 px-[18px]">
        <Button
          type="submit"
          label="Verify"
          additionalClassNames="capitalize"
          isLoading={isLoading}
          showArrowIcon={false}
          isDisabled={isLoading}
        />
      </div>
    </form>
  );
};

export default UpdateEmail;
