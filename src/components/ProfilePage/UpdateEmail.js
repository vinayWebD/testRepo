import React, { useEffect, useState } from 'react';
import { useScreenWidth } from '../../hooks';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError, ToastNotifySuccess } from '../Toast/ToastNotify';
import OTPInput from 'react-otp-input';
import { LANG } from '../../constants/lang';
import { Button } from '../common/Button';
import { useDispatch } from 'react-redux';
import {
  sendOtpToUpdateEmailDispatcher,
  verifyNewEmailDispatcher,
  verifyOldEmailDispatcher,
} from '../../redux/dispatchers/myProfileDispatcher';

const { LANG_RESEND } = LANG.PAGES.VERIFY_EMAIL;

const UpdateEmail = ({
  newEmail,
  verificationStep = 0,
  updateVerificationStep = () => {},
  currentEmail = '',
  closeHandler = () => {},
}) => {
  const width = useScreenWidth();
  const dispatch = useDispatch();
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

    const response = await dispatch(
      sendOtpToUpdateEmailDispatcher({
        email: newEmail?.trim(),
      }),
    );
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

      let response = {};

      if (verificationStep === 0) {
        response = await dispatch(verifyOldEmailDispatcher({ email: newEmail, code: otp }));
      } else if (verificationStep === 1) {
        response = await dispatch(verifyNewEmailDispatcher({ email: newEmail, code: otp }));
      }

      const { status, data } = response;

      const errormsg = getErrorMessage(data);
      if (successStatus(status)) {
        ToastNotifySuccess(
          verificationStep === 0
            ? 'Current email has been verified'
            : 'New email has been verified',
        );
        updateVerificationStep(() => (verificationStep === 0 ? 1 : 2));
        setOtp('');
        if (verificationStep !== 0) {
          closeHandler();
        }
      } else {
        if (errormsg) {
          ToastNotifyError(errormsg);
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <div className="flex flex-col items-center pt-3 pb-5 px-[18px] text-greydark ">
        <div className="text-[14px] mb-4 pb-2">
          Enter OTP sent to{' '}
          <span className="font-semibold">{verificationStep === 0 ? currentEmail : newEmail}</span>
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

        {verificationStep === 0 ? (
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
        ) : (
          ''
        )}
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
