import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import OtpInput from 'react-otp-input';
import secureLocalStorage from 'react-secure-storage';
import AuthPanelLayout from '../../components/AuthPanelLayout';
import { Button } from '../../components/common/Button';
import { BackArrowIcon } from '../../components/Icons/BackArrowIcon';
import { PATHS } from '../../constants/urlPaths';
import { useScreenWidth } from '../../hooks';
import { LANG, BUTTON_LABELS } from '../../constants/lang';
import { useSearchParams, useLocation } from 'react-router-dom';
import { forgotPasswordOtpValidation, sendForgotPasswordOtp } from '../../services/auth';
import { getErrorMessage, successStatus } from '../../common';
import { signupUser, verifyEmail } from '../../services/signup';
import { ToastNotifyError, ToastNotifySuccess } from '../../components/Toast/ToastNotify';
import { TOASTMESSAGES } from '../../constants/messages';
import { REGEX, VERIFY_EMAIL_ORIGIN } from '../../constants/constants';

const { PATH_GENERAL_INFO, LOGIN, RESET_PASSWORD } = PATHS;
const { LANG_VERIFY_EMAIL, LANG_CODE_EMAIL, LANG_VER_CODE, LANG_RESEND } = LANG.PAGES.VERIFY_EMAIL;
const { BTNLBL_VERIFY } = BUTTON_LABELS;
const { FORGOT_PWD } = VERIFY_EMAIL_ORIGIN;
const { EMAIL_PATTERN } = REGEX;

const {
  successToast: { TST_SIGNUP_SUCCESSFULLY = '', TST_CODESENT_SUCCESSFULLY = '' },
  errorToast: { TST_OTP_VRIFY_FAILED = '', TST_OTP_RESNED_ID = '', TST_OTP_GENRATE_FAILED = '' },
  toastid: { TST_SIGNUP_SUCCESS_ID, TST_CODERESEND_SUCCESS_ID },
} = TOASTMESSAGES;

function VerifyEmail() {
  const navigate = useNavigate();
  const width = useScreenWidth();
  const [otp, setOtp] = useState(null);
  const [counter, setCounter] = useState(59);
  const [email, setEmail] = useState('');
  const [searchParams] = useSearchParams();
  const historyType = searchParams.get('type');
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { dataToSend: userData = {} } = secureLocalStorage.getItem('object') || {};

  const otpInputStyle = {
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 400,
    width: width > 600 ? '80px' : '60px',
    height: '50px',
    outline: 'none',
    marginRight: '24px',
    appearnce: 'none',
  };

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    if (historyType === FORGOT_PWD) {
      setEmail(location?.state?.email);
    } else {
      setEmail(userData?.email);
    }
  }, [historyType]);

  useEffect(() => {
    // Navigating the user back to login if the email is invalid
    if (
      ![undefined, null].includes(email) &&
      historyType === FORGOT_PWD &&
      !EMAIL_PATTERN.test(email)
    ) {
      navigate(LOGIN);
    }
  }, [email]);

  const resendHandler = async () => {
    setCounter(59);
    let response;
    if (historyType === FORGOT_PWD) {
      response = await sendForgotPasswordOtp({ email });
    } else {
      response = await signupUser(userData);
    }
    const { status, data } = response;
    const errormsg = getErrorMessage(data);
    if (successStatus(status)) {
      ToastNotifySuccess(TST_CODESENT_SUCCESSFULLY, TST_CODERESEND_SUCCESS_ID);
    } else {
      if (errormsg) {
        ToastNotifyError(errormsg, TST_OTP_RESNED_ID);
      }
    }
  };

  const onSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (historyType === FORGOT_PWD) {
      const { email = '' } = location?.state || {};
      const { is_valid } = await forgotPasswordOtpValidation({ email, code: otp });
      if (is_valid) {
        navigate(RESET_PASSWORD, {
          state: { email, code: otp },
        });
      } else {
        ToastNotifyError(TST_OTP_GENRATE_FAILED, TST_OTP_VRIFY_FAILED);
        setIsLoading(false);
      }
    } else {
      const dataToSend = {
        code: otp,
        email,
      };
      const response = await verifyEmail(dataToSend);
      const {
        status,
        data: { token = null },
        data = {},
      } = response;
      setIsLoading(false);
      const errormsg = getErrorMessage(data);
      if (successStatus(status)) {
        ToastNotifySuccess(TST_SIGNUP_SUCCESSFULLY, TST_SIGNUP_SUCCESS_ID);
        secureLocalStorage.clear();
        localStorage.setItem('token', token);
        secureLocalStorage.setItem('object', { data });
        navigate(PATH_GENERAL_INFO);
      } else {
        if (errormsg) {
          ToastNotifyError(errormsg, TST_OTP_VRIFY_FAILED);
        }
      }
    }
  };

  return (
    <AuthPanelLayout>
      <div className="mb-2 border-b border-[#F2F2F233] max-w-fit">
        <div className="flex items-center gap-2">
          <span className="cursor-pointer" onClick={() => navigate(-1)}>
            <BackArrowIcon />
          </span>
          <h1 className="text-white pr-2">{LANG_VERIFY_EMAIL}</h1>
        </div>
        <h4 className="text-white mt-2 mb-4 pr-2">{`${LANG_CODE_EMAIL} ${email}`}</h4>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-[24px] max-w-[400px] mt-[24px]">
        <div className="mb-4">
          <div className="flex gap-[2px] mb-1">
            <label className="text-white">
              {LANG_VER_CODE} <span className="text-red relative">*</span>
            </label>
          </div>
          <OtpInput
            inputType="tel"
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span />}
            renderInput={(props) => <input {...props} />}
            inputStyle={otpInputStyle}
          />
        </div>
        <Button
          isLoading={isLoading}
          label={BTNLBL_VERIFY}
          type="submit"
          isDisabled={!otp}
          additionalClassNames="capitalize"
        />
        <div
          className={`flex gap-2 text-white items-center justify-center para-normal ${
            counter <= 0 ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
          onClick={() => (counter > 0 ? null : resendHandler())}
        >
          <span className="underline">
            <strong>{LANG_RESEND}</strong>
          </span>
          {counter > 0 && <div>in {`0:${counter}`} sec</div>}
        </div>
      </form>
    </AuthPanelLayout>
  );
}

export default VerifyEmail;
