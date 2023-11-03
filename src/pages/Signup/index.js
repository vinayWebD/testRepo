import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router';
import AuthPanelLayout from '../../components/AuthPanelLayout';
import Input from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { LANG } from '../../constants/lang';
import { PATHS } from '../../constants/urlPaths';

import { signupUser } from '../../services/signup';
import { getErrorMessage, successStatus } from '../../common';
import { validationSchemaSignup } from '../../validations';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import { TOASTMESSAGES } from '../../constants/messages';
import Modal from '../../components/Modal';

const { LOGIN, PATH_VERIFY_EMAIL } = PATHS;

const {
  LANG_SIGNUP_WELCOME_HEADING,
  LANG_SIGNUP_WELCOME_SUBHEADING,
  LANG_SIGNUP_FIRST_NAME_LABEL,
  LANG_SIGNUP_FIRST_NAME_PLACEHOLDER,
  LANG_SIGNUP_LAST_NAME_LABEL,
  LANG_SIGNUP_LAST_NAME_PLACEHOLDER,
  LANG_SIGNUP_EMAIL_LABEL,
  LANG_SIGNUP_EMAIL_PLACEHOLDER,
  LANG_SIGNUP_PASSWORD_LABEL,
  LANG_SIGNUP_PASSWORD_PLACEHOLDER,
  LANG_SIGNUP_REGISTER,
  LANG_SIGNUP_PRIVACY,
  LANG_SIGNUP_TERMS,
  LANG_SIGNUP_HAVE_ACC,
  LANG_SIGNUP_SIGN_IN,
  LANG_SIGNUP_SAVE_NEXT,
  LANG_SIGNUP_CODE_SENT,
  LANG_SIGNUP_CODE_SENT_MAIL,
} = LANG.PAGES.SIGNUP;

const {
  errorToast: { TST_OTP_GENRATE_FAILED = '' },
} = TOASTMESSAGES;

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
};

function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const onSubmit = async (values) => {
    setIsLoading(true);
    const { firstname = null, lastname = null, email = null, password = null } = values;
    const dataToSend = {
      firstName: firstname,
      lastName: lastname,
      password: password.trim(),
      email: email.trim().toLowerCase(),
    };
    const response = await signupUser(dataToSend);
    const { status, data } = response;
    setIsLoading(false);
    const errormsg = getErrorMessage(data);
    if (successStatus(status)) {
      secureLocalStorage.setItem('object', { dataToSend });
      setIsSuccessModalOpen(true);
    } else {
      if (errormsg) {
        ToastNotifyError(errormsg, TST_OTP_GENRATE_FAILED);
      }
    }
  };

  useEffect(() => {
    if (isSuccessModalOpen) {
      setTimeout(() => {
        navigate(PATH_VERIFY_EMAIL);
      }, 3000);
    }
  }, [isSuccessModalOpen]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaSignup,
    onSubmit,
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    initialValues: { firstname = '', lastname = '', email = '', password = '' } = {},
    touched: {
      firstname: tuc_firstname,
      lastname: tuc_lastname,
      email: tuc_email,
      password: tuc_password,
    },
    errors: {
      firstname: err_firstname,
      lastname: err_lastname,
      email: err_email,
      password: err_password,
    },
  } = formik;

  return (
    <AuthPanelLayout>
      <h1 className="text-white pr-2">{LANG_SIGNUP_WELCOME_HEADING}</h1>
      <div className="max-w-fit">
        <h4 className="text-white mt-2 pr-2">{LANG_SIGNUP_WELCOME_SUBHEADING}</h4>
        <div className="border-b border-[#F2F2F233] w-[55%] mt-2 mb-2" />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[24px] lg:max-w-[400px] mt-2">
        <div className="mt-[15px] flex items-baseline gap-8 md:flex-row flex-col ">
          <Input
            label={LANG_SIGNUP_FIRST_NAME_LABEL}
            placeholder={LANG_SIGNUP_FIRST_NAME_PLACEHOLDER}
            name="firstname"
            type="text"
            value={firstname}
            onChange={(e) => formik.setFieldValue('firstname', e.target.value.trim())}
            onBlur={handleBlur('firstname')}
            error={tuc_firstname && err_firstname}
            helperText={tuc_firstname && err_firstname}
            isRequired
            className="w-full"
          />
          <Input
            label={LANG_SIGNUP_LAST_NAME_LABEL}
            placeholder={LANG_SIGNUP_LAST_NAME_PLACEHOLDER}
            name="lastname"
            type="text"
            value={lastname}
            onChange={(e) => formik.setFieldValue('lastname', e.target.value.trim())}
            onBlur={handleBlur('lastname')}
            error={tuc_lastname && err_lastname}
            helperText={tuc_lastname && err_lastname}
            isRequired
            className="w-full"
          />
        </div>
        <div>
          <Input
            label={LANG_SIGNUP_EMAIL_LABEL}
            placeholder={LANG_SIGNUP_EMAIL_PLACEHOLDER}
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur('email')}
            error={tuc_email && err_email}
            helperText={tuc_email && err_email}
            isRequired
            className="w-full"
          />
        </div>
        <div>
          <Input
            label={LANG_SIGNUP_PASSWORD_LABEL}
            placeholder={LANG_SIGNUP_PASSWORD_PLACEHOLDER}
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur('password')}
            error={tuc_password && err_password}
            helperText={tuc_password && err_password}
            isRequired
            className="w-full"
          />
        </div>
        <div className="flex gap-2 items-start max-w-[400px]">
          <div className="para-sm">
            {LANG_SIGNUP_REGISTER}{' '}
            <a href="#" className="link-sm">
              {LANG_SIGNUP_TERMS}{' '}
            </a>
            and{' '}
            <a href="#" className="link-sm">
              {LANG_SIGNUP_PRIVACY}
            </a>
          </div>
        </div>
        <Button
          isLoading={isLoading}
          label={LANG_SIGNUP_SAVE_NEXT}
          type="submit"
          additionalClassNames="capitalize"
        />
        <div className="text-white text-center cursor-pointer mb-9" onClick={() => navigate(LOGIN)}>
          {LANG_SIGNUP_HAVE_ACC}
          <span className="">
            <strong>{LANG_SIGNUP_SIGN_IN}</strong>
          </span>
        </div>
      </form>
      {email}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        isTitle={false}
      >
        <div className="flex items-center flex-col text-center py-8">
          <div className="text-[28px] font-medium text-greydark">{LANG_SIGNUP_CODE_SENT}</div>
          <h4 className="text-greydark font-medium">
            {LANG_SIGNUP_CODE_SENT_MAIL} <br />
            <span className="font-semibold">{formik?.values?.email}</span>
          </h4>
        </div>
      </Modal>
    </AuthPanelLayout>
  );
}

export default Signup;
