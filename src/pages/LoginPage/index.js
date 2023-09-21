import { useFormik } from 'formik';
import AuthPanelLayout from '../../components/AuthPanelLayout';
import Divider from '../../components/common/Divider';
import Input from '../../components/common/Input';
import * as yup from 'yup';
import { Button } from '../../components/common/Button';
import { VALIDATION } from '../../constants/constants';
import { MESSAGES } from '../../constants/messages';
import { BUTTON_LABELS, LANG } from '../../constants/lang';
import { loginDispatcher } from '../../redux/dispatchers/authDispatcher';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';

const { EMAIL_REGEX } = VALIDATION;
const { IS_REQUIRED, EMAIL_INVALID, PASSWORD_INVALID } = MESSAGES;
const {
  LANG_LOGIN_WELCOME_HEADING,
  LANG_LOGIN_WELCOME_SUBHEADING,
  LANG_LOGIN_EMAIL_LABEL,
  LANG_LOGIN_EMAIL_PLACEHOLDER,
  LANG_LOGIN_PASSWORD_LABEL,
  LANG_LOGIN_PASSWORD_PLACEHOLDER,
  LANG_LOGIN_FORGOT_PWD,
  LANG_LOGIN_DONT_HAVE_ACC,
  LANG_LOGIN_SIGN_UP,
} = LANG.PAGES.LOGIN;

const { BTNLBL_LOGIN } = BUTTON_LABELS;
const { FORGOT_PASSWORD, PATH_SIGNUP } = PATHS;

const initialValues = {
  email: '',
  password: '',
};

function LoginPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    if (!isLoading) {
      setIsLoading(true);
      const loginResponse = await dispatch(loginDispatcher(values));

      setIsLoading(false);
      // Setting the error below the input fields in the form itself
      if (loginResponse?.status !== 200 && Object.keys(loginResponse?.data).length) {
        const errorData = Object.entries(loginResponse?.data)?.[0];
        formik.setErrors({ [errorData?.[0]]: errorData?.[1] });
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required(IS_REQUIRED('Email'))
        .test('isValidEmailFormat', EMAIL_INVALID, (value) => EMAIL_REGEX.test(value)),
      password: yup
        .string()
        .required(IS_REQUIRED('Password'))
        .test('isPasswordLengthValid', PASSWORD_INVALID, (value) => value && value.length >= 6),
    }),
    onSubmit,
  });

  return (
    <AuthPanelLayout>
      <h1 className="text-white pr-2">{LANG_LOGIN_WELCOME_HEADING}</h1>
      <h4 className="text-white mt-2 mb-4 pr-2">{LANG_LOGIN_WELCOME_SUBHEADING}</h4>
      <Divider width="90%" />

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[24px]">
        <div className="mt-[15px]">
          <Input
            label={LANG_LOGIN_EMAIL_LABEL}
            placeholder={LANG_LOGIN_EMAIL_PLACEHOLDER}
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
        <div>
          <Input
            label={LANG_LOGIN_PASSWORD_LABEL}
            placeholder={LANG_LOGIN_PASSWORD_PLACEHOLDER}
            name="password"
            type="password"
            value={formik?.values?.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            isRequired
            className="w-full"
          />
          <div
            className="text-right text-white text-[14px] font-semibold mt-1 cursor-pointer"
            onClick={() => navigate(FORGOT_PASSWORD)}
          >
            {LANG_LOGIN_FORGOT_PWD}
          </div>
        </div>

        <Button
          label={BTNLBL_LOGIN}
          type="submit"
          isDisabled={!formik.values.email && !formik.values.password}
          additionalClassNames="capitalize"
          isLoading={isLoading}
        />

        <p className="text-white text-center">
          {LANG_LOGIN_DONT_HAVE_ACC}
          <strong className="cursor-pointer" onClick={() => navigate(PATH_SIGNUP)}>
            {' '}
            {LANG_LOGIN_SIGN_UP}
          </strong>
        </p>
      </form>
    </AuthPanelLayout>
  );
}

export default LoginPage;
