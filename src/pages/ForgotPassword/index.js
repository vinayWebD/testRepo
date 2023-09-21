import { createSearchParams, useNavigate } from 'react-router-dom';
import AuthPanelLayout from '../../components/AuthPanelLayout';
import { BackArrowIcon } from '../../components/Icons/BackArrowIcon';
import { PATHS } from '../../constants/urlPaths';
import { BUTTON_LABELS, LANG } from '../../constants/lang';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { MESSAGES, TOASTMESSAGES } from '../../constants/messages';
import { REGEX, VERIFY_EMAIL_ORIGIN } from '../../constants/constants';
import Input from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import CheckIcon from '../../components/Icons/CheckIcon';
import { sendForgotPasswordOtp } from '../../services/auth';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import { getErrorMessage, successStatus } from '../../common';

const { LOGIN, PATH_VERIFY_EMAIL } = PATHS;
const {
  LANG_GEN_WELCOME_HEADING,
  LANG_GEN_WELCOME_SUBHEADING,
  LANG_EMAIL_LABEL,
  LANG_EMAIL_PLACEHOLDER,
  LANG_OTP_SENT_SUCCESS,
  LANG_OTP_SENT_TO_MAIL,
} = LANG.PAGES.FORGOT_PASSWORD;
const { IS_REQUIRED, EMAIL_INVALID } = MESSAGES;
const { EMAIL_PATTERN } = REGEX;
const { FORGOT_PWD } = VERIFY_EMAIL_ORIGIN;
const { BTNLBL_CONTINUE } = BUTTON_LABELS;
const { TST_OTP_GENRATE_FAILED_ID } = TOASTMESSAGES.toastid;

const initialValues = {
  email: '',
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const onSubmit = async (values) => {
    if (!isLoading) {
      setIsLoading(true);
      let response = await sendForgotPasswordOtp(values);
      const { status, data } = response;

      if (successStatus(status)) {
        setIsSuccessModalOpen(true);
      } else {
        const errormsg = getErrorMessage(data);
        if (errormsg) {
          ToastNotifyError(errormsg, TST_OTP_GENRATE_FAILED_ID);
          setIsLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    if (isSuccessModalOpen) {
      setTimeout(() => {
        navigate(`${PATH_VERIFY_EMAIL}?${createSearchParams({ type: FORGOT_PWD })}`, {
          state: { email: formik?.values?.email },
        });
      }, 2500);
    }
  }, [isSuccessModalOpen]);

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required(IS_REQUIRED('Email'))
        .test('isValidEmailFormat', EMAIL_INVALID, (value) => EMAIL_PATTERN.test(value)),
    }),
    onSubmit,
  });

  return (
    <AuthPanelLayout>
      <div className="mb-2 border-b border-[#F2F2F233] max-w-fit">
        <div className="flex items-center gap-2">
          <span className="cursor-pointer" onClick={() => navigate(LOGIN)}>
            <BackArrowIcon />
          </span>
          <h1 className="text-white pr-2">{LANG_GEN_WELCOME_HEADING}</h1>
        </div>
        <h4 className="text-white mt-2 mb-4 pr-2">{LANG_GEN_WELCOME_SUBHEADING}</h4>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[24px]">
        <div className="mt-[15px]">
          <Input
            label={LANG_EMAIL_LABEL}
            placeholder={LANG_EMAIL_PLACEHOLDER}
            name="email"
            type="email"
            value={formik?.values?.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            isRequired
            className="w-full"
          />
        </div>

        <Button
          label={BTNLBL_CONTINUE}
          type="submit"
          isDisabled={!formik.values.email}
          additionalClassNames="capitalize"
          isLoading={isLoading}
        />
      </form>
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        isTitle={false}
      >
        <div className="flex items-center flex-col text-center py-8">
          <CheckIcon />
          <div className="text-[28px] font-medium text-greydark">{LANG_OTP_SENT_SUCCESS}</div>
          <h4 className="text-greydark font-medium">
            {LANG_OTP_SENT_TO_MAIL} {formik?.values?.email}
          </h4>
        </div>
      </Modal>
    </AuthPanelLayout>
  );
};

export default ForgotPassword;
