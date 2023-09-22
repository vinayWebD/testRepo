import { useFormik } from 'formik';
import AuthPanelLayout from '../../components/AuthPanelLayout';
import Input from '../../components/common/Input';
import * as yup from 'yup';
import { Button } from '../../components/common/Button';
import { MESSAGES, TOASTMESSAGES } from '../../constants/messages';
import { BUTTON_LABELS, LANG } from '../../constants/lang';
import { useEffect, useState } from 'react';
import { BackArrowIcon } from '../../components/Icons/BackArrowIcon';
import { useLocation, useNavigate } from 'react-router-dom';
import { REGEX } from '../../constants/constants';
import { PATHS } from '../../constants/urlPaths';
import { resetPassword } from '../../services/auth';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError, ToastNotifySuccess } from '../../components/Toast/ToastNotify';

const { IS_REQUIRED, PASSWORD_INVALID, CONFIRM_PASSWORD_MISMATCH } = MESSAGES;
const {
  LANG_GEN_WELCOME_HEADING,
  LANG_GEN_WELCOME_SUBHEADING,
  LANG_PWD_LABEL,
  LANG_C_PWD_LABEL,
  LANG_PWD_PLACEHOLDER,
  LANG_C_PWD_PLACEHOLDER,
} = LANG.PAGES.RESET_PASSWORD;
const { EMAIL_PATTERN, INTEGER_PATTERN } = REGEX;
const { LOGIN } = PATHS;

const { BTNLBL_SAVE } = BUTTON_LABELS;

const {
  successToast: { TST_PWD_RESET_SUCCESSFULLY = '' },
  toastid: { TST_PASSWORD_RESET_FAILED_ID, TST_PASSWORD_RESET_SUCESS_ID },
} = TOASTMESSAGES;

const initialValues = {
  password: '',
  confirmPassword: '',
};

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      !EMAIL_PATTERN.test(location?.state?.email) ||
      !INTEGER_PATTERN.test(location?.state?.code)
    ) {
      navigate(LOGIN);
    }
  }, []);

  const onSubmit = async (values) => {
    if (!isLoading) {
      setIsLoading(true);
      const { email, code } = location?.state || {};
      const response = await resetPassword({
        email,
        code,
        password: values?.password,
      });

      const { status, data } = response;
      if (successStatus(status)) {
        ToastNotifySuccess(TST_PWD_RESET_SUCCESSFULLY, TST_PASSWORD_RESET_SUCESS_ID);
        navigate(LOGIN);
      } else {
        const errormsg = getErrorMessage(data);
        if (errormsg) {
          ToastNotifyError(errormsg, TST_PASSWORD_RESET_FAILED_ID);
          setIsLoading(false);
        }
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .required(IS_REQUIRED('Password'))
        .test('isPasswordLengthValid', PASSWORD_INVALID, (value) => value && value.length >= 6),
      confirmPassword: yup
        .string()
        .required(IS_REQUIRED('Confirm Password'))
        .oneOf([yup.ref('password'), null], CONFIRM_PASSWORD_MISMATCH),
    }),
    onSubmit,
  });

  return (
    <AuthPanelLayout>
      <div className="mb-2 border-b border-[#F2F2F233] max-w-fit">
        <div className="flex items-center gap-2">
          <span className="cursor-pointer" onClick={() => navigate(-1)}>
            <BackArrowIcon />
          </span>
          <h1 className="text-white pr-2">{LANG_GEN_WELCOME_HEADING}</h1>
        </div>
        <h4 className="text-white mt-2 mb-4 pr-2">{LANG_GEN_WELCOME_SUBHEADING}</h4>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[24px] mt-4">
        <div>
          <Input
            label={LANG_PWD_LABEL}
            placeholder={LANG_PWD_PLACEHOLDER}
            name="password"
            type="password"
            value={formik?.values?.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            isRequired
            className="w-full"
          />
        </div>
        <div>
          <Input
            label={LANG_C_PWD_LABEL}
            placeholder={LANG_C_PWD_PLACEHOLDER}
            name="confirmPassword"
            type="password"
            value={formik?.values?.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            isRequired
            className="w-full"
          />
        </div>

        <Button
          label={BTNLBL_SAVE}
          type="submit"
          isDisabled={!formik.values.confirmPassword && !formik.values.password}
          additionalClassNames="capitalize"
          isLoading={isLoading}
        />
      </form>
    </AuthPanelLayout>
  );
}

export default ResetPassword;
